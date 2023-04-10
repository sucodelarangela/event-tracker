import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

// Criando um estado derivado de um atom, usando seletores
export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  // obtendo valores do recoil:
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);
    // lógica de filtro dos eventos:
    const eventos = todosOsEventos.filter(evento => {
      if (!filtro.data) {
        return true;
      }
      const ehOMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10); // "AAAA-MM-DD"
      return ehOMesmoDia;
    }).filter(evento => {
      if (!filtro.status) {
        return true;
      }
      switch (filtro.status) {
        case "completas":
          return evento.completo === true;
        case "incompletas":
          return evento.completo === false;
        default:
          return true;
      }
    });
    return eventos;
  }
});

// estado derivado dos dados que vem da API com json-server
export const eventosAsync = selector({
  key: 'eventosAsync',
  // diferente do selector de filtros, não vamos derivar um átomo, mas fazer uma chamada assíncrona da API
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos');
    const eventosJson: IEvento[] = await respostaHttp.json();
    return eventosJson.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim)
    }));
  }
});