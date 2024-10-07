import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.value = "";
    this.min = "";
    this.max = "";
  }

  static get properties() {
    return {
      title: { type: String },
      value: { type: Number },
      max: { type: Number },
      min: { type: Number }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        margin: var(--ddd-spacing-4);
      }

      .title {
        text-align: center;
        font-size: var(--ddd-font-size-ml);
      }

      .value {
        text-align: center;
        font-size: var(--ddd-font-size-xl);
        color: var(--counter-color, var(--ddd-theme-primary));
      }

      .buttons-wrapper {
        display: flex;
        margin-top: var(--ddd-spacing-4);
      }

      .button {
        width: 16px;
        flex-grow: 1;
        font-size: var(--ddd-font-size-ms);
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        background: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-roarLight);
        cursor: pointer;
        border-radius: var(--ddd-radius-xs);
      }

      .button:hover,
      .button:focus {
        background: var(--ddd-theme-default-beaver80);
      }
    `];
  }

  render() {
    return html`

    <confetti-container id="confetti">
      <div class="wrapper">
        <div class="title">${this.title}</div>
        <div class="value" style="color: ${this.getColor()}">${this.value}</div>
        <div class="buttons-wrapper">
          <button class="button" @click=${this.handleDecrement} ?disabled="${this.min === this.value}">-</button>
          <button class="button" @click=${this.handleIncrement} ?disabled="${this.max === this.value}">+</button>
        </div>
      </div>
    </confetti-container>`;
  }

  handleIncrement(x) {
    if (this.value < this.max) {
      this.value++;
    }
  }

  handleDecrement(x) {
    if (this.value > this.min) {
      this.value--;
    }
  }

  getColor() {
    if (this.value === 21) {
      return "red";
    } else if (this.value === 18) {
      return "green";
    } else if (this.value === this.min || this.value === this.max) {
      return "blue";
    }
    return "";
  }
  /**
   * haxProperties integration via file reference
   */

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      if (this.value === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);