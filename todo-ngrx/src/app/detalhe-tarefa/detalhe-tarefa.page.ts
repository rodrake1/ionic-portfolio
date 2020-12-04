import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import * as TarefasActions from "../store/actions/tarefas.actions";
import * as TarefasSelectors from "../store/selectors/tarefas.selectors";
import { take } from "rxjs/operators";
import { Tarefa } from '../store/reducers/tarefas.reducers';

@Component({
  selector: "app-detalhe-tarefa",
  templateUrl: "./detalhe-tarefa.page.html",
  styleUrls: ["./detalhe-tarefa.page.scss"],
})
export class DetalheTarefaPage implements OnInit {
  public tarefa: Tarefa = {
    titulo: "",
    data: "",
    feita: false,
  };
  public id: string;
  public form: FormGroup;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.store
      .select(TarefasSelectors.obterTarefa, parseInt(this.id, 10))
      .pipe(take(1))
      .subscribe((tarefa) => {
        if (this.id !== "nova") {
          this.tarefa = { ...tarefa };
        }
        const { titulo, data, feita } = this.tarefa;
        this.form = this.fb.group({
          titulo: [titulo, Validators.required],
          data: [data, Validators.required],
          feita: [feita, Validators.required],
        });
      });
  }

  public salvarTarefa() {
    if (this.id === "nova") {
      this.store.dispatch(
        TarefasActions.adicionarTarefa({ tarefa: this.form.value })
      );
    } else {
      this.store.dispatch(
        TarefasActions.atualizarTarefa({ tarefa: this.form.value, id: this.id })
      );
    }
  }

  public removerTarefa() {
    this.store.dispatch(TarefasActions.removerTarefa({ id: this.id }));
  }

  public get titulo() {
    return this.id === "nova" ? "Criar Tarefa" : "Editar Tarefa";
  }
}
