import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

// base url will be dynamic depending on the environment
const BASE_URL =
  import.meta.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {
    name: '',
    price: '',
    image: '',
  },

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  resetForm: () =>
    set({
      formData: { name: '', price: '', image: '' },
    }),

  addProduct: async (e) => {
    e.preventDefault()
    set({ loading: true })

    try {
      const { formData } = get()

      await axios.post(`${BASE_URL}/api/products`, formData)
      await get().fetchProducts()
      get().resetForm()

      toast.success('Product added successfully')
      document.getElementById('add_product_modal').close()
    } catch (error) {
      toast.error('Error while adding product')
    } finally {
      set({ loading: false })
    }
  },

  fetchProducts: async () => {
    set({ loading: true })

    try {
      const res = await axios.get(`${BASE_URL}/api/products`)
      set({ products: res.data.data, error: null })
    } catch (error) {
      if (error.response?.status === 429) {
        set({ error: 'Rate limit exceeded' })
      } else {
        set({ error: 'Something went wrong' })
      }
    } finally {
      set({ loading: false })
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true })

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`)
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }))
      toast.success('Product deleted successfully')
    } catch {
      toast.error('Something went wrong')
    } finally {
      set({ loading: false })
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true })

    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`)

      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      })
    } catch (error) {
      console.log('Error in fetchProduct ', error)
      set({
        error: 'Something went wrong',
        currentProduct: null,
      })
      toast.error('something went wrong')
    } finally {
      set({ loading: false })
    }
  },
  updateProduct: async (id) => {
    set({ loading: true })
    try {
      const { formData } = get()
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      )
      set({ currentProduct: response.data.data })
      toast.success('Product updated successfully')
    } catch (error) {
      toast.error('Something went wrong')
      console.log('Error in update Product ', error)
    } finally {
      set({ loading: false })
    }
  },
}))
