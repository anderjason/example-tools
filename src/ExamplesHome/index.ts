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
      SidebarAreaStyle.toManagedElement({
        tagName: "div",
        parentElement: mainArea.element,
      })
    );

    const sidebarScroll = this.addActor(
      new ScrollArea({
        parentElement: sidebarArea.element,
        direction: "vertical",
        scrollPositionColor: Color.givenHexString("#444444"),
      })
    );

    const contentArea = this.addActor(
      ContentAreaStyle.toManagedElement({
        tagName: "div",
        parentElement: mainArea.element,
      })
    );

    const contentScroll = this.addActor(
      new ScrollArea({
        parentElement: contentArea.element,
        direction: "vertical",
        scrollPositionColor: Color.givenHexString("#FF0000"),
      })
    );

    const parentElement = contentScroll.element;
    const scrollElement = contentScroll.element;

    this.addActor(
      new ExamplesSidebar({
        parentElement: sidebarScroll.element,
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
  elementDescription: "ExamplesHomeWrapper",
  css: `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background: #FFF;
  `,
});

const SidebarAreaStyle = ElementStyle.givenDefinition({
  elementDescription: "SidebarArea",
  css: `
    width: 300px;
    position: relative;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    flex-shrink: 0;

    @media screen and (max-width: 600px) {
      position: absolute;
    }
  `,
});

const ContentAreaStyle = ElementStyle.givenDefinition({
  elementDescription: "ContentArea",
  css: `
    flex-grow: 1;
    position: relative;
  `,
});
