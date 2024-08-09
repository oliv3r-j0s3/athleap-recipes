/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

bbva-web-progress-content {
  padding-top: 5vh;
}

bbva-web-form-text,
bbva-form-textarea {
  max-width: 800px;
  width: 90vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

#recipe-container {
  margin-top: 5vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}
`;