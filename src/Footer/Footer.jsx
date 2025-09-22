import React from "react";
import { useTranslation } from "react-i18next";
export default function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	const brand = t("footer.brand.name");
	return (
		<>
			<div className="bg-white text-white p-8 md:p-12">
				<div className="container mx-auto flex flex-col md:flex-row gap-8">
					<div className="w-full md:w-1/4 text-center md:text-left">
						<img
							src="/images/logo.png"
							alt="Skillbridge Logo"
							className="h-8 w-auto rounded-md mx-auto md:mx-0 mb-4"
						/>
						<p className="text-black mb-2 hover:text-[#ff9500]">
							<i class="fa-solid fa-envelope"></i> {t("footer.contact.email")}
						</p>
						<p className="text-black mb-2 hover:text-[#ff9500]">
							<i class="fa-solid fa-phone"></i> {t("footer.contact.phone")}
						</p>
						<p className="text-black hover:text-[#ff9500]">
							<i class="fa-solid fa-location-dot"></i>{" "}
							{t("footer.contact.location")}
						</p>
					</div>
					<div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<div>
							<h2 className="text-xl text-black font-bold mb-4 hover:text-[#ff9500]">
								{t("footer.sections.home.title")}
							</h2>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.home.items.benefits")}
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.home.items.courses")}
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.home.items.testimonials")}
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.home.items.faq")}
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h2 className="text-xl text-black font-bold mb-4 hover:text-[#ff9500]">
								{t("footer.sections.about.title")}
							</h2>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.about.items.company")}
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.about.items.careers")}
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{t("footer.sections.about.items.press")}
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-500 hover:text-[#ff9500]">
										{" "}
										{t("footer.sections.about.items.news")}
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h2 className="text-xl  text-black font-bold mb-4 hover:text-[#ff9500] ">
								{t("footer.sections.social.title")}
							</h2>
							<div>
								<i className="fa-brands fa-facebook m-3 text-black text-2xl hover:text-[#ff9500]"></i>
								<i className="fa-brands fa-square-twitter m-3 text-black text-2xl hover:text-[#ff9500]"></i>
								<i className="fa-brands fa-linkedin m-3 text-black text-2xl hover:text-[#ff9500]"></i>
							</div>
						</div>
					</div>
				</div>
				<p className="text-gray-500 mt-10 text-center">
					{" "}
					{t("footer.copyright", { year, brand })}{" "}
				</p>
			</div>
		</>
	);
}
