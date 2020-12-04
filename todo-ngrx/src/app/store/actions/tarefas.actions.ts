import { createAction, props } from "@ngrx/store";
import { Tarefa } from "src/app/services/tarefa.service";

export const adicionarTarefa = createAction(
  "[Detalhe Tarefa Page] Adicionar Tarefa",
  props<{ tarefa: Tarefa }>()
);

export const atualizarTarefa = createAction(
  "[Detalhe Tarefa Page] Atualizar Tarefa",
  props<{ tarefa: Tarefa; id: string }>()
);

export const removerTarefa = createAction(
  "[Detalhe Tarefa Page] Remover Tarefa",
  props<{ id: string }>()
);
