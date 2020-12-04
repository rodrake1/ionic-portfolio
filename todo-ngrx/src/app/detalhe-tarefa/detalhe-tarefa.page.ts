import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TarefaService, Tarefa } from "../services/tarefa.service";

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
    private tarefaService: TarefaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id !== "nova") {
      this.tarefa = this.tarefaService.obterTarefa(parseInt(this.id, 10));
    }
    const { titulo, data, feita } = this.tarefa;
    this.form = this.fb.group({
      titulo: [titulo, Validators.required],
      data: [data, Validators.required],
      feita: [feita, Validators.required],
    });
  }

  public salvarTarefa() {
    if (this.id === "nova") {
      this.tarefaService.adicionarTarefa(this.form.value);
    } else {
      this.tarefaService.atualizarTarefa(this.form.value, this.id);
    }
  }

  public removerTarefa() {
    this.tarefaService.removerTarefa(this.id);
  }

  public get titulo() {
    return this.id === "nova" ? "Criar Tarefa" : "Editar Tarefa";
  }
}
