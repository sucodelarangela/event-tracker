import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import { useSetRecoilState } from 'recoil';
import { listaDeEventosState } from '../../../state/atom';

const EventoCheckbox: React.FC<{ evento: IEvento; }> = ({ evento }) => {
  // Definindo setter da lista de eventos para uso na função de atualização de eventos:
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  const alterarStatus = () => {
    // O evento em si é inalterável (read only). Então devemos criar uma variável com o evento para que possamos alterar esta variável
    const eventoAlterado = {
      ...evento
    };

    eventoAlterado.completo = !evento.completo;

    setListaDeEventos(listaAntiga => {
      const indice = listaAntiga.findIndex(evt => evt.id === evento.id);
      return [...listaAntiga.slice(0, indice), eventoAlterado, ...listaAntiga.slice(indice + 1)];
    });
  };

  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ];

  return (<i className={estilos.join(' ')} onClick={alterarStatus}></i>);
};

export default EventoCheckbox;