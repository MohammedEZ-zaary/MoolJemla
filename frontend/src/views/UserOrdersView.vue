<!-- <template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-black text-gray-900 mb-8 uppercase italic italic">My Commands Tracking</h1>

      <div v-if="orders.length > 0" class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order._id" 
          class="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <div class="flex justify-between items-center bg-black p-4 text-white">
            <span class="font-mono text-xs uppercase tracking-widest">Order ID: {{ order._id }}</span>
            <span :class="statusBadgeClass(order.status)" class="px-4 py-1 rounded-full text-[10px] font-black uppercase border-2">
              {{ order.status }}
            </span>
          </div>

          <div class="p-6 space-y-4">
            <div 
              v-for="item in order.products" 
              :key="item.productId?._id" 
              class="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div class="flex items-center gap-4">
                <img 
                  :src="`${item.productId?.imagePath}`" 
                  class="w-14 h-14 object-cover rounded-xl border-2 border-gray-50" 
                />
                <div>
                  <p class="font-black text-gray-800">{{ item.productId?.title }}</p>
                  <p class="text-xs font-bold text-gray-400 uppercase">
                    Qty: {{ item.quantity }} × ${{ item.priceAtPurchase }}
                  </p>
                </div>
              </div>
              <p class="font-black text-lg italic text-primary">
                ${{ item.priceAtPurchase * item.quantity }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 p-4 border-t-2 border-black flex justify-between items-center">
            <div class="text-xs font-bold text-gray-400 uppercase">
              Ordered: {{ new Date(order.createdAt).toLocaleDateString() }}
            </div>
            <div class="flex items-center gap-4 font-black">
              <span class="text-gray-400 uppercase text-xs italic">Final Bill:</span>
              <span class="text-2xl text-black">${{ order.totalPrice }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-3xl border-4 border-dashed border-gray-200">
        <p class="text-gray-400 font-black text-xl uppercase italic">You haven't sent any commands yet.</p>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div dir="rtl" class="min-h-screen bg-background p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-4xl font-black text-text_main mb-8 tracking-tighter italic">تتبع طلباتي</h1>

      <div v-if="orders.length > 0" class="space-y-8">
        <div 
          v-for="order in orders" 
          :key="order._id" 
          class="bg-white border-2 border-text_main rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <div class="flex justify-between items-center bg-text_main p-4 text-white">
            <span class="font-mono text-sm font-bold" dir="ltr">#{{ order._id }}</span>
            
            <span 
              :class="statusBadgeClass(order.status)" 
              class="px-4 py-1.5 rounded-lg text-xs font-black border-2 border-white/20"
            >
              {{ 
                order.status === 'on possessing' ? 'قيد التجهيز' : 
                order.status === 'confirmed' ? 'مؤكد' : 
                order.status === 'cancelled' ? 'ملغى' : order.status 
              }}
            </span>
          </div>

          <div class="p-6 space-y-4">
            <div 
              v-for="item in order.products" 
              :key="item.productId?._id" 
              class="flex justify-between items-center border-b-2 border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div class="flex items-center gap-4">
                <img 
                  :src="`${item.productId?.imagePath}`" 
                  class="w-16 h-16 object-cover rounded-xl border-2 border-text_main" 
                />
                <div>
                  <p class="font-black text-lg text-text_main">{{ item.productId?.title }}</p>
                  <p class="text-sm font-bold text-gray-500 mt-1" dir="ltr">
                    {{ item.quantity }} × {{ item.priceAtPurchase }} MAD
                  </p>
                </div>
              </div>
              
              <p class="font-black text-2xl italic text-primary" dir="ltr">
                {{ item.priceAtPurchase * item.quantity }} MAD
              </p>
            </div>
          </div>

          <div class="bg-gray-50 p-6 border-t-2 border-text_main flex justify-between items-center">
            <div class="text-sm font-bold text-gray-500">
              تاريخ الطلب: 
              <span dir="ltr" class="text-text_main ml-2">{{ new Date(order.createdAt).toLocaleDateString() }}</span>
            </div>
            
            <div class="flex items-center gap-4 font-black">
              <span class="text-gray-500 text-sm">المبلغ الإجمالي:</span>
              <span class="text-3xl text-text_main" dir="ltr">{{ order.totalPrice }} MAD</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-24 bg-white rounded-3xl border-4 border-dashed border-text_main/30 shadow-sm">
        <p class="text-text_main/50 font-black text-3xl italic tracking-tighter">لم تقم بإرسال أي طلبات بعد.</p>
      </div>
      
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

const fetchOrders = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('/api/user-orders', {
    headers: { 'Authorization': token }
  })
  orders.value = await res.json()
}

// Fixed red color for 'cancelled' using your Tailwind v4 setup
const statusBadgeClass = (status) => {
  if (status === 'confirmed') return 'bg-green-100 text-green-600 border-green-600'
  if (status === 'cancelled') return 'bg-red-100 text-red-500 border-red-500' 
  return 'bg-yellow-100 text-yellow-600 border-yellow-600' // 'on possessing'
}

onMounted(fetchOrders)
</script>