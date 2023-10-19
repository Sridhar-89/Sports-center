import React from 'react'

function Favourites() {
  const fav = ['MI', 'CSK', 'SRH'];
  return (
    <div className='m-3'>
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 ">
        <ul className="h-full p-4 bg-gray-200">
          {fav.map((item, index) => (
            <li key={index} className="border-b border-gray-400 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
)}

export default Favourites