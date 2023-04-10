import React from 'react';
import { IEvento } from '../../interfaces/IEvento';
import style from './Evento.module.scss';
import EventoCheckbox from './EventoCheckbox';
import useDeletarEvento from '../../state/hooks/useDeletarEvento';

const Evento: React.FC<{ evento: IEvento; }> = ({ evento }) => {
  // usando o customhook para deleção do evento:
  const excluirEvento = useDeletarEvento();
  // Definindo setter da lista de eventos para uso na função de exclusão de eventos:
  // const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  // const excluirEvento = () => {
  // Atualizando a listaDeEventos retornando apenas o que tiver id diferente do excluído
  // setListaDeEventos(listaAntiga => listaAntiga.filter(evt => evt.id !== evento.id));
  // };

  const estilos = [
    style.Evento
  ];

  if (evento.completo) {
    estilos.push(style.completo);
  }

  return (<div className={estilos.join(' ')}>

    <EventoCheckbox evento={evento} />
    <div className="cards-info">
      <h3 className={style.descricao}>{evento.descricao} - {evento.inicio.toLocaleDateString()}</h3>
    </div>
    <i className="far fa-times-circle fa-2x" onClick={() => excluirEvento(evento)}></i>
  </div>);
};

export default Evento;