import { Component } from "../../core";
import { TodoEvent, todoTarget } from "../../events";
import view from "./creator.html?raw";
import style from "./creator.css?raw";

export class CreatorComponent extends Component {
  static selector = "todo-creator";

  constructor() {
    super({
      view,
      styles: [style],
    });
  }

  init() {
    this.createInput = this.shadowRoot.getElementById("create-input");
    this.createButton = this.shadowRoot.getElementById("create-btn");

    this.createButton.addEventListener("click", () => {
      this.createTask();
    });

    this.createInput.addEventListener("keyup", (event) => {
      if (event.code === "Enter") {
        this.createTask();
      }
    });
  }

  createTask() {
    const taskTitle = this.createInput.value;

    if (!taskTitle) {
      return;
    }

    todoTarget.dispatchEvent(
      new TodoEvent("create", {
        id: Math.floor(Math.random() * 1000),
        title: taskTitle,
      }),
    );
    this.createInput.value = "";
  }
}
