import React from 'react'

const NavBar = () => {
  return (
    <header>
      <nav>
       <img src="/logo.svg" alt="Apple Logo" className="h-8 w-8" />

       <ul>
        {[
            {label: 'Store' },
            {label: 'Mac' },
            {label: 'iPhone' },
            {label: 'Watch' },
            {label: 'Vision' },
            {label: 'AirPods' },

        ].map(({label}) => (
            <li key={label} >
                <a href={label}>{label}</a>
            </li>
        ))}
       </ul>
      </nav>
    </header>
  )
}

export default NavBar