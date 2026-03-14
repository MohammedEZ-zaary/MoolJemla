<!-- <template>
  <nav class="bg-primary text-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <router-link to="/" class="text-2xl font-bold tracking-wider hover:text-gray-200 transition">
          MoolJemal
        </router-link>

        <div class="flex space-x-6 items-center">
          <router-link to="/" class="hover:text-gray-200 transition">Products</router-link>

          <template v-if="isLoggedIn">
           

            <router-link v-if="isAdmin" to="/admin" class="text-warning font-bold hover:text-yellow-300 transition">
              Admin Panel
            </router-link>
            
            <router-link to="/my-orders" class="hover:text-gray-200 transition">My Commands</router-link>
            <router-link to="/profile" class="hover:text-gray-200 transition">Profile</router-link>
             <Notification v-if="isAdmin" />
            <button @click="logout" class="bg-danger hover:bg-red-600 px-4 py-2 rounded-md text-sm font-bold transition shadow-sm">
              Logout
            </button>
          </template>

          <template v-else>
            <router-link to="/login" class="hover:text-gray-200 transition">Login</router-link>
            <router-link to="/signup" class="bg-secondary hover:bg-green-600 px-4 py-2 rounded-md text-sm font-bold transition shadow-sm">
              Sign Up
            </router-link>
          </template>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 2. IMPORT THE NOTIFICATION COMPONENT
import Notification from '../components/Notification.vue'

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)
const isAdmin = ref(false)

// watchEffect listens to route changes and updates the navbar instantly
// so it knows when you log in or log out without refreshing the page
watchEffect(() => {
  // We reference route.name to force this to trigger on navigation
  const currentRoute = route.name 
  isLoggedIn.value = !!localStorage.getItem('token')
  isAdmin.value = localStorage.getItem('userRole') === 'admin'
})

const logout = () => {
  localStorage.clear()
  isLoggedIn.value = false
  isAdmin.value = false
  router.push('/login')
}
</script> -->
<template>
  <nav dir="rtl" class="bg-white text-black border-b-2 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <router-link to="/" class="text-3xl font-black tracking-tighter hover:text-primary transition">
          مول الجمل
        </router-link>

        <div class="flex items-center gap-6">
          <router-link to="/" class="font-bold text-sm hover:text-primary transition">المنتجات</router-link>

          <template v-if="isLoggedIn">
            
            <router-link v-if="isAdmin" to="/admin" class="text-warning font-black hover:text-yellow-600 transition">
              لوحة الإدارة
            </router-link>
            
            <router-link to="/my-orders" class="font-bold text-sm hover:text-primary transition">طلباتي</router-link>
            <router-link to="/profile" class="font-bold text-sm hover:text-primary transition">الملف الشخصي</router-link>
            
            <Notification v-if="isAdmin" />
            
            <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-black transition border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
              تسجيل الخروج
            </button>
          </template>

          <template v-else>
            <router-link to="/login" class="font-bold text-sm hover:text-primary transition">تسجيل الدخول</router-link>
            
            <router-link to="/signup" class="bg-secondary hover:bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-black transition border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
              إنشاء حساب
            </router-link>
          </template>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Notification from '../components/Notification.vue'

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)
const isAdmin = ref(false)

watchEffect(() => {
  const currentRoute = route.name 
  isLoggedIn.value = !!localStorage.getItem('token')
  isAdmin.value = localStorage.getItem('userRole') === 'admin'
})

const logout = () => {
  localStorage.clear()
  isLoggedIn.value = false
  isAdmin.value = false
  router.push('/login')
}
</script>