"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplesSidebar = void 0;
const skytree_1 = require("skytree");
const web_1 = require("@anderjason/web");
const util_1 = require("@anderjason/util");
class ExamplesSidebar extends skytree_1.Actor {
    onActivate() {
        const wrapper = this.addActor(WrapperStyle.toManagedElement({
            tagName: "div",
            parentElement: this.props.parentElement,
        }));
        const title = this.addActor(TitleStyle.toManagedElement({
            tagName: "div",
            parentElement: wrapper.element,
        }));
        title.element.innerHTML = this.props.title;
        this.addActor(new skytree_1.ArrayActivator({
            input: this.props.definitions,
            fn: (definition) => {
                const result = LinkStyle.toManagedElement({
                    tagName: "a",
                    parentElement: wrapper.element,
                    transitionIn: () => {
                        result.element.href =
                            "#" + util_1.StringUtil.stringWithCase(definition.title, "kebab-case");
                        result.element.innerHTML = definition.title;
                    },
                });
                return result;
            },
        }));
    }
}
exports.ExamplesSidebar = ExamplesSidebar;
const WrapperStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "ExamplesSidebar",
    css: `
    padding: 0 0 0 20px;

    @media screen and (max-width: 600px) {
      background: #FAFAFA;
      position: absolute;
      left: 0;
      top: 0;
      width: 250px;
      height: 100vh;
      z-index: 10;
      display: none;  /* TODO */
    }
  `,
});
const LinkStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "Link",
    css: `
    cursor: pointer;
    display: block;
    color: #000;
    text-decoration: none;
    font-size: 13px;
    line-height: 19.5px;
    margin-top: 5px;

    &:hover {
      color: #0055FF;
    }
  `,
});
const TitleStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "Title",
    css: `
    font-weight: bold;
    height: 80px;
    padding: 20px 0;
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: flex-end;
    font-size: 20px;
    line-height: 20px;
    color: #181818;
  `,
});
//# sourceMappingURL=index.js.map