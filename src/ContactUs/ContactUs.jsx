
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import AboutSection from '../Component/AboutSection/AboutSection';
import MyButton from '../Component/MyButton';

export default function ContactUs() {
    const { t, i18n } = useTranslation();

    // Validation with translation
    const validate = (values) => {
        const errors = {};
        if (!values.fname) {
            errors.fname = t('contactPage.validation.fnameRequired');
        }
        if (!values.lname) {
            errors.lname = t('contactPage.validation.lnameRequired');
        }
        if (!values.email) {
            errors.email = t('contactPage.validation.emailRequired');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = t('contactPage.validation.emailInvalid');
        }
        if (!values.phone) {
            errors.phone = t('contactPage.validation.phoneRequired');
        } else if (!/^\+?[0-9]{7,15}$/.test(values.phone)) {
            errors.phone = t('contactPage.validation.phoneInvalid');
        }
        if (!values.subject) {
            errors.subject = t('contactPage.validation.subjectRequired');
        }
        if (!values.message) {
            errors.message = t('contactPage.validation.messageRequired');
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            const mailto = `mailto:dohaaboelkasem315@gmail.com?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
                `${t('contactPage.form.firstNameLabel')}: ${values.fname}\n${t('contactPage.form.lastNameLabel')}: ${values.lname}\n${t('contactPage.form.emailLabel')}: ${values.email}\n${t('contactPage.form.phoneLabel')}: ${values.phone}\n${t('contactPage.form.messageLabel')}: ${values.message}`
            )}`;
            window.location.href = mailto;
            resetForm();
        }
    });

    // Language switch buttons
    const handleLangChange = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            {/* Language switch buttons removed, already in navbar */}
            <div className='py-24 border-b border-gray-200 bg-white'>
                <div className='container mx-auto flex items-center gap-16'>
                    <div className='w-2/5'>
                        <h2 className='text-4xl text-[#262626] font-bold'>
                            {t('contactPage.header.title')}
                        </h2>
                    </div>
                    <div className='w-3/5'>
                        <p className='text-gray-500 leading-relaxed'>
                            {t('contactPage.header.paragraph')}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex p-8 md:p-16 bg-white container mx-auto gap-8 lg:gap-16 border-b border-gray-200 flex-col lg:flex-row'>
                <div className='w-full lg:w-9/12 pr-8'>
                    <form onSubmit={formik.handleSubmit} className='space-y-6'>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                                    {t('contactPage.form.firstNameLabel')}
                                </label>
                                <input
                                    type='text'
                                    id='firstName'
                                    placeholder={t('contactPage.form.firstNamePlaceholder')}
                                    className='w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                                    name='fname'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fname}
                                />
                                {formik.touched.fname && formik.errors.fname && (
                                    <div className='text-red-500 text-sm mt-1'>{formik.errors.fname}</div>
                                )}
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                                    {t('contactPage.form.lastNameLabel')}
                                </label>
                                <input
                                    type='text'
                                    id='lastName'
                                    placeholder={t('contactPage.form.lastNamePlaceholder')}
                                    className='w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                                    name='lname'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lname}
                                />
                                {formik.touched.lname && formik.errors.lname && (
                                    <div className='text-red-500 text-sm mt-1'>{formik.errors.lname}</div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                                    {t('contactPage.form.emailLabel')}
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    placeholder={t('contactPage.form.emailPlaceholder')}
                                    className='w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className='text-red-500 text-sm mt-1'>{formik.errors.email}</div>
                                )}
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                                    {t('contactPage.form.phoneLabel')}
                                </label>
                                <input
                                    type='tel'
                                    id='phone'
                                    placeholder={t('contactPage.form.phonePlaceholder')}
                                    className='w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                                    name='phone'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className='text-red-500 text-sm mt-1'>{formik.errors.phone}</div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor='subject' className='block text-sm font-medium text-gray-700 mb-2'>
                                {t('contactPage.form.subjectLabel')}
                            </label>
                            <input
                                type='text'
                                id='subject'
                                placeholder={t('contactPage.form.subjectPlaceholder')}
                                className='w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                                name='subject'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.subject}
                            />
                            {formik.touched.subject && formik.errors.subject && (
                                <div className='text-red-500 text-sm mt-1'>{formik.errors.subject}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
                                {t('contactPage.form.messageLabel')}
                            </label>
                            <textarea
                                id='message'
                                rows='6'
                                placeholder={t('contactPage.form.messagePlaceholder')}
                                className='w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                                name='message'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            ></textarea>
                            {formik.touched.message && formik.errors.message && (
                                <div className='text-red-500 text-sm mt-1'>{formik.errors.message}</div>
                            )}
                        </div>

                        <div>
                            <MyButton
                                type='submit'
                                className='py-3 px-6 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors'
                            >
                                {t('contactPage.form.submitButton')}
                            </MyButton>
                        </div>
                    </form>
                </div>

                <div className='hidden lg:flex w-3/12 flex-col space-y-4 mt-7'>
                    <div className='flex flex-col items-center space-y-3 border border-gray-300 p-4 rounded-lg'>
                        <p className="text-black mb-2 hover:text-[#ff9500]"><i className="fa-solid fa-envelope fa-2x"></i></p>
                        <h2 className='text-gray-800'>{t('contactPage.sidebar.emailAddress')}</h2>
                    </div>
                    <div className='flex flex-col items-center space-y-3 border border-gray-300 p-4 rounded-lg'>
                        <p className="text-black mb-2 hover:text-[#ff9500]"><i className="fa-solid fa-phone fa-2x"></i></p>
                        <h2 className='text-gray-800'>{t('contactPage.sidebar.phoneNumber')}</h2>
                    </div>
                    <div className='flex flex-col items-center space-y-3 border border-gray-300 p-4 rounded-lg'>
                        <p className="text-black hover:text-[#ff9500]"><i className="fa-solid fa-location-dot"></i></p>
                        <h2 className='text-gray-800'>{t('contactPage.sidebar.location')}</h2>
                    </div>
                    <div className='flex flex-col items-center space-y-3 border border-gray-300 p-4 rounded-lg'>
                        <div>
                            <i className="fa-brands fa-facebook m-3 text-black text-2xl hover:text-[#ff9500]"></i>
                            <i className="fa-brands fa-square-twitter m-3 text-black text-2xl hover:text-[#ff9500]"></i>
                            <i className="fa-brands fa-linkedin m-3 text-black text-2xl hover:text-[#ff9500]"></i>
                        </div>
                        <h2 className='text-gray-800'>{t('contactPage.sidebar.socialTitle')}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}