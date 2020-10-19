import { Observable } from "@anderjason/observable";
import { Actor } from "skytree";
export interface DemoActor extends Actor {
    parentElement: Observable<HTMLElement>;
    isVisible: Observable<boolean>;
}
