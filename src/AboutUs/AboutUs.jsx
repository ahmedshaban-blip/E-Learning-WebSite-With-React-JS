import React from 'react';
import { useTranslation } from 'react-i18next'; // <-- 1. استدعاء Hook الترجمة

import AboutSection from '../Component/AboutSection/AboutSection';


export default function AboutUs() {
  const { t } = useTranslation(); 
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
              {t('about_page.header_title')}
            </h2>
          </div>
          <div className='w-3/5'>
            <p className='text-gray-500 leading-relaxed'>
              {t('about_page.header_description')}
            </p>
          </div>
        </div>
      </div>

      <div className='py-10'>
        <div className='container mx-auto'>
          <h2 className='text-4xl text-[#262626] font-bold'>
            {t('about_page.achievements_title')}
          </h2>
          <p className='text-gray-500 mt-3'>
            {t('about_page.achievements_description')}
          </p>
        </div>
      </div>

      <div className='container mx-auto flex gap-8 py-10'>
        <AboutSection
          icon={<i className="fa-solid fa-star text-[#ff9500]"></i>}
          title={<>{t('about_page.section_title')}</>}
          paragraph={<>{t('about_page.section_paragraph')}</>}
        />
        <AboutSection
          icon={<i className="fa-solid fa-book text-[#ff9500]"></i>}
          title={<>{t('about_page.section_title')}</>}
          paragraph={<>{t('about_page.section_paragraph')}</>}
        />
      </div>

      <div className='container mx-auto flex gap-8'>
        <AboutSection
          icon={<i className="fa-solid fa-puzzle-piece text-[#ff9500]"></i>}
          title={<>{t('about_page.section_title')}</>}
          paragraph={<>{t('about_page.section_paragraph')}</>}
        />
        <AboutSection
          icon={<i className="fa-solid fa-book text-[#ff9500]"></i>}
          title={<>{t('about_page.section_title')}</>}
          paragraph={<>{t('about_page.section_paragraph')}</>}
        />
      </div>

      <div className="p-20 m-15 mt-10 bg-white rounded-lg shadow-md mb-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 ">
              <span className="text-[#ff9500]">{t('about_page.cta_title_highlight')}</span>{t('about_page.cta_title_main')}
            </h2>
            <p className="text-gray-500 mt-4">
              {t('about_page.cta_description')}
            </p>
          </div>
          <div>
            <MyButton type="button">
              {t('about_page.cta_button')}
            </MyButton>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}