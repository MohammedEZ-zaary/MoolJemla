<!-- <template>
  <div class="min-h-screen bg-background flex items-center justify-center p-8">
    <div v-if="user" class="bg-white max-w-md w-full p-8 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">User Profile</h1>
        <span class="px-3 py-1 bg-primary text-white text-xs rounded-full uppercase">
          {{ user.role }}
        </span>
      </div>

      <div class="space-y-4">
        <div class="border-b pb-2">
          <p class="text-xs text-gray-500 uppercase font-semibold">First Name</p>
          <p class="font-medium text-lg text-text_main">{{ user.firstName }}</p>
        </div>
        <div class="border-b pb-2">
          <p class="text-xs text-gray-500 uppercase font-semibold">Last Name</p>
          <p class="font-medium text-lg text-text_main">{{ user.lastName }}</p>
        </div>
        <div class="border-b pb-2">
          <p class="text-xs text-gray-500 uppercase font-semibold">Email</p>
          <p class="font-medium text-lg text-text_main">{{ user.email }}</p>
        </div>
        <div class="border-b pb-2">
          <p class="text-xs text-gray-500 uppercase font-semibold">Phone</p>
          <p class="font-medium text-lg text-text_main">{{ user.phone }}</p>
        </div>
      </div>

      <button @click="logout" class="mt-8 w-full py-2 border-2 border-danger text-danger font-bold rounded-md hover:bg-danger hover:text-white transition">
        Logout
      </button>
    </div>
    
    <div v-else class="text-center animate-pulse text-gray-500">
      Fetching your profile...
    </div>
  </div>
</template> -->

<template>
  <div dir="rtl" class="min-h-screen bg-background flex items-center justify-center p-4">
    
    <div v-if="user" class="max-w-md w-full bg-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-text_main">
      
      <div class="flex justify-between items-center mb-8 border-b-2 border-text_main pb-6">
        <h1 class="text-4xl font-black italic tracking-tighter text-text_main">الملف الشخصي</h1>
        
        <span class="px-4 py-1.5 bg-primary text-white text-xs font-black rounded-lg border-2 border-text_main shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
          {{ user.role === 'admin' ? 'مدير' : 'عميل' }}
        </span>
      </div>

      <div class="space-y-6">
        <div>
          <p class="text-sm font-bold text-text_main/60 mb-1">الاسم الشخصي</p>
          <p class="font-black text-2xl text-text_main">{{ user.firstName }}</p>
        </div>
        
        <div>
          <p class="text-sm font-bold text-text_main/60 mb-1">الاسم العائلي</p>
          <p class="font-black text-2xl text-text_main">{{ user.lastName }}</p>
        </div>
        
        <div>
          <p class="text-sm font-bold text-text_main/60 mb-1">البريد الإلكتروني</p>
          <p class="font-black text-xl text-text_main text-left bg-gray-50 p-3 border-2 border-text_main rounded-xl truncate" dir="ltr">
            {{ user.email }}
          </p>
        </div>
        
        <div>
          <p class="text-sm font-bold text-text_main/60 mb-1">رقم الهاتف</p>
          <p class="font-black text-2xl text-text_main text-left bg-gray-50 p-3 border-2 border-text_main rounded-xl" dir="ltr">
            {{ user.phone }}
          </p>
        </div>
      </div>

      <button 
        @click="logout" 
        class="mt-10 w-full bg-danger text-white py-4 rounded-xl font-black text-xl transition border-2 border-text_main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 active:translate-y-1 active:shadow-none"
      >
        تسجيل الخروج
      </button>
    </div>
    
    <div v-else class="text-center font-black text-text_main/50 animate-pulse text-2xl italic tracking-tighter">
      جاري تحميل بياناتك...
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const res = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': token // Send the JWT token
      }
    });

    if (res.ok) {
      user.value = await res.json();
    } else {
      // If token is expired or invalid, send to login
      localStorage.clear();
      router.push('/login');
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

const logout = () => {
  localStorage.clear();
  router.push('/login');
}

onMounted(fetchProfile)
</script>