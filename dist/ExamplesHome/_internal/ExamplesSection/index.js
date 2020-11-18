"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplesSection = void 0;
const util_1 = require("@anderjason/util");
const web_1 = require("@anderjason/web");
const hljs = require("highlight.js");
const skytree_1 = require("skytree");
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
        const codeArea = this.addActor(CodeAreaStyle.toManagedElement({
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
        this.cancelOnDeactivate(this.props.demoActor.exampleCode.didChange.subscribe((code) => {
            if (code == null) {
                codeArea.element.innerHTML = "";
                return;
            }
            const highlighted = hljs.highlight(code.language, code.code);
            codeArea.element.innerHTML = highlighted.value;
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
const CodeAreaStyle = web_1.ElementStyle.givenDefinition({
    elementDescription: "Code",
    css: `
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: #181818;
    padding: 140px 40px 80px 40px;
    grid-area: code;
    white-space: pre-wrap;
    font-family: Menlo, monospace;
    font-size: 13px;
    line-height: 1.4;
    color: #ECECEC;

    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #011627;
      color: #d6deeb;
    }
    
    /* General Purpose */
    .hljs-keyword {
      color: #d48cce;
    }
    .hljs-built_in {
      color: #60a2d7;
    }
    .hljs-type {
      color: #82aaff;
    }
    .hljs-literal {
      color: #ff5874;
    }
    .hljs-number {
      color: #F78C6C;
    }
    .hljs-regexp {
      color: #5ca7e4;
    }
    .hljs-string {
      color: #db9a80;
    }
    .hljs-subst {
      color: #d3423e;
    }
    .hljs-symbol {
      color: #82aaff;
    }
    .hljs-class {
      color: #ffcb8b;
    }
    .hljs-function {
      color: #ECECEC;
    }
    .hljs-title {
      color: #5ce6ca;
    }
    .hljs-params {
      color: #dadada;
    }
    
    /* Meta */
    .hljs-comment {
      color: #637777;
    }
    .hljs-doctag {
      color: #7fdbca;
    }
    .hljs-meta {
      color: #82aaff;
    }
    .hljs-meta-keyword {
      color: #82aaff;
    }
    .hljs-meta-string {
      color: #ecc48d;
    }
    
    /* Tags, attributes, config */
    .hljs-section {
      color: #82b1ff;
    }
    .hljs-tag,
    .hljs-name,
    .hljs-builtin-name {
      color: #7fdbca;
    }
    .hljs-attr {
      color: #aee2fe
      ;
    }
    .hljs-attribute {
      color: #80cbc4;
    }
    .hljs-variable {
      color: #addb67;
    }
    
    /* Markup */
    .hljs-bullet {
      color: #d9f5dd;
    }
    .hljs-code {
      color: #80CBC4;
    }
    .hljs-emphasis {
      color: #c792ea;
    }
    .hljs-strong {
      color: #addb67;
      font-weight: bold;
    }
    .hljs-formula {
      color: #c792ea;
    }
    .hljs-link {
      color: #ff869a;
    }
    .hljs-quote {
      color: #697098;
    }
    
    /* CSS */
    .hljs-selector-tag {
      color: #ff6363;
    }
    
    .hljs-selector-id {
      color: #fad430;
    }
    
    .hljs-selector-class {
      color: #addb67;
    }
    
    .hljs-selector-attr,
    .hljs-selector-pseudo {
      color: #c792ea;
    }
    
    /* Templates */
    .hljs-template-tag {
      color: #c792ea;
    }
    .hljs-template-variable {
      color: #addb67;
    }
    
    /* diff */
    .hljs-addition {
      color: #addb67ff;
    }
    
    .hljs-deletion {
      color: #EF535090;
    }
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