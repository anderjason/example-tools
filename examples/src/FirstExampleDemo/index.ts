import { Actor } from "skytree";
import { ElementStyle } from "@anderjason/web";
import { Observable } from "@anderjason/observable";
import { DemoActor } from "../../../src";

export interface FirstExampleDemoProps {}

export class FirstExampleDemo
  extends Actor<FirstExampleDemoProps>
  implements DemoActor {
  readonly parentElement = Observable.ofEmpty<HTMLElement>();
  readonly isVisible = Observable.ofEmpty<boolean>();

  onActivate() {
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
