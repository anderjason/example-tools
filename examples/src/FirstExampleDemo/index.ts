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
    const wrapper = this.addActor(
      WrapperStyle.toManagedElement({
        tagName: "div",
        parentElement: this.parentElement,
      })
    );
  }
}

const WrapperStyle = ElementStyle.givenDefinition({
  css: `
    width: 100%;
    height: 100%;
    background: blue;
  `,
});
