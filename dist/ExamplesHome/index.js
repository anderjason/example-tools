"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplesHome = void 0;
const color_1 = require("@anderjason/color");
const web_1 = require("@anderjason/web");
const skytree_1 = require("skytree");
const ExamplesSection_1 = require("./_internal/ExamplesSection");
const ExamplesSidebar_1 = require("./_internal/ExamplesSidebar");
class ExamplesHome extends skytree_1.Actor {
    onActivate() {
        const mainArea = this.addActor(WrapperStyle.toManagedElement({
            tagName: "div",
            parentElement: document.body,
        }));
        const sidebarArea = this.addActor(new web_1.ScrollArea({
            parentElement: mainArea.element,
            direction: "vertical",
            scrollPositionColor: color_1.Color.givenHexString("#444444"),
            backgroundColor: color_1.Color.givenHexString("#fafafa"),
        }));
        sidebarArea.element.style.gridArea = "sidebar";
        sidebarArea.element.style.borderRight = "1px solid rgba(0, 0, 0, 0.05)";
        const contentArea = this.addActor(new web_1.ScrollArea({
            parentElement: mainArea.element,
            direction: "vertical",
            scrollPositionColor: color_1.Color.givenHexString("#DDDDDD"),
            backgroundColor: color_1.Color.givenHexString("#181818"),
        }));
        contentArea.element.style.gridArea = "content";
        const parentElement = contentArea.element;
        const scrollElement = mainArea.element;
        this.addActor(new ExamplesSidebar_1.ExamplesSidebar({
            parentElement: sidebarArea.element,
            title: this.props.title,
            definitions: this.props.definitions,
        }));
        this.addActor(new skytree_1.ArrayActivator({
            input: this.props.definitions,
            fn: (definition) => {
                return new ExamplesSection_1.ExamplesSection({
                    parentElement,
                    scrollElement,
                    title: definition.title,
                    demoActor: definition.actor,
                });
            },
        }));
    }
}
exports.ExamplesHome = ExamplesHome;
const WrapperStyle = web_1.ElementStyle.givenDefinition({
    css: `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    background: #FFF;
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "sidebar content";

    @media screen and (max-width: 600px) {
      display: block;
    }
  `,
});
//# sourceMappingURL=index.js.map