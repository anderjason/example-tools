import { ElementStyle } from "@anderjason/web";
import { DemoActor } from "../../../src";

export interface FirstExampleDemoProps {}

export class FirstExampleDemo extends DemoActor<FirstExampleDemoProps> {
  onActivate() {
    this.exampleCode.setValue({
      language: "typescript",
      code: `
        this.addActor(
          WrapperStyle.toManagedElement({
            tagName: "div",
            parentElement: this.parentElement,
          })
        );  
      `,
    });

    this.addActor(
      WrapperStyle.toManagedElement({
        tagName: "div",
        parentElement: this.parentElement,
      })
    );
  }
}

const WrapperStyle = ElementStyle.givenDefinition({
  elementDescription: "FirstExampleDemo",
  css: `
    width: 100%;
    height: 100%;
    background: blue;
  `,
});
