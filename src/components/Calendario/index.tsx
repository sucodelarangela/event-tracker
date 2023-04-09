import React from 'react';
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json';
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';
import { useRecoilValue } from 'recoil';
import { listaDeEventosState } from '../../state/atom';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';

interface IKalendEvento {
  id?: number;
  startAt: string;
  endAt: string;
  summary: string;
  color: string;
}

const Calendario: React.FC = () => {
  // Acessando a lista de eventos com Recoil
  const eventos = useRecoilValue(listaDeEventosState);
  const eventosKalend = new Map<string, IKalendEvento[]>();
  // Definindo setter da lista de eventos para uso na função de atualização de eventos:
  // const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  const atualizarEvento = useAtualizarEvento();

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10);
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, []);
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    });
  });

  // Atualizando evento no drag n' drop (função oriunda da documentação do Kalend)
  const onEventDragFinish: OnEventDragFinish = (
    kalendEventoInalterado: CalendarEvent,
    kalendEventoAtualizado: CalendarEvent
  ) => {
    const evento = eventos.find(evento => evento.descricao === kalendEventoAtualizado.summary);
    if (evento) {
      // O evento é inalterável, então criamos uma variável com os valores dele para poder fazermos a atualização dos dados
      const eventoAtualizado = {
        ...evento
      };
      eventoAtualizado.inicio = new Date(kalendEventoAtualizado.startAt);
      eventoAtualizado.fim = new Date(kalendEventoAtualizado.endAt);
      // usando customHook pra evitar repetição de código:
      atualizarEvento(eventoAtualizado);
      // setListaDeEventos(listaAntiga => {
      //   const indice = listaAntiga.findIndex(evt => evt.id === evento.id);
      //   return [...listaAntiga.slice(0, indice), eventoAtualizado, ...listaAntiga.slice(indice + 1)];
      // });
    }
  };


  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
};

export default Calendario;