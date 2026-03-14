import { createRouter, createWebHistory } from 'vue-router'

// Importing the 7 Page Components
import HomeView from '../views/HomeView.vue' // Page 1: Product list
import ProductDetailView from '../views/ProductDetailView.vue' // Page 2: Product details
import AdminDashboardView from '../views/AdminDashboardView.vue' // Page 3: Admin page
import UserOrdersView from '../views/UserOrdersView.vue' // Page 4: User commands tracking
import UserProfileView from '../views/UserProfileView.vue' // Page 5: User profile
import LoginView from '../views/LoginView.vue' // Page 6: Login
import SignUpView from '../views/SignUpView.vue' // Page 7: Sign up

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // Page 1
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView, // Page 2
    props: true 
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboardView, // Page 3
    // Meta tag to protect this route later
    meta: { requiresAdmin: true } 
  },
  {
    path: '/my-orders',
    name: 'user-orders',
    component: UserOrdersView, // Page 4
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: UserProfileView, // Page 5
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView // Page 6
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView // Page 7
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // This works in Vite
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  // If route requires admin and user is not admin
  if (to.meta.requiresAdmin && role !== 'admin') {
    return next('/login');
  }

  // If route requires auth and user is not logged in
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  next();
});
export default router