import React from 'react';
import Evento from '../Evento';
import Filtro from '../Filtro';
import style from './ListaDeEventos.module.scss';
import useListaDeEventos from '../../state/hooks/useListaDeEventos';

const ListaDeEventos: React.FC = () => {
  // Acessando a lista de eventos através do Recoil (similar ao useContext) via custom hook
  const eventos = useListaDeEventos();

  return (<section>
    <Filtro />
    <div className={style.Scroll}>
      {eventos.map(evento => (
        <Evento evento={evento} key={evento.id} />
      ))}
    </div>
  </section>);
};

export default ListaDeEventos;