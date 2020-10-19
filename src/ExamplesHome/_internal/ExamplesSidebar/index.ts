import { Actor, ArrayActivator } from "skytree";
import { ElementStyle } from "@anderjason/web";
import { ObservableArray } from "@anderjason/observable";
import { StringUtil } from "@anderjason/util";
import { ExampleDefinition } from "../../../ExampleDefinition";

export interface ExamplesSidebarProps {
  parentElement: HTMLElement;
  definitions: ObservableArray<ExampleDefinition>;
}

export class ExamplesSidebar extends Actor<ExamplesSidebarProps> {
  onActivate() {
    const wrapper = this.addActor(
      WrapperStyle.toManagedElement({
        tagName: "div",
        parentElement: this.props.parentElement,
      })
    );

    const title = this.addActor(
      TitleStyle.toManagedElement({
        tagName: "div",
        parentElement: wrapper.element,
      })
    );
    title.element.innerHTML = "Geometry";

    this.addActor(
      new ArrayActivator({
        input: this.props.definitions,
        fn: (definition) => {
          const result = LinkStyle.toManagedElement({
            tagName: "a",
            parentElement: wrapper.element,
            transitionIn: () => {
              result.element.href =
                "#" + StringUtil.stringWithCase(definition.title, "kebab-case");
              result.element.innerHTML = definition.title;
            },
          });

          return result;
        },
      })
    );
  }
}

const WrapperStyle = ElementStyle.givenDefinition({
  css: `
    padding: 0 0 0 20px;

    @media screen and (max-width: 600px) {
      background: #FAFAFA;
      position: absolute;
      left: 0;
      top: 0;
      width: 250px;
      height: 100vh;
      z-index: 10;
      display: none;  /* TODO */
    }
  `,
});

const LinkStyle = ElementStyle.givenDefinition({
  css: `
    cursor: pointer;
    display: block;
    color: #000;
    text-decoration: none;
    font-size: 13px;
    line-height: 19.5px;
    margin-top: 5px;

    &:hover {
      color: #0055FF;
    }
  `,
});

const TitleStyle = ElementStyle.givenDefinition({
  css: `
    font-weight: bold;
    height: 80px;
    padding: 20px 0;
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: flex-end;
    font-size: 20px;
    line-height: 20px;
  `,
});
