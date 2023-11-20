import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    selectedProducts: []
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, size, color } = action.payload
      const existingProduct = state.products.find(
        product =>
          product.id === id && product.size === size && product.color === color
      )

      if (existingProduct) {
        // If the product already exists, increment the quantity
        existingProduct.quantity += 1
      } else {
        // If the product doesn't exist, add a new product
        const newProduct = {
          ...action.payload,
          quantity: 1,
          size: action.payload.size,
          color: action.payload.color,
          selected: false // Thêm thuộc tính selected với giá trị mặc định là false
        }

        state.quantity += 1
        state.products.push(newProduct)
        state.total += newProduct.price * newProduct.quantity
      }
    },

    clearCart: state => {
      state.products = []
      state.quantity = 0
      state.total = 0
    },
    toggleSelect: (state, action) => {
      const { id, size, color } = action.payload;
    
      const updatedProducts = state.products.map((product) =>
        product.id === id && product.size === size && product.color === color
          ? { ...product, selected: !product.selected }
          : product
      );
    
      const updatedTotal = updatedProducts.reduce(
        (total, product) => total + (product.selected ? product.price * product.quantity : 0),
        0
      );
    
      return {
        ...state,
        products: updatedProducts,
        total: updatedTotal,
      };
    },
    updateQuantityAfterPayment: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const product = state.products.find((item) => item._id === productId);

      if (product) {
        product.quantity = newQuantity;
        // Cập nhật các thông tin khác của giỏ hàng nếu cần
        // state.quantity, state.total, ...
      }
    },
  }
})

export const { addProduct, clearCart, toggleSelect, updateQuantityAfterPayment } =
  cartSlice.actions
export default cartSlice.reducer
