import React from 'react'
import {
  DollarSignIcon,
  ImageIcon,
  PackageIcon,
  PlusCircleIcon,
} from 'lucide-react'
import { useProductStore } from '../store/useProductSotre'

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore()
  return (
    <dialog id='add_product_modal' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            X
          </button>
        </form>
        <h3 className='ont-bold text-xl mb-8'>Add new Product</h3>

        <form onSubmit={addProduct} className='space-y-6'>
          <div className='grid-gap-6'>
            <div className='form-control'>
              <label htmlFor='' className='label'>
                <span className='label-text text-base font-medium'>
                  Product Name
                </span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
                  <PackageIcon className='size-5' />
                </div>
                <input
                  type='text'
                  placeholder='Enter Product Name'
                  name=''
                  id=''
                  className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...FormData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='form-control'>
              <label htmlFor='' className='label'>
                <span className='label-text text-base font-medium'>Price</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
                  <DollarSignIcon className='size-5' />
                </div>
                <input
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='0.00'
                  name=''
                  id=''
                  className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...FormData, price: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='form-control'>
              <label htmlFor='' className='label'>
                <span className='label-text text-base font-medium'>Image</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
                  <ImageIcon className='size-5' />
                </div>
                <input
                  type='text'
                  placeholder='Enter Product Image'
                  name=''
                  id=''
                  className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200'
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...FormData, image: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className='modal-action'>
            <button type='button' className='btn btn-ghost'>
              {' '}
              Cancel
            </button>

            <button
              type='submit'
              className='btn btn-primary min-w-[120px]'
              disabled={
                !formData.name || !formData.price || !formData.image || loading
              }
            >
              {loading ? (
                <span className='loading loading-spinner loading-sm'></span>
              ) : (
                <>
                  <PlusCircleIcon className='size-5 mr-2' />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}

export default AddProductModal
