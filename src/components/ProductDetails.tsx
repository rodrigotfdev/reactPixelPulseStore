import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import toast from 'react-hot-toast'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const dispatch = useDispatch()

  const name = decodeURIComponent(searchParams.get('name') || '')
  const price = parseFloat(searchParams.get('price') || '0')
  const photoName = decodeURIComponent(searchParams.get('photoName') || '')
  const memoryClock = decodeURIComponent(searchParams.get('memoryClock') || '')
  const memorySize = decodeURIComponent(searchParams.get('memorySize') || '')
  const memoryType = decodeURIComponent(searchParams.get('memoryType') || '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: Number(id),
      name,
      price,
      photoName,
      specs: { memoryClock, memorySize, memoryType },
      soldOut: false,
    }))
    toast.success(`${name} added to cart!`, {
      duration: 3000,
      icon: '🛒',
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img className="h-full w-full object-cover md:object-center" src={`/${photoName}`} alt={name} />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">GPU</div>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{name}</h2>
            <p className="mt-4 text-xl text-gray-500">
              Experience next-level gaming with this powerful graphics card.
            </p>
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
              <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Memory Clock</dt>
                  <dd className="text-gray-900">{memoryClock}</dd>
                </div>
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Memory Size</dt>
                  <dd className="text-gray-900">{memorySize}</dd>
                </div>
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Memory Type</dt>
                  <dd className="text-gray-900">{memoryType}</dd>
                </div>
              </dl>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">R$ {price.toFixed(2)}</span>
              <button 
                onClick={handleAddToCart}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails