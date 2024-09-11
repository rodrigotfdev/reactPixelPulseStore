import React from 'react'

const TopMenu: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Logo</div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search components..."
            className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            🔍
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopMenu