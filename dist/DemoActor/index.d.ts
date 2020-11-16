import { Observable } from "@anderjason/observable";
import { Actor } from "skytree";
import { ExampleCode } from "../ExamplesHome/_internal/ExamplesSection";
export declare abstract class DemoActor<T> extends Actor<T> {
    readonly parentElement: Observable<HTMLElement>;
    readonly isVisible: Observable<boolean>;
    readonly exampleCode: Observable<ExampleCode>;
}
