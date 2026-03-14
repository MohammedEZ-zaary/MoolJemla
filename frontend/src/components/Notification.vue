<!-- <template>
  <div class="relative">
    <div 
      @click="isOpen = !isOpen" 
      class="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <span 
        v-if="pendingOrders.length > 0" 
        class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-primary animate-pulse"
      >
        {{ pendingOrders.length }}
      </span>
    </div>

    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] border-2 border-black overflow-hidden z-50"
    >
      <div class="bg-black text-white p-4 font-black uppercase text-xs tracking-widest flex justify-between items-center">
        <span>Pending Commands</span>
        <span class="bg-primary text-black px-2 py-1 rounded-md">{{ pendingOrders.length }}</span>
      </div>

      <div class="max-h-72 overflow-y-auto">
        <div v-if="pendingOrders.length === 0" class="p-6 text-center text-sm font-bold text-gray-400 italic">
          No new commands right now.
        </div>
        
        <div 
          v-for="order in pendingOrders" 
          :key="order._id" 
          @click="goToAdmin"
          class="p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
        >
          <p class="text-sm font-black text-gray-900 truncate">
            {{ order.customerInfo?.firstName || 'A customer' }} placed an order
          </p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-[10px] text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
              #{{ order._id?.slice(-6) || 'N/A' }}
            </span>
            <span class="text-sm font-black text-primary">${{ order.totalPrice }}</span>
          </div>
        </div>
      </div>

      <div class="p-2 bg-gray-50 border-t-2 border-black">
        <button 
          @click="goToAdmin" 
          class="w-full text-center text-xs font-black uppercase tracking-widest text-black hover:text-primary transition py-2"
        >
          Go to Admin Panel →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pendingOrders = ref([]) // Now we store the actual orders, not just the number!
const isOpen = ref(false)
let pollingInterval = null

const checkNewOrders = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      headers: { 'Authorization': token }
    })

    if (res.status === 403 || res.status === 401) {
      clearInterval(pollingInterval)
      return
    }

    if (res.ok) {
      const orders = await res.json()
      // Filter out only the ones that need attention
      pendingOrders.value = orders.filter(order => order.status === 'on possessing')
    }
  } catch (err) {
    console.error("Notification check failed:", err)
  }
}

// Close dropdown and navigate to admin
const goToAdmin = () => {
  isOpen.value = false
  router.push('/admin')
}

onMounted(() => {
  checkNewOrders()
  pollingInterval = setInterval(checkNewOrders, 15000)
})

onUnmounted(() => {
  clearInterval(pollingInterval)
})
</script> -->
<template>
  <div class="relative">
    <div 
      @click="isOpen = !isOpen" 
      class="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <span 
        v-if="pendingOrders.length > 0" 
        class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-white animate-pulse"
      >
        {{ pendingOrders.length }}
      </span>
    </div>

    <div 
      v-if="isOpen" 
      dir="rtl"
      class="absolute left-0 mt-3 w-80 bg-white rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden z-50 text-right"
    >
      <div class="bg-black text-white p-4 font-black text-xs flex justify-between items-center">
        <span>الطلبات المعلقة</span>
        <span class="bg-primary text-black px-2 py-1 rounded-md">{{ pendingOrders.length }}</span>
      </div>

      <div class="max-h-72 overflow-y-auto">
        <div v-if="pendingOrders.length === 0" class="p-6 text-center text-sm font-bold text-gray-400 italic">
          لا توجد طلبات جديدة حالياً.
        </div>
        
        <div 
          v-for="order in pendingOrders" 
          :key="order._id" 
          @click="goToAdmin"
          class="p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
        >
          <p class="text-sm font-black text-gray-900 truncate">
            طلب جديد من {{ order.customerInfo?.firstName || 'عميل' }}
          </p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-[10px] text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
              #{{ order._id?.slice(-6) || 'N/A' }}
            </span>
            <span class="text-sm font-black text-primary">${{ order.totalPrice }}</span>
          </div>
        </div>
      </div>

      <div class="p-2 bg-gray-50 border-t-2 border-black">
        <button 
          @click="goToAdmin" 
          class="w-full text-center text-xs font-black text-black hover:text-primary transition py-2"
        >
          ← الانتقال إلى لوحة الإدارة
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pendingOrders = ref([])
const isOpen = ref(false)
let pollingInterval = null

const checkNewOrders = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    // 💡 NOTE: Ensure this endpoint fetches ALL orders for the admin, 
    // not just the logged-in user's orders!
    const res = await fetch('http://localhost:3000/api/admin/orders', {
      headers: { 'Authorization': token }
    })

    if (res.status === 403 || res.status === 401) {
      clearInterval(pollingInterval)
      return
    }

    if (res.ok) {
      const orders = await res.json()
      pendingOrders.value = orders.filter(order => order.status === 'on possessing')
    }
  } catch (err) {
    console.error("Notification check failed:", err)
  }
}

const goToAdmin = () => {
  isOpen.value = false
  router.push('/admin')
}

onMounted(() => {
  checkNewOrders()
  pollingInterval = setInterval(checkNewOrders, 15000)
})

onUnmounted(() => {
  clearInterval(pollingInterval)
})
</script>