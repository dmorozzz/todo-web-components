import { Component } from "../../core";
import { TodoEvent, todoTarget } from "../../events";

import view from "./card.html?raw";
import style from "./card.css?raw";

export class CardComponent extends Component {
  static selector = "todo-card";
  static observedAttributes = ["task-id", "task-title"];

  destroyController = new AbortController();

  constructor() {
    super({ view, styles: [style] });
    this._internals = this.attachInternals();
  }

  init() {
    this.titleElement = this.shadowRoot.getElementById("title-el");
    this.doneButton = this.shadowRoot.getElementById("done-btn");
    this.removeButton = this.shadowRoot.getElementById("remove-btn");

    this.titleElement.innerText = this.taskTitle;

    this.doneButton.addEventListener(
      "click",
      () => {
        this.toggleDone();
      },
      { signal: this.destroyController.signal },
    );

    this.removeButton.addEventListener(
      "click",
      () => {
        this.removeTask();
      },
      { signal: this.destroyController.signal },
    );
  }

  attributeChangedCallback(name, _, value) {
    switch (name) {
      case "task-id":
        this.taskId = Number(value);
        break;
      case "task-title":
        this.taskTitle = value;
        break;
      default:
        return;
    }
  }

  toggleDone() {
    this.done = !this.done;

    if (this.done) {
      this.titleElement.style.textDecoration = "line-through";
      this.doneButton.innerText = "Undone";
    } else {
      this.titleElement.style.textDecoration = "none";
      this.doneButton.innerText = "Done";
    }
  }

  removeTask() {
    todoTarget.dispatchEvent(new TodoEvent("remove", { id: this.taskId }));
  }

  disconnectedCallback() {
    this.destroyController.abort();
  }
}
