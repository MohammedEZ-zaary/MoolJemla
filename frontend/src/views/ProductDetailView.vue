<!-- <template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div v-if="product" class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border-2 border-black overflow-hidden flex flex-col md:flex-row">
      
      <div class="md:w-1/2 border-r-2 border-black">
        <img :src="`http://localhost:3000${product.imagePath}`" class="h-full w-full object-cover" alt="Product">
      </div>
      
      <div class="p-8 md:w-1/2 flex flex-col justify-between">
        <div>
          <button @click="$router.back()" class="text-gray-500 font-bold mb-4 flex items-center hover:text-black hover:underline uppercase text-xs tracking-widest">
            ← Back to Products
          </button>
          <h1 class="text-3xl font-black text-black uppercase">{{ product.title }}</h1>
          <p class="text-gray-600 mt-4 leading-relaxed font-medium">{{ product.description }}</p>
          
          <div class="mt-6 flex items-baseline border-b-2 border-gray-100 pb-6">
            <span class="text-4xl font-black text-primary">${{ product.price }}</span>
            <span class="ml-4 text-sm font-bold text-gray-400 uppercase">In Stock: {{ product.quantity }}</span>
          </div>
        </div>

        <div class="mt-8">
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Quantity to Order</label>
          <input 
            type="number" 
            v-model="orderQty" 
            min="1" 
            :max="product.quantity" 
            class="w-24 p-3 border-2 border-black rounded-lg mb-4 block font-black text-lg text-center"
          >
          
          <button 
            @click="handleAddToCart" 
            class="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 hover:scale-[1.02] transition transform"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20 font-black text-gray-400 animate-pulse text-xl uppercase italic">
      Loading product details...
    </div>
  </div>
</template> -->

<template>
  <div dir="rtl" class="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
    
    <div v-if="product" class="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-text_main overflow-hidden flex flex-col md:flex-row">
      
      <div class="md:w-1/2 border-b-2 md:border-b-0 md:border-l-2 border-text_main">
        <img :src="`http://localhost:3000${product.imagePath}`" class="h-full w-full object-cover min-h-[300px]" alt="Product">
      </div>
      
      <div class="p-8 md:w-1/2 flex flex-col justify-between bg-white">
        <div>
          <button @click="$router.back()" class="text-text_main/50 font-black mb-6 flex items-center hover:text-text_main transition text-sm">
            → العودة للمنتجات 
          </button>
          
          <h1 class="text-4xl font-black text-text_main leading-tight">{{ product.title }}</h1>
          <p class="text-text_main/80 mt-4 leading-relaxed font-bold text-lg">{{ product.description }}</p>
          
          <div class="mt-8 flex items-center gap-6 border-b-2 border-text_main/10 pb-8">
            <span class="text-5xl font-black text-primary" dir="ltr">{{ product.price }} MAD</span>
            
            <span class="px-4 py-2 bg-gray-100 border-2 border-text_main/20 rounded-xl text-sm font-black text-text_main/60">
              المتوفر: <span dir="ltr" class="text-text_main">{{ product.quantity }}</span>
            </span>
          </div>
        </div>

        <div class="mt-8">
          <label class="block text-sm font-black text-text_main mb-3">الكمية المطلوبة</label>
          <input 
            type="number" 
            v-model="orderQty" 
            min="1" 
            :max="product.quantity" 
            dir="ltr"
            class="w-32 p-4 border-2 border-text_main rounded-xl mb-6 block font-black text-2xl text-center focus:ring-primary outline-none transition"
          >
          
          <button 
            @click="handleAddToCart" 
            class="w-full bg-text_main text-white py-5 rounded-xl font-black text-xl transition border-2 border-text_main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-opacity-80 active:translate-y-1 active:shadow-none"
          >
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-32 w-full font-black text-text_main/30 animate-pulse text-4xl italic tracking-tighter">
      جاري تحميل تفاصيل المنتج...
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 1. IMPORT YOUR CART STORE
import { cart } from '../store/cart' 

const route = useRoute()
const router = useRouter() // Added router so we can navigate
const product = ref(null)
const orderQty = ref(1)

const fetchProduct = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${route.params.id}`)
    product.value = await res.json()
  } catch (err) { console.error(err) }
}

// 2. REWRITTEN CART FUNCTION
const handleAddToCart = () => {
  if (!product.value) return;

  // Add the product to the global cart
  cart.add(product.value);

  // Because your cart.add() defaults the quantity to 1, 
  // we find the item we just added and update it to the user's selected quantity.
  const cartItem = cart.items.find(i => i._id === product.value._id);
  if (cartItem) {
    cartItem.quantity = orderQty.value;
  }

  // 3. Send the user back to the Home page where the Cart Sidebar is!
  router.push('/');
}

onMounted(fetchProduct)
</script>