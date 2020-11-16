import { Actor } from "skytree";
import { DemoActor } from "../../../DemoActor";
export interface ExamplesSectionProps {
    parentElement: HTMLElement;
    scrollElement: HTMLElement;
    demoActor: DemoActor<any>;
    title: string;
}
export interface ExampleCode {
    language: "jsx" | "typescript";
    code: string;
}
export declare class ExamplesSection extends Actor<ExamplesSectionProps> {
    onActivate(): void;
}
