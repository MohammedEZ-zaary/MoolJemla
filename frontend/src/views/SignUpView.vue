<!-- <template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-center text-text_main mb-8">Create an Account</h2>
      
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="form.firstName" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="form.lastName" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email Address</label>
          <input v-model="form.email" type="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input v-model="form.phone" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="form.password" type="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <button type="submit" class="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-secondary hover:bg-green-600 focus:outline-none">
          Sign Up
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="font-medium text-primary hover:text-blue-500">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
})

const handleSignup = async () => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (res.ok) {
      alert("Account created! Please login.");
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Signup Error:", error);
  }
}
</script> -->

<template>
  <div dir="rtl" class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    
    <div class="max-w-md w-full bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black p-8">
      
      <h2 class="text-4xl font-black text-center text-black mb-8 tracking-tighter italic">
        إنشاء حساب
      </h2>
      
      <form @submit.prevent="handleSignup" class="space-y-4">
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">الاسم الشخصي</label>
            <input 
              v-model="form.firstName" 
              type="text" 
              required 
              class="block w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition"
              placeholder="الاسم"
            >
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">الاسم العائلي</label>
            <input 
              v-model="form.lastName" 
              type="text" 
              required 
              class="block w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition"
              placeholder="النسب"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            class="block w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition text-left"
            placeholder="example@email.com"
            dir="ltr"
          >
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
          <input 
            v-model="form.phone" 
            type="text" 
            required 
            class="block w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition text-left"
            placeholder="06XXXXXXXX"
            dir="ltr"
          >
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
          <input 
            v-model="form.password" 
            type="password" 
            required 
            class="block w-full px-4 py-3 border-2 border-black rounded-xl focus:ring-primary focus:border-primary outline-none font-bold transition text-left"
            placeholder="أدخل كلمة المرور"
            dir="ltr"
          >
        </div>

        <button 
          type="submit" 
          class="w-full mt-6 bg-secondary text-white py-4 rounded-xl font-black text-lg transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 active:translate-y-1 active:shadow-none"
        >
          تسجيل
        </button>
      </form>

      <div class="mt-8 text-center border-t-2 border-gray-100 pt-6">
        <p class="text-sm font-bold text-gray-600">
          لديك حساب بالفعل؟ 
          <router-link to="/login" class="font-black text-primary hover:underline hover:text-black transition">
            تسجيل الدخول
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // <-- Imported useRouter to fix the redirect bug!

const router = useRouter() // <-- Initialized router

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
})

const handleSignup = async () => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (res.ok) {
      alert("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.");
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    alert("حدث خطأ في الاتصال بالخادم.");
  }
}
</script>