import React from 'react';

export default function Footer() {
  return (
    <>

      <div className="bg-white text-white p-8 md:p-12">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
        
              <div className="w-full md:w-1/4 text-center md:text-left">
                <img src="/images/logo.png" alt="Skillbridge Logo" className="h-8 w-auto rounded-md mx-auto md:mx-0 mb-4" />
                <p className="text-black mb-2 hover:text-[#ff9500]"><i class="fa-solid fa-envelope"></i> hello@skillbridge.com</p>
                <p className="text-black mb-2 hover:text-[#ff9500]"><i class="fa-solid fa-phone"></i> +20 123 456 7890</p>
                <p className="text-black hover:text-[#ff9500]"><i class="fa-solid fa-location-dot"></i> Cairo, Egypt</p>
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div>
              <h2 className="text-xl text-black font-bold mb-4 hover:text-[#ff9500]">Home</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Benefits</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Our Courses</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Our Testimonials</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Our FAQ</a></li>
              </ul>
            </div>
          
            <div>
              <h2 className="text-xl text-black font-bold mb-4 hover:text-[#ff9500]">About Us</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Company</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Careers</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">Press</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#ff9500]">News</a></li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl  text-black font-bold mb-4 hover:text-[#ff9500] ">Social Profiles</h2>
              <div>
                         <i className="fa-brands fa-facebook m-3 text-black text-2xl hover:text-[#ff9500]"></i>
                         <i className="fa-brands fa-square-twitter m-3 text-black text-2xl hover:text-[#ff9500]"></i>
                        <i className="fa-brands fa-linkedin m-3 text-black text-2xl hover:text-[#ff9500]"></i>
              </div>
               
            </div>
          </div>
        </div>
         <p className='text-gray-500 mt-10 text-center'>@2025 Skillbridge.All rights reserved</p>
      </div>
    </>
  );
}

