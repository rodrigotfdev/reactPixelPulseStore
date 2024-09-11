import React from 'react'

const TopMenu: React.FC = () => {
  return (
    <header>
      <div className="logo">Logo</div>
      <div className="search-bar">
        <input type="text" placeholder="Search components..." />
        <button>🔍</button>
      </div>
    </header>
  )
}

export default TopMenu