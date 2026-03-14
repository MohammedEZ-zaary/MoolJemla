<!-- <template>
<div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-black mb-8 uppercase tracking-tighter">MoolJemal Shop</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div 
        v-for="product in products" 
        :key="product._id" 
        @click="goToProduct(product._id)"
        class="cursor-pointer border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
      >
        <img :src="`http://localhost:3000${product.imagePath}`" class="h-56 w-full object-cover" />
        <div class="p-4">
          <h2 class="font-bold text-lg truncate">{{ product.title }}</h2>
          <p class="text-primary font-black text-xl">${{ product.price }}</p>
          
          <button 
            @click.stop="cart.add(product)" 
            class="mt-4 w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-gray-800 uppercase text-xs tracking-widest"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <div v-if="cart.items.length > 0" class="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l p-6 z-50 overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-black text-2xl uppercase italic">Your Cart</h3>
        <button @click="cart.clear()" class="text-red-500 text-xs font-bold underline">Clear All</button>
      </div>

      <div v-for="item in cart.items" :key="item._id" class="flex gap-4 mb-4 border-b pb-4">
        <img :src="`http://localhost:3000${item.imagePath}`" class="w-16 h-16 object-cover rounded-lg" />
        <div class="flex-1">
          <h4 class="font-bold text-sm leading-tight">{{ item.title }}</h4>
          <div class="flex items-center gap-2 mt-2">
            <input 
              type="number" 
              v-model.number="item.quantity" 
              min="1" 
              class="w-12 border rounded text-center text-sm font-bold p-1"
            />
            <span class="text-xs text-gray-400">x</span>
            <span class="font-bold text-primary">${{ item.price }}</span>
          </div>
        </div>
        <button @click="cart.remove(item._id)" class="text-gray-300 hover:text-red-500">×</button>
      </div>

      <div class="mt-8 border-t pt-4">
        <div class="flex justify-between text-xl font-black mb-6">
          <span>TOTAL:</span>
          <span>${{ cart.total }}</span>
        </div>
        <button @click="submitOrder" class="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition">
          Submit Command
        </button>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div dir="rtl" class="p-6 max-w-7xl mx-auto bg-background min-h-screen">
    
    <h1 class="text-4xl font-black mb-8 tracking-tighter text-text_main italic">منتجات</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div 
        v-for="product in products" 
        :key="product._id" 
        @click="goToProduct(product._id)"
        class="cursor-pointer bg-white border-2 border-text_main rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col"
      >
        <img :src="`http://localhost:3000${product.imagePath}`" class="h-56 w-full object-cover border-b-2 border-text_main" />
        
        <div class="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h2 class="font-black text-lg text-text_main leading-tight">{{ product.title }}</h2>
            <p class="text-primary font-black text-2xl mt-2 text-right" dir="ltr">{{ product.price }} MAD</p>
          </div>
          
          <button 
            @click.stop="cart.add(product)" 
            class="mt-5 w-full bg-text_main text-white py-3 rounded-lg font-black hover:bg-opacity-80 transition active:translate-y-1"
          >
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="cart.items.length > 0" 
      class="fixed top-0 left-0 h-full w-96 bg-white border-r-2 border-text_main shadow-[10px_0px_0px_0px_rgba(0,0,0,0.1)] p-6 z-50 overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-6 border-b-2 border-text_main pb-4">
        <h3 class="font-black text-3xl italic text-text_main">سلة المشتريات</h3>
        <button @click="cart.clear()" class="text-danger text-sm font-bold hover:underline transition">
          تفريغ السلة
        </button>
      </div>

      <div v-for="item in cart.items" :key="item._id" class="flex gap-4 mb-4 border-b-2 border-gray-100 pb-4">
        <img :src="`http://localhost:3000${item.imagePath}`" class="w-20 h-20 object-cover rounded-xl border-2 border-text_main" />
        
        <div class="flex-1">
          <h4 class="font-black text-sm text-text_main leading-tight">{{ item.title }}</h4>
          
          <div class="flex items-center gap-3 mt-3">
            <input 
              type="number" 
              v-model.number="item.quantity" 
              min="1" 
              dir="ltr"
              class="w-16 border-2 border-text_main rounded-md text-center text-md font-bold p-1 focus:ring-primary outline-none"
            />
            <span class="text-sm text-gray-400 font-bold">×</span>
            <span class="font-black text-primary text-lg" dir="ltr">{{ item.price }} MAD</span>
          </div>
        </div>
        
        <button @click="cart.remove(item._id)" class="text-gray-400 hover:text-danger text-2xl font-black transition">×</button>
      </div>

      <div class="mt-8 pt-4">
        <div class="flex justify-between text-2xl font-black mb-6 text-text_main">
          <span>المجموع:</span>
          <span dir="ltr">{{ cart.total }} MAD</span>
        </div>
        
        <button 
          @click="submitOrder" 
          class="w-full bg-secondary text-white py-4 rounded-xl font-black text-xl transition border-2 border-text_main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 active:translate-y-1 active:shadow-none"
        >
          تأكيد الطلب
        </button>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { ref, onMounted,reactive } from 'vue'
import { cart } from '../store/cart'
import { useRouter } from 'vue-router'
// ... your other imports (ref, reactive, cart, etc.)

const router = useRouter()
const products = ref([])

const goToProduct = (id) => {
  // Using the name 'product-detail' perfectly matches your router setup
  router.push({ name: 'product-detail', params: { id: id } })
}
onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/products')
  products.value = await res.json()
  console.log("Fetched products:", products.value) // DEBUG: Check if products are fetched correctly
})

const submitOrder = async () => {
  const token = localStorage.getItem('token');
  if (!token) return alert("Please login!");



  const orderData = {
    
    // 2. Your existing products map
    products: cart.items.map(item => ({
      productId: item._id,
      quantity: Number(item.quantity) || 1,
      priceAtPurchase: Number(item.price)
    })),
    totalPrice: Number(cart.total.value) 
  };

  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      alert("Success! Order placed.");
      cart.clear();
      // Clear the form
    }
  } catch (err) { console.error(err); }
};
</script>