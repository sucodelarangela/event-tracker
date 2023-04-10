import { atom } from 'recoil';
import { IEvento } from '../interfaces/IEvento';
import { IFiltro } from '../interfaces/IFiltro';
import { eventosAsync } from './seletores';

export const listaDeEventosState = atom<IEvento[]>({
  key: 'listaDeEventosState',
  // definindo o seletor criado para fetch da API como valor padrão do atom
  default: eventosAsync
});

// Criando átomos de filtro para reagir à aplicação de um filtro por data no form de filtros
export const filtroDeEventos = atom<IFiltro>({
  key: 'filtroDeEventos',
  default: {}
})

/*

No conceito do React, o estado é composto por vários átomos. Então cada pedaço do estado é um átomo.
Todo atom precisa ter uma chave única.

*/