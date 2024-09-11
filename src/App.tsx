import React from 'react'
import TopMenu from './components/TopMenu'
import ProductList from './components/ProductList'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProductList />
      </main>
      <Footer />
    </div>
  )
}

export default App