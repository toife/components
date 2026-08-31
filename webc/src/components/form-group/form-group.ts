import { html } from "lit";
import { property } from "lit/decorators.js";
import {
  FORM_GROUP_DEFAULT_PROPS,
  getFormGroupAttrs,
  type FormGroupDirection,
  type FormGroupProps,
} from "@/core";
import { attrsClass, ToifeElement } from "../../shared";

export class FormGroup extends ToifeElement {
  static readonly tagName = "t-form-group";

  @property({ type: String }) direction: FormGroupDirection = FORM_GROUP_DEFAULT_PROPS.direction;

  private get formGroupAttrs() {
    return getFormGroupAttrs({ direction: this.direction });
  }

  render() {
    return html`<div class=${attrsClass(this.formGroupAttrs)}><slot></slot></div>`;
  }
}

export type { FormGroupProps };
