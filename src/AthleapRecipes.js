import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-form-textarea/bbva-form-textarea.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-button-action/bbva-button-action.js';
import '@bbva-web-components/bbva-web-progress-content/bbva-web-progress-content.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaClose } from '@bbva-web-components/bbva-foundations-icons';
import styles from './AthleapRecipes-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<athleap-recipes></athleap-recipes>
```

##styling-doc

@customElement athleap-recipes
*/
export class AthleapRecipes extends BbvaCoreIntlMixin(LitElement) {
  static get is() {
    return 'athleap-recipes';
  }

  // Declare properties
  static get properties() {
    return {
      // Recipe title
      title: { type: String },
      // Wether the recipe is loading or not
      loading: { type: Boolean },
      // Ingredients list
      // @type {string[]}
      ingredients: { type: Array },
      // Recipe preparation
      preparation: { type: String },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.title = '';
    this.loading = false;
    this.ingredients = [];
    this.preparation = '';
  }

  static get styles() {
    return [styles, getComponentSharedStyles('athleap-recipes-shared-styles')];
  }

  /**
   * Adds ingredients to the ingredients list
   * @param {event} which will be prevented in order to handle the behavior
   * ourseleves.
   * @return {undefined} as nothing is to be returned.
   */
  _addIngredient(e) {
    e.preventDefault();
    this.ingredients = [
      ...this.ingredients,
      this.shadowRoot.querySelector('#add-ingredient-form-text').value,
    ];
    this.shadowRoot.querySelector('#add-ingredient-form-text').value = '';

    /**
     * Fired when the #add-ingredient button is clicked
     * @event add-ingredient
     * @param {Object} detail {
     * title: string,
     * ingredients: [],
     * preparation: string
     * }
     */
    this.dispatchEvent(new CustomEvent('add-ingredient'), {
      bubbles: true,
      composed: true,
      detail: {
        title: this.title,
        ingredients: this.ingredients,
        preparation: this.preparation,
      },
    });
  }

  /**
   * Deletes ingredient from ingredients list
   * @param {event} which will be prevented in order to handle the behavior
   * ourselves.
   * @return {undefined} as nothing is to be returned
   */

  _deleteIngredient(e) {
    e.preventDefault();
    this.ingredients = this.ingredients.filter(
      (_, index) => index !== Number(e.target.id)
    );
    /**
     * fired when the .delete-ingredient button is clicked
     * @event delete-ingredient
     * @param {Object} detail {
     * title: string,
     * ingredients: [],
     * preparation: string
     * }
     */
    this.dispatchEvent(
      new CustomEvent('delete-ingredient', {
        bubbles: true,
        composed: true,
        detail: {
          title: this.title,
          ingredients: this.ingredients,
          preparation: this.preparation,
        },
      })
    );
  }

  // Define a template
  render() {
    return html`
      <section id="recipe-container">
      <bbva-web-progress-content
        heading="Cargando recetas"
        ?hidden="${!this.loading}"
        ></bbva-web-progress-content>
      </bbva-web-progress-content>
      <form ?hidden=${this.loading}>
      </bbva-web-form-text>
        <bbva-web-form-text
          label="${this.t('recipe-title-text')}"
          id="recipe-title"
          .value="${this.title}"
        ></bbva-web-form-text>
        <bbva-web-form-text
          label="${this.t('add-new-ingredient-text')}"
          id="add-ingredient-form-text"
        ></bbva-web-form-text>
        <div class="center-horizontal-content">
          <bbva-button-default @click="${this._addIngredient}">
            ${this.t('add-ingredient-button-text')}
          </bbva-button-default>
        </div>
        ${this.ingredients.map(
          (ingredient, index) => html`
            <div class="ingredient-container">
              <p>${ingredient}</p>
              <bbva-button-action
                id="${index}"
                class="delete-ingredient"
                @click="${this._deleteIngredient}"
                icon="${bbvaClose()}"
                label="${this.t('delete-ingredient-text')}"
              >
              </bbva-button-action>
            </div>
          `
        )}
        <bbva-form-textarea
          label="${this.t('preparation-text')}"
          id="preparation-form-textarea"
          .value="${this.preparation}"
        >
        </bbva-form-textarea>
      </form>

      </section>
    `;
  }
}
