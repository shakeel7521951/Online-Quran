import React from 'react'

const MapEmbed = () => {
  return (
    <div className='w-full h-[400px] p-5 rounded-md overflow-hidden'>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1846227.312110358!2d50.26416659042511!3d25.340709688566015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x1cfa88cf812b4032!2sQatar!5e0!3m2!1sen!2s!4v1756980703317!5m2!1sen!2s"
        className='w-full h-full border-0'
          
           allowFullScreen=""
            loading="lazy"
             referrerPolicy="no-referrer-when-downgrade">

             </iframe>
    </div>
  )
}

export default MapEmbed;