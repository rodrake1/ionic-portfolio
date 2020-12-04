// import { Injectable } from "@angular/core";
// import { TarefaComponent } from "../tarefa/tarefa.component";

// export interface Tarefa {
//   titulo: string;
//   data: string;
//   feita: boolean;
// }

// @Injectable({
//   providedIn: "root",
// })
// export class TarefaService {
//   public tarefas: Tarefa[] = [
//     {
//       titulo: "Alimentar os gatos",
//       data: "03/12/2020",
//       feita: true,
//     },
//     {
//       titulo: "Estudar NgRx",
//       data: "04/12/2020",
//       feita: false,
//     },
//     {
//       titulo: "Fazer compras",
//       data: "05/12/2020",
//       feita: false,
//     },
//   ];

//   public obterTarefas(): Tarefa[] {
//     const tarefas = this.tarefas.slice();
//     return tarefas;
//   }

//   public obterTarefa(id: number): Tarefa {
//     const tarefa = { ...this.tarefas[id - 1] };
//     return tarefa;
//   }

//   public adicionarTarefa(tarefa: Tarefa) {
//     const tarefasAtualizada = [...this.tarefas, tarefa];
//     this.tarefas = tarefasAtualizada;
//   }

//   public atualizarTarefa(tarefaNova: TarefaComponent, id: string) {
//     const tarefasAtualizada = this.tarefas.map((tarefaAntiga, index) => {
//       if (index !== parseInt(id, 10) - 1) {
//         return tarefaAntiga;
//       }
//       return { ...tarefaAntiga, ...tarefaNova };
//     });
//     this.tarefas = tarefasAtualizada;
//   }

//   public removerTarefa(id: string) {
//     const tarefasAtualizada = this.tarefas.slice();
//     tarefasAtualizada.splice(parseInt(id, 10) - 1, 1);
//     this.tarefas = tarefasAtualizada;
//   }
// }
