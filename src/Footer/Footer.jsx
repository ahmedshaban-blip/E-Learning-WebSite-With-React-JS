import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const contact = t("footer.contact", { returnObjects: true });
  const sections = t("footer.sections", { returnObjects: true });
  const linkSections = [
    { key: "home", ...sections.home },
    { key: "about", ...sections.about },
  ];
  const socialSection = sections.social;
  const socialIcons = [
    { key: "facebook", icon: "fa-brands fa-facebook" },
    { key: "twitter", icon: "fa-brands fa-square-twitter" },
    { key: "linkedin", icon: "fa-brands fa-linkedin" },
  ];

  return (
    <>

      <div className="bg-white text-white p-8 md:p-12">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">

              <div
                className={`w-full md:w-1/4 text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
              >
                <img src="/images/logo.png" alt="Skillbridge Logo" className="h-8 w-auto rounded-md mx-auto md:mx-0 mb-4" />
                <p className="text-black mb-2 hover:text-[#ff9500]">
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i> {contact.email}
                </p>
                <p className="text-black mb-2 hover:text-[#ff9500]">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i> {contact.phone}
                </p>
                <p className="text-black hover:text-[#ff9500]">
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {contact.location}
                </p>
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {linkSections.map((section) => (
              <div key={section.key}>
                <h2 className="text-xl text-black font-bold mb-4 hover:text-[#ff9500]">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-500 hover:text-[#ff9500]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="text-xl  text-black font-bold mb-4 hover:text-[#ff9500] ">{socialSection.title}</h2>
              <div className="flex">
                {socialIcons.map(({ key, icon }) => (
                  <a
                    key={key}
                    href="#"
                    className="m-3 text-black text-2xl hover:text-[#ff9500]"
                    aria-label={socialSection.labels[key]}
                  >
                    <i className={`${icon}`} aria-hidden="true"></i>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
         <p className='text-gray-500 mt-10 text-center'>{t("footer.rights")}</p>
      </div>
    </>
  );
}

