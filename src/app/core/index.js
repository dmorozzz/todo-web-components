export class Component extends HTMLElement {
  constructor(options) {
    if (!options.view) {
      throw new Error("You need to provide component view");
    }

    super();

    this.options = options;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this.template.innerHTML = this.options.view;
    this.shadowRoot.append(this.template.content.cloneNode(true));

    if (this.options.styles && Array.isArray(this.options.styles)) {
      for (const style of this.options.styles) {
        this.addStyleSheet(style);
      }
    }

    if (this.init && typeof this.init === "function") {
      this.init();
    }
  }

  addStyleSheet(style) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(style);
    this.shadowRoot.adoptedStyleSheets.push(sheet);
  }
}

export class Application {
  defineComponents(components) {
    for (const component of components) {
      if (!component.selector) {
        throw new Error("You must to provide static selector property");
      }

      customElements.define(component.selector, component);
    }
  }

  bootstrap(options) {
    options.rootElement.append(options.rootComponent);
  }
}
