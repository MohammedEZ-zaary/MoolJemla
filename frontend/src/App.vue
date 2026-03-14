<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>