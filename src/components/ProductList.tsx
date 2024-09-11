import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { fetchProducts, Product } from '../store/productsSlice'

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.photoName} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: R$ {product.price.toFixed(2)}</p>
      <ul>
        <li>Memory Clock: {product.specs.memoryClock}</li>
        <li>Memory Size: {product.specs.memorySize}</li>
        <li>Memory Type: {product.specs.memoryType}</li>
      </ul>
      {product.soldOut && <p className="sold-out">Sold Out</p>}
    </div>
  )
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: products, status, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="product-list">
      <h2>Computer Components</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList