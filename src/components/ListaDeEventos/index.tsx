import React from 'react';
import Evento from '../Evento';
import Filtro from '../Filtro';
import style from './ListaDeEventos.module.scss';
import { listaDeEventosState } from '../../state/atom';
import { useRecoilValue } from 'recoil';

const ListaDeEventos: React.FC<{
  aoFiltroAplicado: (data: Date | null) => void;
}> = ({ aoFiltroAplicado }) => {

  // Acessando a lista de eventos através do Recoil (similar ao useContext)
  const eventos = useRecoilValue(listaDeEventosState);

  return (<section>
    <Filtro aoFiltroAplicado={aoFiltroAplicado} />
    <div className={style.Scroll}>
      {eventos.map(evento => (
        <Evento evento={evento} key={evento.id} />
      ))}
    </div>
  </section>);
};

export default ListaDeEventos;