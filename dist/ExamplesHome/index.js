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
        const sidebarArea = this.addActor(SidebarAreaStyle.toManagedElement({
            tagName: "div",
            parentElement: mainArea.element,
        }));
        const sidebarScroll = this.addActor(new web_1.ScrollArea({
            parentElement: sidebarArea.element,
            direction: "vertical",
            scrollPositionColor: color_1.Color.givenHexString("#444444"),
            backgroundColor: color_1.Color.givenHexString("#fafafa"),
        }));
        const contentArea = this.addActor(ContentAreaStyle.toManagedElement({
            tagName: "div",
            parentElement: mainArea.element,
        }));
        const contentScroll = this.addActor(new web_1.ScrollArea({
            parentElement: contentArea.element,
            direction: "vertical",
            scrollPositionColor: color_1.Color.givenHexString("#DDDDDD"),
            backgroundColor: color_1.Color.givenHexString("#181818"),
        }));
        const parentElement = contentScroll.element;
        const scrollElement = contentScroll.element;
        this.addActor(new ExamplesSidebar_1.ExamplesSidebar({
            parentElement: sidebarScroll.element,
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
    display: flex;
    background: #FFF;

    @media screen and (max-width: 600px) {
      display: block;
    }
  `,
});
const SidebarAreaStyle = web_1.ElementStyle.givenDefinition({
    css: `
    width: 250px;
    position: relative;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    flex-shrink: 0;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  `,
});
const ContentAreaStyle = web_1.ElementStyle.givenDefinition({
    css: `
    flex-grow: 1;
    position: relative;
  `,
});
//# sourceMappingURL=index.js.map