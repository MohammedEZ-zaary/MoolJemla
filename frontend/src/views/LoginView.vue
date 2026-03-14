<!-- <template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-center text-text_main mb-8">Login to MoolJemal</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            v-model="phone" 
            type="text" 
            required 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter your phone number"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter your password"
          >
        </div>

        <button 
          type="submit" 
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 focus:outline-none"
        >
          Sign In
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account? 
        <router-link to="/signup" class="font-medium text-primary hover:text-blue-500">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const phone = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phone.value, password: password.value })
    });

    const data = await res.json();

    if (res.ok) {
      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userName', data.user.firstName);

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login Error:", error);
  }
}
</script> -->

<template>
  <div dir="rtl" class="min-h-screen flex items-center justify-center bg-background p-4">
    
    <div class="max-w-md w-full bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-text_main p-8">
      
      <h2 class="text-4xl font-black text-center text-text_main mb-8 tracking-tighter italic">
        تسجيل الدخول
      </h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-text_main mb-2">رقم الهاتف</label>
          <input 
            v-model="phone" 
            type="text" 
            required 
            class="block w-full px-4 py-3 border-2 border-text_main rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition text-left"
            placeholder="أدخل رقم هاتفك"
            dir="ltr" 
          >
          </div>

        <div>
          <label class="block text-sm font-bold text-text_main mb-2">كلمة المرور</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            class="block w-full px-4 py-3 border-2 border-text_main rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition text-left"
            placeholder="أدخل كلمة المرور"
            dir="ltr"
          >
        </div>

        <button 
          type="submit" 
          class="w-full bg-text_main text-white py-4 rounded-xl font-black text-lg transition border-2 border-text_main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-opacity-80 active:translate-y-1 active:shadow-none"
        >
          دخول
        </button>
      </form>

      <div class="mt-8 text-center border-t-2 border-text_main/10 pt-6">
        <p class="text-sm font-bold text-text_main/70">
          ليس لديك حساب؟ 
          <router-link to="/signup" class="font-black text-primary hover:underline hover:text-text_main transition">
            أنشئ حساباً جديداً
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const phone = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phone.value, password: password.value })
    });

    const data = await res.json();

    if (res.ok) {
      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userName', data.user.firstName);

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      // Translated the error message fallback
      alert(data.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("حدث خطأ في الاتصال بالخادم.");
  }
}
</script>