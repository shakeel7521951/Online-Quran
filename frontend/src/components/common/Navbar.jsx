import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaSwatchbook } from "react-icons/fa6";

const navItems=[
  {id:1,name:"Home",path:"/"},
  {id:2,name:"About",path:"/about"},
  
  {id:3,name:"Services",path:"/services"},
  {id:4,name:"Contact Us",path:"/contact"},
  
]
const Navbar = () => {
  const [menu,setmenu]=useState(false);
  const [hidex,sethidex]=useState(false);
  const[menuicon,setmenuicon]=useState(true);
  return (
    
      <nav className='navbar m-2  '>
        <div className="nav-container      flex rounded-xl text-white bg-gradient-to-r from-[#3a291c] to-[#EBC693]  sm:flex justify-between items-center w-full sm:w-[95%] mx-auto py-2 px-5  shadow-sm">
          <div>
          <Link>  <h1 className='flex items-center gap-1'>
              <img className='w-20 rounded-sm' src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UXVyYW58ZW58MHx8MHx8fDA%3D" alt="" />
              آنلان قرآن
            </h1></Link>
          </div>
          <div className='md:block'>
          <ul className='md:flex hidden  gap-10 '>
            {navItems.map((item)=>(
               <li key={item.id} className='font-semibold  px-3 transition rounded-sm py-1 hover:bg-[#D1AF81] '>
              <Link to={item.path}>{item.name}</Link>
            </li>
            ))}
           
          </ul>
          </div>


          <div className='hidden md:block'>
            <Link><button className='px-5 rounded-sm  group flex items-center gap-2 py-3 bg-[#967B5A] hover:bg-[#b99d79] hover:rounded-tr-xl hover:rounded-bl-xl transition   cursor-pointer text-sm text-white font-semibold'>Sign In<FaSwatchbook className='group-hover:scale-120 transition' />
</button></Link>
          </div>
          <div className='relative md:hidden'>
<button onClick={()=>setmenu(!menu)}>
  {menu ? <RxCross1  className='absolute top-0 right-1  text-black text-xl cursor-pointer ' />: <AiOutlineMenuFold   className='text-black text-xl cursor-pointer ' />}

  
</button>

        </div>
        </div>
        
        {/* Mobile Div  */}
        {menu && (
 <div className='h-screen sm:hidden  text-white  fixed  bg-gradient-to-r from-[#3a291c] to-[#EBC693] z-40  top-20 pt-10 w-full sm:w-sm right-0 border'>
            <ul className=' flex flex-col items-center gap-10 '>
            {navItems.map((item)=>(
               <li key={item.id} className='font-semibold'>
              <Link to={item.path}>{item.name}</Link>
            </li>
            ))}
           
          </ul>
            <div className='flex justify-center mt-10' >
            <Link><button className='px-7  py-2 cursor-pointer  text-white font-semibold'>Sign In</button></Link>
          </div>

          <div className='flex gap-3 justify-center mt-10'>
            <div className='p-2 bg-[#ecc38c] text-black border rounded-full'>
              <FaFacebookF />
            </div>
            <div className='p-2  bg-[#ecc38c] text-black border rounded-full'>
              <FaWhatsapp  />
            </div>
            <div className='p-2  bg-[#ecc38c] text-black border rounded-full'>
              <AiOutlineYoutube  />
            </div>
            
          </div>

        </div>
        )}
       
      </nav>
    
  )
}

export default Navbar;