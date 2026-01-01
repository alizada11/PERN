import { ShoppingBagIcon, ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'

function Navbar() {
  const { pathname } = useResolvedPath()
  const isHomePage = pathname === '/'

  return (
    <div className='bg-base-100/80 backdrop-blur-lg bordr-b bordre-base-content/10 sticy top-0 z-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='navbar px-4 min-h-[4rem] justify-between'>
          {/* logo */}
          <div className='flex-1 lg:flex-none'>
            <Link to='/' className='hoveer:opacity-80 transition-opacity'>
              <div className='flex items-center gap-2'>
                <ShoppingCartIcon className='size-9 tex-primary' />
                <span className='font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                  PGSTORE
                </span>
              </div>
            </Link>
          </div>

          {/* right section */}

          <div className='flex items-center gap-4'>
            <ThemeSelector />

            {isHomePage && (
              <div className='indicator'>
                <div className='p-2  hover:bg-base-200 transition-colors'>
                  <ShoppingBagIcon className='size-5' />
                  <span className='badg badge-sm rounded-full badge-primary indicator-item'>
                    9
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
