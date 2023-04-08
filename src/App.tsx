import React, { useState } from 'react';
import style from './App.module.scss';
import Card from './components/Card';
import Formulario from './components/Formulario';
import { IEvento } from './interfaces/IEvento';
import Calendario from './components/Calendario';
import ListaDeEventos from './components/ListaDeEventos';
import { RecoilRoot } from 'recoil';

function App() {

  // Essa lista de eventos foi transferida para um atom do Recoil em ./state/atom.ts
  // const [eventos, setEventos] = useState<IEvento[]>([
  // ]);


  const [filtro, setFiltro] = useState<Date | null>();

  const adicionarEvento = (evento: IEvento) => {
    evento.id = Math.round((new Date()).getTime() / 1000);
    // eventos.push(evento);
    // console.log(eventos);

    // setEventos([...eventos]);
  };
  const alterarStatusEvento = (id: number) => {
    // const evento = eventos.find(evento => evento.id === id);
    // if (evento) {
    //   evento.completo = !evento.completo;
    // }
    // setEventos([...eventos]);
  };
  const deletarEvento = (id: number) => {
    // setEventos([...eventos.filter(evento => evento.id !== id)]);
  };

  const aplicarFiltro = (data: Date | null) => {
    setFiltro(data);
  };

  // const filtrados = !filtro
  //   ? eventos
  //   : eventos.filter((evento) =>
  //     filtro!.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10)
  //   );

  return (
    // O RecoilRoot funciona como o Provider da ContextAPI
    <RecoilRoot>
      <div className={style.App}>
        <div className={style.Coluna}>
          <Card>
            <Formulario />
          </Card>
          <hr />
          <Card>
            <ListaDeEventos
              aoFiltroAplicado={aplicarFiltro}
              aoAlterarStatus={alterarStatusEvento}
              aoDeletarEvento={deletarEvento}
            />
          </Card>
        </div>
        <div className={style.Coluna}>
          <Calendario />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
