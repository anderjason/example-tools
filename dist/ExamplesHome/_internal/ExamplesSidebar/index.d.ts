import { Actor } from "skytree";
import { ObservableArray } from "@anderjason/observable";
import { ExampleDefinition } from "../../../ExampleDefinition";
export interface ExamplesSidebarProps {
    parentElement: HTMLElement;
    definitions: ObservableArray<ExampleDefinition>;
}
export declare class ExamplesSidebar extends Actor<ExamplesSidebarProps> {
    onActivate(): void;
}
