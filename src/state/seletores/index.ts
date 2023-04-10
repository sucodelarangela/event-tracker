import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";

// Criando um estado derivado de um atom
const eventosFiltradosState = selector({
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

export default eventosFiltradosState;