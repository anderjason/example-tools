import { Actor } from "skytree";
import { DemoActor } from "../../../DemoActor";
export interface ExamplesSectionProps {
    parentElement: HTMLElement;
    scrollElement: HTMLElement;
    demoActor: DemoActor;
    title: string;
}
export declare class ExamplesSection extends Actor<ExamplesSectionProps> {
    onActivate(): void;
}
