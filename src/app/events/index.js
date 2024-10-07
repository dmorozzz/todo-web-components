export class TodoEvent extends Event {
  constructor(title, data) {
    super(title);
    this.data = data;
  }
}

export const todoTarget = new EventTarget();
