import { CardComponent } from "./app/components/card/card";
import { CreatorComponent } from "./app/components/creator/creator";
import { ListComponent } from "./app/components/list/list";
import { Application } from "./app/core";
import { RootComponent } from "./app/root";

const app = new Application();

app.defineComponents([
  RootComponent,
  CreatorComponent,
  ListComponent,
  CardComponent,
]);

app.bootstrap({
  rootElement: document.getElementById("root"),
  rootComponent: document.createElement(RootComponent.selector),
});
