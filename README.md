# Vue.js and XState POC

This is a proof-of-concept project that demonstrates how to use XState with Vue.js to handle complex states in a Vue.js application.

## Functionality

The project includes a `productMachine.js` file that defines a state machine for managing the state of a product selection page. The state machine has four states (`idle`, `loading`, `loaded`, and `copy`) and four events (`SELECT_PRODUCT`, `RESTORE_PRODUCT`, `CLEAR_SELECTION`, and `COPY_SELECTION`) that can transition the state machine to different states.

The project also includes a `useProductState` hook that provides a simple and intuitive way to use the `productMachine` state machine in a Vue.js component. The `useProductState` hook returns an object that includes the `products`, `selectedProduct`, `selectProduct`, `clearSelection`, and `copySelection` variables.

The `products` variable is an array of product objects, the `selectedProduct` variable is the ID of the selected product (or `null` if no product is selected), the `selectProduct` function is used to select a product, the `clearSelection` function is used to clear the selected product, and the `copySelection` function is used to copy the selected product to the clipboard.

## When to use Pinia store, XState, or hooks

`Pinia store`, `XState`, and `hooks` are all tools that can be used to manage state in a Vue.js application. Here are some guidelines for when to use each tool:

- Use Pinia store when you need to manage global state that needs to be shared across multiple components.

- Use XState when you need to manage complex state that involves multiple states and transitions between those states.

- Use hooks when you need to encapsulate stateful logic in a reusable function, or when you need to manage state that is specific to a single component.

Of course, these are general guidelines, and the choice of which tool to use ultimately depends on the specific requirements of the application.

## Project setup

To use the project, you will need to have Node.js and PNPM installed on your system. You can install PNPM by running the following command:

```sh
npm install -g pnpm
```

Once you have PNPM installed, you can clone the project and install its dependencies by running the following commands:

```sh
git clone https://github.com/oliverarthur/vue-xstate-poc.git
cd vue-xstate-poc
pnpm install
```

You can then run the project in development mode by running the following command:

```sh
pnpm run dev
```
