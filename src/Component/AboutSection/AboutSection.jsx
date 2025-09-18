import React from 'react';

export default function AboutSection({ icon, title, paragraph }) {
  return (
   
    <div className="w-1/2 border p-8 rounded-lg shadow-md bg-white hover:shadow-xl hover:scale-105 transition duration-300">
      
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-4 border p-6 rounded-md border-yellow-400 hover:bg-[#fff9f0] transition duration-300">
          {icon} 
        </div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{paragraph}</p>
        
      </div>
    </div>
  );
}