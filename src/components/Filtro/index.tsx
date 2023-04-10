import React, { useState } from 'react';
import style from './Filtro.module.scss';
import { useSetRecoilState } from 'recoil';
import { IFiltro } from '../../interfaces/IFiltro';
import { filtroDeEventos } from '../../state/atom';

const Filtro: React.FC = () => {

  const [data, setData] = useState('');
  const [status, setStatus] = useState('');

  // variável para lidar com atualização do filtro dos eventos
  const setFiltroDeEvento = useSetRecoilState<IFiltro>(filtroDeEventos);

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const filtro: IFiltro = {};
    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }
    if (status) {
      filtro.status = status;
    } else {
      filtro.status = 'todas';
    }
    // atualizando estado do filtro
    setFiltroDeEvento(filtro);
  };

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input
      type="date"
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)}
      placeholder="Por data"
      value={data} />

    <h3 className={style.titulo}>Filtrar por status</h3>
    <select
      className={style.select}
      name="status"
      onChange={evento => { setStatus(evento.target.value); }}
      value={status}
    >
      <option value="todas">Todas</option>
      <option value="completas">Completas</option>
      <option value="incompletas">Incompletas</option>
    </select>

    <button className={style.botao}>
      Filtrar
    </button>

  </form>);
};

export default Filtro;