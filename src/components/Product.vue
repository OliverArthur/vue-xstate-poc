<template>
  <div class="product">
    <h1 class="product__title">Product Page</h1>
    <div class="product__list">
      <div v-for="product in products" :key="product.id" class="product__item">
        <button @click="selectProduct(product.id)" class="product__button">
          Select {{ product.name }}
        </button>
      </div>
    </div>
    <div v-if="selectedProduct" class="product__selected">
      Selected Product: {{ selectedProduct }}
    </div>
    <router-link to="/" class="product__link">Go to Home Page</router-link>
    <button @click="copySelection">Copy Selection</button>

  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useProductState } from "../hooks/useProductState";

const {
    service,
    products,
    selectedProduct,
    selectProduct,
    clearSelection,
    copySelection
} = useProductState();

onMounted(() => {
    // Restore the selected product from the history state when the page is loaded
    if (history.state && history.state.selectedProduct) {
        service.send({ type: "RESTORE_PRODUCT", product: history.state.selectedProduct });
    }

    // Restore the selected product from the history state when the popstate event is fired
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.selectedProduct) {
            service.send({ type: "RESTORE_PRODUCT", product: event.state.selectedProduct });
        }
    });
});
</script>
<style scoped>
.product {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.product__title {
    font-size: 24px;
    margin-bottom: 20px;
}

.product__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
}

.product__item {
    margin: 10px;
}

.product__button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.product__button:hover {
    background-color: #0062cc;
}

.product__selected {
    margin-top: 20px;
}

.product__link {
    margin-top: 20px;
}
</style>