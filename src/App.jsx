import React from 'react'
import Form from './components/Form'
import left_pattern from './assets/images/pattern-squiggly-line-bottom-desktop.svg'
import right_pattern from './assets/images/pattern-squiggly-line-top.svg'


const App = () => {
  return (
    
    <div className=' relative bg-[url("src/assets/images/background-desktop.png")] bg-cover bg-center h-screen'>
      <img
    src="src/assets/images/pattern-lines.svg"
    alt="lines overlay"
    className="absolute top-0 left-0 w-full h-screen "
  />
  <img src={left_pattern} alt="" className='absolute left-0 bottom-0 '/>
  <img src={right_pattern} alt="" className='absolute right-0 top-0' />
   
     <Form/>
     
    
   </div>
    
  )
}

export default App
