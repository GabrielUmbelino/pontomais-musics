import { createWebHistory, createRouter } from "vue-router";
import { homeRoutes, personRoutes } from '@/pages'

const routes = [
  ...homeRoutes, ...personRoutes
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

