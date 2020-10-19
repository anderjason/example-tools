import { Actor } from "skytree";
import { ElementStyle, IntersectionWatcher } from "@anderjason/web";
import { Percent, StringUtil } from "@anderjason/util";
import { DemoActor } from "../../../DemoActor";

export interface ExamplesSectionProps {
  parentElement: HTMLElement;
  scrollElement: HTMLElement;
  demoActor: DemoActor;
  title: string;
}

export class ExamplesSection extends Actor<ExamplesSectionProps> {
  onActivate() {
    const wrapper = this.addActor(
      WrapperStyle.toManagedElement({
        tagName: "div",
        parentElement: this.props.parentElement,
      })
    );

    const description = this.addActor(
      DescriptionStyle.toManagedElement({
        tagName: "div",
        parentElement: wrapper.element,
      })
    );

    const code = this.addActor(
      CodeStyle.toManagedElement({
        tagName: "div",
        parentElement: wrapper.element,
      })
    );

    const anchor = document.createElement("a");
    anchor.id = StringUtil.stringWithCase(this.props.title, "kebab-case");
    description.element.appendChild(anchor);

    const titleElement = document.createElement("h2");
    titleElement.innerHTML = this.props.title;
    description.element.appendChild(titleElement);

    const demoArea = this.addActor(
      DemoAreaStyle.toManagedElement({
        tagName: "div",
        parentElement: description.element,
      })
    );

    const intersectionWatcher = this.addActor(
      new IntersectionWatcher({
        element: demoArea.element,
        scrollElement: this.props.scrollElement,
        minimumVisiblePercent: Percent.givenFraction(4, 5),
      })
    );

    this.props.demoActor.parentElement.setValue(demoArea.element);
    this.addActor(this.props.demoActor);

    this.cancelOnDeactivate(
      intersectionWatcher.isElementVisible.didChange.subscribe((isVisible) => {
        demoArea.setModifier("isVisible", isVisible);
        this.props.demoActor.isVisible.setValue(isVisible);
      }, true)
    );
  }
}

const WrapperStyle = ElementStyle.givenDefinition({
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

const DescriptionStyle = ElementStyle.givenDefinition({
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

const CodeStyle = ElementStyle.givenDefinition({
  css: `
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: #181818;
    padding: 80px 40px;
    grid-area: code;
  `,
});

const DemoAreaStyle = ElementStyle.givenDefinition({
  css: `
    width: 600px;
    height: 500px;
    background: #17161E;
    border-radius: 12px;
    position: relative;

    & > * {
      border-radius: 12px;
      opacity: 0.4;
      transition: 0.3s ease opacity;
    }

    @media screen and (max-width: 600px) {
      width: calc(100% + 30px);
      border-radius: 0;
      height: 300px;
      margin-left: -15px;
      margin-right: -15px;

      & > * {
        border-radius: 0;
      }
    }
  `,
  modifiers: {
    isVisible: `
      & > * {
        opacity: 1;
      }
    `,
  },
});
