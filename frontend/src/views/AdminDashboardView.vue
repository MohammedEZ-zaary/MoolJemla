<!-- <template>
  <div class="flex h-[calc(100vh-64px)] bg-background">
    
    <aside class="w-64 bg-text_main text-white flex flex-col shadow-lg">
      <div class="p-6 text-xl font-bold border-b border-gray-700 tracking-wider">
        Admin Dashboard
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <button 
          @click="activeTab = 'orders'"
          :class="['w-full text-left px-4 py-3 rounded-lg font-medium transition', 
                   activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-700 text-gray-300']"
        >
          User Orders
        </button>
        
        <button 
          @click="activeTab = 'addProduct'"
          :class="['w-full text-left px-4 py-3 rounded-lg font-medium transition', 
                   activeTab === 'addProduct' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-700 text-gray-300']"
        >
          Set New Product
        </button>
      </nav>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto w-full">
      
      <div v-if="activeTab === 'orders'">

        <h2 class="text-3xl font-bold text-text_main mb-6">Manage User Commands</h2>
        
        <div class="bg-white shadow rounded-lg w-full overflow-x-auto">
         <div class="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div class="flex-1 relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              🔍
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by ID, Name, or Email..." 
              class="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-primary focus:border-primary outline-none font-medium"
            />
          </div> 
          <div class="sm:w-64">
            <select 
              v-model="statusFilter" 
              class="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary outline-none font-bold text-gray-700 bg-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="on possessing">On Possessing</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          </div>




        




          <table class="w-full text-left whitespace-nowrap">
            <thead class="bg-gray-100 border-b text-sm text-gray-600">
              <tr>
                <th class="p-4">Order ID</th>
                <th class="p-4">Customer</th>
                <th class="p-4">Contact Info</th>
                <th class="p-4">Products & Qty</th>
                <th class="p-4">State</th>
                <th class="p-4 text-center">Ticket (PDF)</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="order in filteredOrders" :key="order._id" class="border-b hover:bg-gray-50 transition">
                <td class="p-4 font-mono text-xs text-gray-500">#{{ order._id?.slice(-6) }}</td>
                <td class="p-4 font-bold text-text_main">
                  {{ order.customerInfo?.firstName }} {{ order.customerInfo?.lastName }}
                </td>
                <td class="p-4 text-gray-600">
                  <div>{{ order.customerInfo?.email }}</div>
                  <div class="text-xs">{{ order.customerInfo?.phoneNumber }}</div>
                </td>
                <td class="p-4">
                  <div v-for="item in order.products" :key="item._id" class="mb-1">
                    <router-link 
                      v-if="item.productId" 
                      :to="`/product/${item.productId._id}`" 
                      class="text-primary hover:underline truncate inline-block max-w-[150px] align-bottom font-bold"
                    >
                      {{ item.productId.title }}
                    </router-link>
                    <span class="text-gray-500 ml-2 font-bold text-xs">x{{ item.quantity }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <select 
                    v-model="order.status" 
                    @change="updateOrderStatus(order._id, order.status)"
                    class="border rounded px-2 py-1 text-xs font-black uppercase tracking-wider outline-none cursor-pointer transition-colors"
                    :class="{
                      'bg-yellow-100 text-yellow-800 border-yellow-300': order.status === 'on possessing',
                      'bg-green-100 text-green-800 border-green-300': order.status === 'confirmed',
                      'bg-red-100 text-red-800 border-red-300': order.status === 'cancelled'
                    }"
                  >
                    <option value="on possessing">On Possessing</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td class="p-4 text-center">
                  <a 
                    v-if="order.status === 'confirmed'" 
                    :href="`/tickets/Ticket_${order._id}.pdf`" 
                    target="_blank"
                    class="inline-flex items-center text-secondary hover:text-green-700 font-bold bg-green-50 px-3 py-1 rounded border border-green-200 transition"
                  >
                    Open PDF
                  </a>
                  <span v-else class="text-gray-400 text-xs font-bold">-</span>
                </td>
              </tr>
              <tr v-if="filteredOrders.length === 0">
                <td colspan="6" class="p-12 text-center text-gray-500 font-bold italic">
                  No orders match your search or filter.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'addProduct'" class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-text_main mb-6">Set New Product</h2>
        
        <div class="bg-white p-8 rounded-xl shadow-md">
          <form @submit.prevent="submitProduct" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input v-model="productForm.title" type="text" required class="block w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="productForm.description" rows="3" required class="block w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input v-model="productForm.price" type="number" step="0.01" required class="block w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input v-model="productForm.quantity" type="number" required class="block w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input type="file" @change="handleFileUpload" accept="image/*" required class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-text_main hover:file:bg-gray-200">
            </div>

            <button type="submit" :disabled="isUploading" class="w-full mt-4 bg-secondary text-white py-3 rounded-lg font-bold hover:bg-green-600 transition disabled:opacity-50">
              {{ isUploading ? 'Uploading Product...' : 'Publish Product' }}
            </button>
          </form>
        </div>
      </div>

    </main>
  </div>
</template> -->
<template>
  <div dir="rtl" class="flex h-[calc(100vh-64px)] bg-background">
    
    <aside class="w-64 bg-text_main text-white flex flex-col border-l-2 border-text_main z-10">
      <div class="p-6 text-2xl font-black border-b-2 border-gray-800 tracking-tighter italic">
        لوحة الإدارة
      </div>
      <nav class="flex-1 p-4 space-y-3">
        <button 
          @click="activeTab = 'orders'"
          :class="['w-full text-right px-4 py-3 rounded-xl font-bold transition border-2 border-transparent', 
                   activeTab === 'orders' ? 'bg-primary border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-800 text-gray-300']"
        >
          طلبات المستخدمين
        </button>
        
        <button 
          @click="activeTab = 'addProduct'"
          :class="['w-full text-right px-4 py-3 rounded-xl font-bold transition border-2 border-transparent', 
                   activeTab === 'addProduct' ? 'bg-primary border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-800 text-gray-300']"
        >
          إضافة منتج جديد
        </button>
      </nav>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto w-full">
      
      <div v-if="activeTab === 'orders'">
        <h2 class="text-4xl font-black text-text_main mb-8 italic tracking-tighter">إدارة طلبات المستخدمين</h2>
        
        <div class="flex flex-col sm:flex-row justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-text_main">
          
          <div class="flex-1 relative">
            <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-text_main/50">
              🔍
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="البحث بالمعرف، الاسم، أو البريد الإلكتروني..." 
              class="w-full pr-12 pl-4 py-3 border-2 border-text_main rounded-lg focus:ring-primary outline-none font-bold text-text_main transition"
            />
          </div> 
          
          <div class="sm:w-64">
            <select 
              v-model="statusFilter" 
              class="w-full px-4 py-3 border-2 border-text_main rounded-lg focus:ring-primary outline-none font-black text-text_main bg-gray-50 cursor-pointer"
            >
              <option value="All">جميع الحالات</option>
              <option value="on possessing">قيد التجهيز</option>
              <option value="confirmed">مؤكد</option>
              <option value="cancelled">ملغى</option>
            </select>
          </div>
        </div>

        <div class="bg-white rounded-xl w-full overflow-hidden border-2 border-text_main shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <table class="w-full text-right whitespace-nowrap">
            <thead class="bg-gray-100 border-b-2 border-text_main text-sm text-text_main font-black">
              <tr>
                <th class="p-4">معرف الطلب</th>
                <th class="p-4">العميل</th>
                <th class="p-4">معلومات الاتصال</th>
                <th class="p-4">المنتجات والكمية</th>
                <th class="p-4">الحالة</th>
                <th class="p-4 text-center">الفاتورة (PDF)</th>
              </tr>
            </thead>
            <tbody class="text-sm font-medium">
              <tr v-for="order in filteredOrders" :key="order._id" class="border-b border-gray-200 hover:bg-gray-50 transition">
                <td class="p-4 font-mono text-xs text-text_main/60 font-bold" dir="ltr">#{{ order._id?.slice(-6) }}</td>
                <td class="p-4 font-black text-text_main text-lg">
                  {{ order.customerInfo?.firstName }} {{ order.customerInfo?.lastName }}
                </td>
                <td class="p-4 text-text_main/80">
                  <div class="font-bold">{{ order.customerInfo?.email }}</div>
                  <div class="text-xs font-mono mt-1" dir="ltr">{{ order.customerInfo?.phoneNumber }}</div>
                </td>
                <td class="p-4">
                  <div v-for="item in order.products" :key="item._id" class="mb-1 flex items-center gap-2">
                    <router-link 
                      v-if="item.productId" 
                      :to="`/product/${item.productId._id}`" 
                      class="text-primary hover:text-blue-700 hover:underline truncate inline-block max-w-[150px] font-black"
                    >
                      {{ item.productId.title }}
                    </router-link>
                    <span class="text-text_main/50 font-black text-xs" dir="ltr">× {{ item.quantity }}</span>
                  </div>
                  <div class="mt-2 text-xs font-black bg-gray-100 inline-block px-2 py-1 rounded border border-gray-300">
                    <span dir="ltr">{{ order.totalPrice }} MAD</span>
                  </div>
                </td>
                <td class="p-4">
                  <select 
                    v-model="order.status" 
                    @change="updateOrderStatus(order._id, order.status)"
                    class="border-2 rounded-md px-3 py-2 text-xs font-black outline-none cursor-pointer transition-colors"
                    :class="{
                      'bg-warning/20 text-warning border-warning': order.status === 'on possessing',
                      'bg-secondary/20 text-secondary border-secondary': order.status === 'confirmed',
                      'bg-danger/20 text-danger border-danger': order.status === 'cancelled'
                    }"
                  >
                    <option value="on possessing">قيد التجهيز</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="cancelled">ملغى</option>
                  </select>
                </td>
                <td class="p-4 text-center">
                  <a 
                    v-if="order.status === 'confirmed'" 
                    :href="`/tickets/Ticket_${order._id}.pdf`" 
                    target="_blank"
                    class="inline-flex items-center text-secondary hover:text-green-700 font-black bg-secondary/10 px-4 py-2 rounded-lg border-2 border-secondary transition hover:-translate-y-0.5"
                  >
                    فتح PDF
                  </a>
                  <span v-else class="text-gray-400 text-xs font-bold">-</span>
                </td>
              </tr>
              <tr v-if="filteredOrders.length === 0">
                <td colspan="6" class="p-12 text-center text-text_main/50 font-black text-lg">
                  لا توجد طلبات تطابق بحثك.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'addProduct'" class="max-w-2xl mx-auto">
        <h2 class="text-4xl font-black text-text_main mb-8 italic tracking-tighter">إضافة منتج جديد</h2>
        
        <div class="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-text_main">
          <form @submit.prevent="submitProduct" class="space-y-6">
            <div>
              <label class="block text-sm font-black text-text_main mb-2">اسم المنتج</label>
              <input v-model="productForm.title" type="text" required class="block w-full px-4 py-3 border-2 border-text_main rounded-xl focus:ring-primary outline-none font-bold">
            </div>

            <div>
              <label class="block text-sm font-black text-text_main mb-2">الوصف</label>
              <textarea v-model="productForm.description" rows="3" required class="block w-full px-4 py-3 border-2 border-text_main rounded-xl focus:ring-primary outline-none font-bold"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-black text-text_main mb-2">السعر (MAD)</label>
                <input v-model="productForm.price" type="number" step="0.01" required dir="ltr" class="block w-full px-4 py-3 border-2 border-text_main rounded-xl focus:ring-primary outline-none font-bold text-left">
              </div>
              <div>
                <label class="block text-sm font-black text-text_main mb-2">الكمية المتوفرة</label>
                <input v-model="productForm.quantity" type="number" required dir="ltr" class="block w-full px-4 py-3 border-2 border-text_main rounded-xl focus:ring-primary outline-none font-bold text-left">
              </div>
            </div>

            <div>
              <label class="block text-sm font-black text-text_main mb-2">صورة المنتج</label>
              <input type="file" @change="handleFileUpload" accept="image/*" required class="block w-full text-sm text-text_main file:ml-4 file:py-3 file:px-6 file:rounded-xl file:border-2 file:border-text_main file:text-sm file:font-black file:bg-gray-100 file:text-text_main hover:file:bg-gray-200 cursor-pointer">
            </div>

            <button type="submit" :disabled="isUploading" class="w-full mt-6 bg-secondary text-white py-4 rounded-xl font-black text-xl transition border-2 border-text_main shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 active:translate-y-1 active:shadow-none disabled:opacity-50">
              {{ isUploading ? 'جاري الرفع...' : 'نشر المنتج' }}
            </button>
          </form>
        </div>
      </div>

    </main>
  </div>
</template>
<script setup>
import { ref, onMounted , computed} from 'vue'
// ==========================================
// NAVIGATION STATE
// ==========================================
// Default tab when admin dashboard loads
const activeTab = ref('orders')

// ==========================================
// ORDERS LOGIC
// ==========================================
const orders = ref([])

const fetchOrders = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const res = await fetch('/api/orders', {
      headers: { 'Authorization': token }
    })
    if (res.ok) {
      orders.value = await res.json()
      console.log("Fetched orders:", orders.value)
    }
  } catch (error) {
    console.error("Failed to load orders", error)
  }
}

const updateOrderStatus = async (orderId, newStatus) => {
  const token = localStorage.getItem('token')
  
  try {
    // This sends the new status to the backend route we just upgraded
    const res = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token 
      },
      body: JSON.stringify({ status: newStatus }) // 'on possessing', 'confirmed', or 'done'
    })
    
    if (!res.ok) {
      const errData = await res.json()
      alert(`Database failed to update: ${errData.message}`)
      fetchOrders() // Refresh the table to revert the UI if the database failed
    } else {
      console.log(`Database successfully updated order ${orderId} to ${newStatus}`)
    }
  } catch (error) {
    console.error("Network error:", error)
    alert("Network error. Make sure your backend server is running!")
    fetchOrders() // Revert UI
  }
}
// ==========================================
// ADD PRODUCT LOGIC
// ==========================================
const isUploading = ref(false)
const selectedFile = ref(null)
const productForm = ref({
  title: '',
  description: '',
  price: '',
  quantity: ''
})

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const submitProduct = async () => {
  isUploading.value = true
  const token = localStorage.getItem('token')

  const formData = new FormData()
  formData.append('title', productForm.value.title)
  formData.append('description', productForm.value.description)
  formData.append('price', productForm.value.price)
  formData.append('quantity', productForm.value.quantity)
  formData.append('image', selectedFile.value)

  try {
    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: { 'Authorization': token },
      body: formData
    })

    if (res.ok) {
      alert("Product successfully added to the store!")
      // Reset the form
      productForm.value = { title: '', description: '', price: '', quantity: '' }
      selectedFile.value = null
      // Automatically switch back to orders view or keep them here if they want to add more
      activeTab.value = 'orders' 
    } else {
      const err = await res.json()
      alert(err.message || "Upload failed")
    }
  } catch (error) {
    console.error("Upload error:", error)
  } finally {
    isUploading.value = false
  }
}

const downloadTicket = async (orderId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`/api/orders/${orderId}/ticket`, {
      method: 'GET',
      headers: { 'Authorization': token }
    })

    if (!res.ok) {
      const err = await res.json()
      alert(`Failed to download: ${err.message}`)
      return
    }

    // Convert the response to a Blob (raw file data)
    const blob = await res.blob()
    
    // Create a temporary link to download the Blob
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Ticket_${orderId}.pdf`) // Name of the downloaded file
    
    // Append to body, click it, and clean up
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

  } catch (error) {
    console.error("Download error:", error)
    alert("Network error while trying to download ticket.")
  }
}

// 1. ADD THESE THREE THINGS FOR SEARCH/FILTER
const searchQuery = ref('')
const statusFilter = ref('All')

// This acts as a "live lens" over your existing orders array
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    // Check Status
    const matchesStatus = statusFilter.value === 'All' || order.status === statusFilter.value
    
    // Check Search Text (ID, First Name, Last Name, Email)
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = 
      (order._id && order._id.toLowerCase().includes(searchLower)) ||
      (order.customerInfo?.firstName && order.customerInfo.firstName.toLowerCase().includes(searchLower)) ||
      (order.customerInfo?.lastName && order.customerInfo.lastName.toLowerCase().includes(searchLower)) ||
      (order.customerInfo?.email && order.customerInfo.email.toLowerCase().includes(searchLower))

    return matchesStatus && matchesSearch
  })
})
// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  fetchOrders()
})
</script>