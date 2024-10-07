import { Component } from "./core";
import view from "./root.html?raw";
import style from "./root.css?raw";

export class RootComponent extends Component {
  static selector = "todo-root";

  constructor() {
    super({
      view,
      styles: [style],
    });
  }
}
