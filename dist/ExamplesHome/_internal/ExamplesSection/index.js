"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplesSection = void 0;
const skytree_1 = require("skytree");
const web_1 = require("@anderjason/web");
const util_1 = require("@anderjason/util");
class ExamplesSection extends skytree_1.Actor {
    onActivate() {
        const wrapper = this.addActor(WrapperStyle.toManagedElement({
            tagName: "div",
            parentElement: this.props.parentElement,
        }));
        const description = this.addActor(DescriptionStyle.toManagedElement({
            tagName: "div",
            parentElement: wrapper.element,
        }));
        const code = this.addActor(CodeStyle.toManagedElement({
            tagName: "div",
            parentElement: wrapper.element,
        }));
        const anchor = document.createElement("a");
        anchor.id = util_1.StringUtil.stringWithCase(this.props.title, "kebab-case");
        description.element.appendChild(anchor);
        const titleElement = document.createElement("h2");
        titleElement.innerHTML = this.props.title;
        description.element.appendChild(titleElement);
        const demoArea = this.addActor(DemoAreaStyle.toManagedElement({
            tagName: "div",
            parentElement: description.element,
        }));
        const demoContent = this.addActor(DemoContentStyle.toManagedElement({
            tagName: "div",
            parentElement: demoArea.element,
        }));
        const intersectionWatcher = this.addActor(new web_1.IntersectionWatcher({
            element: demoArea.element,
            scrollElement: this.props.scrollElement,
            minimumVisiblePercent: util_1.Percent.givenFraction(4, 5),
        }));
        this.props.demoActor.parentElement.setValue(demoArea.element);
        this.addActor(this.props.demoActor);
        this.cancelOnDeactivate(intersectionWatcher.isElementVisible.didChange.subscribe((isVisible) => {
            demoContent.setModifier("isVisible", isVisible);
            this.props.demoActor.isVisible.setValue(isVisible);
        }, true));
    }
}
exports.ExamplesSection = ExamplesSection;
const WrapperStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "ExamplesSection",
    css: `
    min-height: 400px;
    display: grid;
    background: #FFF;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "description code";

    @media screen and (max-width: 600px) {
      display: block;
    }
  `,
});
const DescriptionStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "Description",
    css: `
    border-bottom: 1px solid rgba(180, 180, 180, 0.2);
    background: #FFF;
    padding: 80px 40px;
    grid-area: description;

    & > h2 {
      color: #181818;
      margin: 0 0 20px 0;
      padding: 0;
    }

    @media screen and (max-width: 600px) {
      padding: 30px 15px;

      & > h2 {
        font-size: 15px;
      }
    }
  `,
});
const CodeStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "Code",
    css: `
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: #181818;
    padding: 80px 40px;
    grid-area: code;
  `,
});
const DemoAreaStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "DemoArea",
    css: `
    width: 600px;
    height: 500px;
    background: #17161E;
    border-radius: 12px;
    position: relative;
    overflow: hidden;

    @media screen and (max-width: 600px) {
      width: calc(100% + 30px);
      border-radius: 0;
      height: 300px;
      margin-left: -15px;
      margin-right: -15px;
    }
  `,
});
const DemoContentStyle = web_1.ElementStyle.givenDefinition({
    css: `
    opacity: 0.4;
    transition: 0.3s ease opacity;
  `,
    modifiers: {
        isVisible: `
      opacity: 1;
    `,
    },
});
//# sourceMappingURL=index.js.map