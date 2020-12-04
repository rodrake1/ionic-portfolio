import { createReducer, on } from "@ngrx/store";
import * as TarefasActions from "../actions/tarefas.actions";

export interface Tarefa {
  titulo: string;
  data: string;
  feita: boolean;
}

const estadoInicial: Tarefa[] = [
  {
    titulo: "Alimentar os gatos",
    data: "03/12/2020",
    feita: true,
  },
  {
    titulo: "Estudar NgRx",
    data: "04/12/2020",
    feita: false,
  },
  {
    titulo: "Fazer compras",
    data: "05/12/2020",
    feita: false,
  },
];

export const tarefasReducer = createReducer(
  estadoInicial,
  on(TarefasActions.adicionarTarefa, (state, { tarefa }) => [...state, tarefa]),
  // on(TarefasActions.adicionarTarefa, (state, { tarefa }) => {
  //   state.push(tarefa);
  //   return state;
  // }),
  on(TarefasActions.atualizarTarefa, (state, { tarefa, id }) => {
    const tarefas = state.map((tarefaAntiga, index) => {
      if (index !== parseInt(id, 10) - 1) {
        return tarefaAntiga;
      }
      return { ...tarefaAntiga, ...tarefa };
    });
    return tarefas;
  }),
  on(TarefasActions.removerTarefa, (state, { id }) => {
    const tarefas = state.slice();
    tarefas.splice(parseInt(id, 10) - 1, 1);
    return tarefas;
  })
);
