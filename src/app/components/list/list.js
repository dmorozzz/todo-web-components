import { Component } from "../../core";
import { todoTarget } from "../../events";
import view from "./list.html?raw";
import style from "./list.css?raw";

export class ListComponent extends Component {
  static selector = "todo-list";

  constructor() {
    super({
      view,
      styles: [style],
    });
  }

  init() {
    this.listElement = this.shadowRoot.getElementById("list");
    todoTarget.addEventListener("create", ({ data }) => {
      this.createTask(data);
    });

    todoTarget.addEventListener("remove", ({ data }) => {
      this.removeTask(data.id);
    });
  }

  createTask(task) {
    const taskItem = document.createElement("li");
    const taskElement = document.createElement("todo-card");

    taskItem.dataset.id = task.id;
    taskItem.classList.add("task-item");

    taskElement.setAttribute("task-id", task.id);
    taskElement.setAttribute("task-title", task.title);
    taskItem.appendChild(taskElement);
    this.listElement.appendChild(taskItem);
  }

  removeTask(id) {
    const tasksItemElement = this.shadowRoot.querySelector(
      `.task-item[data-id="${id}"]`,
    );

    if (!tasksItemElement) {
      return;
    }

    this.listElement.removeChild(tasksItemElement);
  }
}
