import { Color } from "@anderjason/color";
import { ObservableArray } from "@anderjason/observable";
import { ElementStyle, ScrollArea } from "@anderjason/web";
import { Actor, ArrayActivator } from "skytree";
import { ExampleDefinition } from "../ExampleDefinition";
import { ExamplesSection } from "./_internal/ExamplesSection";
import { ExamplesSidebar } from "./_internal/ExamplesSidebar";

export interface ExamplesHomeProps {
  title: string;
  definitions: ObservableArray<ExampleDefinition>;
}

export class ExamplesHome extends Actor<ExamplesHomeProps> {
  onActivate() {
    const mainArea = this.addActor(
      WrapperStyle.toManagedElement({
        tagName: "div",
        parentElement: document.body,
      })
    );

    const sidebarArea = this.addActor(
      new ScrollArea({
        parentElement: mainArea.element,
        direction: "vertical",
        scrollPositionColor: Color.givenHexString("#444444"),
        backgroundColor: Color.givenHexString("#fafafa"),
      })
    );
    sidebarArea.element.style.gridArea = "sidebar";
    sidebarArea.element.style.borderRight = "1px solid rgba(0, 0, 0, 0.05)";

    const contentArea = this.addActor(
      new ScrollArea({
        parentElement: mainArea.element,
        direction: "vertical",
        scrollPositionColor: Color.givenHexString("#DDDDDD"),
        backgroundColor: Color.givenHexString("#181818"),
      })
    );
    contentArea.element.style.gridArea = "content";

    const parentElement = contentArea.element;
    const scrollElement = mainArea.element;

    this.addActor(
      new ExamplesSidebar({
        parentElement: sidebarArea.element,
        title: this.props.title,
        definitions: this.props.definitions,
      })
    );

    this.addActor(
      new ArrayActivator({
        input: this.props.definitions,
        fn: (definition) => {
          return new ExamplesSection({
            parentElement,
            scrollElement,
            title: definition.title,
            demoActor: definition.actor,
          });
        },
      })
    );
  }
}

const WrapperStyle = ElementStyle.givenDefinition({
  css: `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    background: #FFF;
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "sidebar content";

    @media screen and (max-width: 600px) {
      display: block;
    }
  `,
});
