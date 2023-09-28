import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Product from '../components/Product.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;





