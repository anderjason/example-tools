import { ObservableArray } from "@anderjason/observable";
import { Actor } from "skytree";
import { ExampleDefinition } from "../ExampleDefinition";
export interface ExamplesHomeProps {
    definitions: ObservableArray<ExampleDefinition>;
}
export declare class ExamplesHome extends Actor<ExamplesHomeProps> {
    onActivate(): void;
}
