import React from 'react'

function Articles() {
  const trending = ['worldcup', 'IPL', 'ASIA CUP'];
  return (
    
    <div className="m-3">
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 ">
        <ul className="h-full p-4 bg-gray-100">
          {trending.map((item, index) => (
            <li key={index} className="border-b border-gray-400 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
);
}

export default Articles