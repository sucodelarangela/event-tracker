import style from './App.module.scss';
import Card from './components/Card';
import Formulario from './components/Formulario';
import Calendario from './components/Calendario';
import ListaDeEventos from './components/ListaDeEventos';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';

function App() {
  return (
    // O RecoilRoot funciona como o Provider da ContextAPI
    <RecoilRoot>
      {/* Quando o Recoil faz uma chamada assíncrona (no nosso caso, no seletor `eventosAsync`), precisamos envolver nossa aplicação em um componente Suspense do React, com uma mensagem de fallback que aparecerá enquanto os dados carregam */}
      <Suspense fallback="Carregando...">
        <div className={style.App}>
          <div className={style.Coluna}>
            <Card>
              <Formulario />
            </Card>
            <hr />
            <Card>
              <ListaDeEventos />
            </Card>
          </div>
          <div className={style.Coluna}>
            <Calendario />
          </div>
        </div>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
