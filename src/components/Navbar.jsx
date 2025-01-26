import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-[#0a0a0a] p-6 text-xl font-semibold'>
        <div className='mx-[mx-4rem] flex gap-4'>
            <Link to='/' className='text-white hover:text-grey-300'>Home</Link>
            <Link to='/watchlist' className='text-white hover:text-grey-300'>Watchlist</Link>
        </div>
    </nav>
  )
}

export default Navbar