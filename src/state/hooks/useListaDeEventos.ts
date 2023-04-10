import { useRecoilValue } from "recoil";
import { eventosFiltradosState } from "../seletores";

const useListaDeEventos = () => {
  // Agora esse hook retorna os eventos filtrados em vez de todos os eventos
  return useRecoilValue(eventosFiltradosState);
};

export default useListaDeEventos;