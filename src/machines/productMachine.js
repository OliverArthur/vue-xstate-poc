import { createMachine, assign } from 'xstate';

/**
 * @typedef {Object} ProductContext
 * @property {string|null} selectedProduct - The ID of the selected product, or null if no product is selected.
 */

/**
 * @typedef {Object} ProductEvent
 * @property {string} type - The type of the event.
 * @property {string} [product] - The ID of the selected product.
 */

/**
 * @typedef {import('xstate').StateNode<ProductContext, any, ProductEvent>} ProductStateNode
 */

/**
 * The state machine for the product page.
 *
 * @type {ProductStateNode}
 */
export const productMachine = createMachine({
  id: 'product',
  initial: 'idle',
  context: {
    selectedProduct: null
  },
  states: {
    idle: {
      on: {
        SELECT_PRODUCT: {
          actions: [
            assign({
              selectedProduct: (context, event) => event.product
            }),
            (context, event) => {
              // Add the selected product to the history state
              history.replaceState({ selectedProduct: event.product }, "");

            }
          ]
        },
        RESTORE_PRODUCT: {
          actions: [
            assign({
              selectedProduct: (context, event) => event.product
            })
          ]
        },
        CLEAR_SELECTION: {
          actions: [
            assign({
              selectedProduct: null
            }),
            (context, event) => {
              // Remove the selected product from the history state
              history.replaceState({}, "");
            }
          ]
        },
        COPY_SELECTION: 'copy'
      }
    },
    copy: {
      entry: (context, event) => {
        // Copy the selected product to the clipboard
        const url = new URL(window.location.href);
        url.searchParams.set("product", context.selectedProduct);
        navigator.clipboard.writeText(url.toString());
      },
      exit: (context, event) => {
        // Clear the selected product from the clipboard
        navigator.clipboard.writeText("");
      },
      on: {
        CANCEL_COPY: 'idle'
      }
    }
  }
});