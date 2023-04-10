import { useRecoilValue } from "recoil";
import { listaDeEventosState } from "../atom";

const useListaDeEventos = () => {
  return useRecoilValue(listaDeEventosState);
};

export default useListaDeEventos;