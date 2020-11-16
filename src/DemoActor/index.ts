import { Observable } from "@anderjason/observable";
import { Actor } from "skytree";
import { ExampleCode } from "../ExamplesHome/_internal/ExamplesSection";

export abstract class DemoActor<T> extends Actor<T> {
  readonly parentElement = Observable.ofEmpty<HTMLElement>();
  readonly isVisible = Observable.ofEmpty<boolean>();
  readonly exampleCode = Observable.ofEmpty<ExampleCode>();
}
