import { reactive, computed, watch } from 'vue'

// 1. Check LocalStorage when the app first loads
const savedItems = localStorage.getItem('mooljemal_cart')
const initialItems = savedItems ? JSON.parse(savedItems) : []

// 2. Define the state with the loaded items (or empty array)
const state = reactive({
  items: initialItems
})

// 3. The Magic Feature: Auto-Save
// 'deep: true' means it watches the array AND the properties inside it (like item.quantity)
watch(
  () => state.items,
  (newItems) => {
    localStorage.setItem('mooljemal_cart', JSON.stringify(newItems))
  },
  { deep: true }
)

// 4. Export the cart object
export const cart = {
  // Expose the items
  get items() { return state.items },
  set items(val) { state.items = val },

  // This now returns a primitive number, not a Ref object
  total: computed(() => {
    return state.items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + (price * qty);
    }, 0);
  }),

  add(product) {
    const exists = state.items.find(i => i._id === product._id)
    if (exists) {
      alert("This item is already in your cart!")
      return
    }
    // We spread the product and set quantity to 1
    state.items.push({ ...product, quantity: 1 })
  },

  remove(productId) {
    state.items = state.items.filter(i => i._id !== productId)
  },

  clear() {
    state.items = []
  }
}