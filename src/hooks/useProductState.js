import { ref, onMounted } from "vue";
import { interpret } from "xstate";
import { productMachine } from "../machines/productMachine";

/**
 * A custom hook for managing the state of the product selection page.
 *
 * @typedef {Object} Product
 * @property {number} id - The ID of the product.
 * @property {string} name - The name of the product.
 *
 * @typedef {Object} ProductState
 * @property {import('xstate').State<any, any, any, { selectedProduct: string | null }>['context']} context - The context of the state machine.
 * @property {import('xstate').State<any, any, any, { selectedProduct: string | null }>['value']} value - The current state value of the state machine.
 *
 * @typedef {Object} ProductService
 * @property {(event: { type: string, product: Product }) => void} send - Sends an event to the state machine.
 * @property {() => void} start - Starts the state machine.
 *
 * @typedef {Object} ProductSelection
 * @property {ProductService} service - The state machine service.
 * @property {Product[]} products - The list of available products.
 * @property {{ value: string | null }} selectedProduct - The currently selected product.
 * @property {(product: Product) => void} selectProduct - Selects a product.
 * @property {() => void} clearSelection - Clears the selected product.
 *
 * @returns {ProductSelection} An object with the `service`, `products`, `selectedProduct`, `selectProduct`, and `clearSelection` variables.
 */
export function useProductState() {
    const products = [
        { id: 1, name: "Product A" },
        { id: 2, name: "Product B" },
    ];
    const selectedProduct = ref(null);

    /**
     * The state machine service for the product selection page.
     *
     * @type {ProductService}
     */
    const service = interpret(productMachine)
        .onTransition((state) => {
            selectedProduct.value = state.context.selectedProduct
                ? products[state.context.selectedProduct - 1]?.name || null
                : null;
        })
        .start();

    /**
     * Selects a product and updates the state machine.
     *
     * @param {Product} product The product to select.
     */
    const selectProduct = (product) => {
        service.send({ type: "SELECT_PRODUCT", product });
    };

    /**
     * Clears the selected product and updates the state machine.
     */
    const clearSelection = () => {
        service.send({ type: "CLEAR_SELECTION" });
    };

    /**
     * Copy the selected product to the clipboard.
     */
    const copySelection = () => {
        service.send({ type: "COPY_SELECTION" });
    };


    /**
     * An object with the `service`, `products`, `selectedProduct`, `selectProduct`, `clearSelection` and `and` variables.
     *
     * @type {ProductSelection}
     */
    return {
        service,
        products,
        selectedProduct,
        selectProduct,
        clearSelection,
        copySelection
    };
}