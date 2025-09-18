import React from 'react';
import AboutSection from '../Component/AboutSection/AboutSection';


export default function AboutUs() {
  const MyButton = ({ children, disabled, ...restProps }) => {
    return (
     <button
      className="bg-[#ff9500] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-0 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
    );
  };

  return (
    <>
    <div className='bg-[#f7f7f8] '>
      <div className='py-24 border-b border-gray-200 bg-white '>
        <div className='container mx-auto flex items-center gap-16 '>
          <div className='w-2/5 '>
            <h2 className='text-4xl text-[#262626] font-bold'>
              About Skillbridge
            </h2>
          </div>
          <div className='w-3/5'>
            <p className='text-gray-500 leading-relaxed'>
              Welcome to our platform, where we are passionate about
              empowering individuals to master the world of design
              and development. We offer a wide range of online courses
              designed to equip learners with the skills and knowledge
              needed to succeed in the ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </div>

      <div className='py-10'>
        <div className='container mx-auto'>
          <h2 className='text-4xl text-[#262626] font-bold'>
            Achievements
          </h2>
          <p className='text-gray-500 mt-3'>Our commitment to excellence has
            led us to achieve significant
            milestones along our journey.
            Here are some of our notable achievements
          </p>
        </div>
      </div>

      <div className='container mx-auto flex gap-8 py-10'>
        <AboutSection
          icon={
            <i className="fa-solid fa-star text-[#ff9500]"></i>
          }
          title={<> <br /> rovide practical skills </>}
          paragraph={
            <>
              we focus on delivering practical skills that
              are relevant to the current industry <br /> demands, our courses
              are designed to equip learners with the knowledge and tools
              needed to excel im their chosen fields.
            </>
          }
        />
        <AboutSection
          icon={
            <i className="fa-solid fa-book text-[#ff9500]"></i>
          }
          title={<> <br /> rovide practical skills </>}
          paragraph={
            <>
              we focus on delivering practical skills that
              are relevant to the current industry <br /> demands, our courses
              are designed to equip learners with the knowledge and tools
              needed to excel im their chosen fields.
            </>
          }
        />
      </div>

      <div className='container mx-auto flex gap-8'>
        <AboutSection
          icon={
            <i className="fa-solid fa-puzzle-piece text-[#ff9500]"></i>
          }
          title={<> <br /> rovide practical skills </>}
          paragraph={
            <>
              we focus on delivering practical skills that
              are relevant to the current industry <br /> demands, our courses
              are designed to equip learners with the knowledge and tools
              needed to excel im their chosen fields.
            </>
          }
        />
        <AboutSection
          icon={
            <i className="fa-solid fa-book text-[#ff9500]"></i>
          }
          title={<> <br /> rovide practical skills </>}
          paragraph={
            <>
              we focus on delivering practical skills that
              are relevant to the current industry <br /> demands, our courses
              are designed to equip learners with the knowledge and tools
              needed to excel im their chosen fields.
            </>
          }
        />
      </div>

      <div className="p-20 m-15 mt-10 bg-white rounded-lg shadow-md mb-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 ">
              <span className="text-[#ff9500]">Together,</span> let's shape the future of digital innovation
            </h2>
            <p className="text-gray-500 mt-4">
              Join us on this exciting learning journey and unlock your potential in design and development.
            </p>
          </div>
          <div>
            <MyButton type="button">
              Join Now
            </MyButton>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}