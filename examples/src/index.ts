import { ObservableArray } from "@anderjason/observable";
import { ExampleDefinition, ExamplesHome } from "../../src";
import { FirstExampleDemo } from "./FirstExampleDemo";

const definitions = ObservableArray.givenValues<ExampleDefinition>([
  {
    title: "First example",
    actor: new FirstExampleDemo({}),
  },
]);

const main = new ExamplesHome({
  title: "example-tools",
  definitions,
});
main.activate();
