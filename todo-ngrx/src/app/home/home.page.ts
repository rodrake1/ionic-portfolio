import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Tarefa } from '../store/reducers/tarefas.reducers';
import * as TarefasSelectors from "../store/selectors/tarefas.selectors";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  tarefas$: Observable<Tarefa[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.tarefas$ = this.store.select(TarefasSelectors.obterTarefas);
  }
}
