import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const name = searchParams.get('name') || ''
  const price = parseFloat(searchParams.get('price') || '0')
  const photoName = searchParams.get('photoName') || ''
  const memoryClock = searchParams.get('memoryClock') || ''
  const memorySize = searchParams.get('memorySize') || ''
  const memoryType = searchParams.get('memoryType') || ''

  return (
    <>
      <div className="product-detail-container flex flex-row bg-white rounded-md items-center mx-auto my-28 w-11/12 h-full">
        <div className="left-detail-container w-7/12 h-full flex items-center justify-center rounded-md">
          <img src={`/${photoName}`} alt={name} className="w-10/12" />
        </div>
        <div className="right-detail-container w-5/12 h-screen bg-gray-500 text-white flex flex-col p-10 rounded-e-md">
          <div className="right-detail-name w-full text-3xl mb-28">
            <h2>{name}</h2>
          </div>
          <div className="product-right-specs h-full">
            <h3 className="m-3 text-2xl">Product Specifications:</h3>
            <p className="m-3 text-xl">Memory Clock: {memoryClock}</p>
            <p className="m-3 text-xl">Memory Size: {memorySize}</p>
            <p className="m-3 text-xl">Memory Type: {memoryType}</p>
          </div>
          <div className="product-right-purchase flex flex-col mb-4">
            <span className="bg-black rounded-lg h-10 font-extrabold flex items-center justify-center mb-5">
              R$ {price.toFixed(2)}
            </span>
            <button className="bg-black rounded-lg h-10 font-bold uppercase hover:opacity-50">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails