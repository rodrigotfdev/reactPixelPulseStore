import React, { useEffect, useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // TODO: Replace with actual API call when available
    const mockFetch = async () => {
      const mockData: Product[] = [
        { id: 1, name: 'CPU', price: 299.99 },
        { id: 2, name: 'GPU', price: 499.99 },
        { id: 3, name: 'RAM', price: 89.99 },
      ]
      setProducts(mockData)
    }
    mockFetch()
  }, [])

  return (
    <div className="product-list">
      <h2>Computer Components</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList