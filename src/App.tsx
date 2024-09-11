import React from 'react'
import TopMenu from './components/TopMenu'
import ProductList from './components/ProductList'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <div className="app">
      <TopMenu />
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  )
}

export default App