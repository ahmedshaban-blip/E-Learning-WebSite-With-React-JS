import MyButton from "../Component/MyButton";
import CardsContainer from "../Component/CardsContainer";
import SectionTitle from "../Component/SectionTitle";
import SectionSubtitle from "../Component/SectionSubtitle";
import BenefitCard from "../Component/BenefitsSection/BenefitCard";
import CourseCard from "../Component/coursesSection/CourseCard";
import TestimonialCard from "../Component/TestimonialSection/TestimonialCard";
import PricingCard from "../Component/PricingSection/PricingCard";
import { useEffect, useState } from "react";
import { getLatestCourses } from "../lib/firebase";

import { useSelector, useDispatch } from "react-redux";
import { togglePlan } from "../redux/slices/pricingSlice";
import { useTranslation } from "react-i18next";

// testimonials data (names/images تبقى كما هي؛ النص يُترجم عبر t(...) بالأسفل)
const testimonials = [
	{
		image: "https://randomuser.me/api/portraits/women/44.jpg",
		name: "Doha",
	},
	{
		image: "https://randomuser.me/api/portraits/men/46.jpg",
		name: "Ahmed",
	},
	{
		image: "https://randomuser.me/api/portraits/women/68.jpg",
		name: "Hoda",
	},
	{
		image: "https://randomuser.me/api/portraits/men/65.jpg",
		name: "Abdulrhman",
	},
];

// price data (الليبلز هنعمل لها map للترجمة قبل التمرير للـ PricingCard)
const freeFeatures = [
	{ label: "home.pricing.features.freeFeatures.0", included: true },
	{ label: "home.pricing.features.freeFeatures.1", included: true },
	{ label: "home.pricing.features.freeFeatures.2", included: true },
	{ label: "home.pricing.features.freeFeatures.3", included: true },
	{ label: "home.pricing.features.freeFeatures.4", included: true },
	{ label: "home.pricing.features.freeFeatures.5", included: false },
	{ label: "home.pricing.features.freeFeatures.6", included: false },
];

const proFeatures = [
	{ label: "home.pricing.features.proFeatures.0", included: true },
	{ label: "home.pricing.features.proFeatures.1", included: true },
	{ label: "home.pricing.features.proFeatures.2", included: true },
	{ label: "home.pricing.features.proFeatures.3", included: true },
	{ label: "home.pricing.features.proFeatures.4", included: true },
	{ label: "home.pricing.features.proFeatures.5", included: true },
	{ label: "home.pricing.features.proFeatures.6", included: true },
];

function Home() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const last3 = await getLatestCourses(3);
				setCourses(last3 || []);
			} finally {
				setLoading(false);
			}
		})();
	}, []);


	const { t } = useTranslation();
	const { prices, planType } = useSelector((state) => state.pricing);
	const dispatch = useDispatch();

	const mappedFreeFeatures = freeFeatures.map((f) => ({
		...f,
		label: t(f.label),
	}));
	const mappedProFeatures = proFeatures.map((f) => ({
		...f,
		label: t(f.label),
	}));

	return (
		<>
			<div className="bg-white">
				<div className="relative isolate px-6 pt-14 lg:px-8">
					<div className="mx-auto max-w-2xl py-10 sm:py-12 lg:py-15">
						<div className="text-center">
							<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
								<i className="fas fa-bolt"></i>
								<span style={{ color: `#ff9500 ` }}>
									{t("home.hero.title")}
								</span>{" "}
							</h1>
							<h3 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
								{t("home.hero.subtitle")}
							</h3>
							<p>{t("home.hero.learn_line")}</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<MyButton
									bgColor="#ff9500"
                  textColor="text-white"
									onClick={() => {
										document
											.getElementById("CoursesSec")
											.scrollIntoView({ behavior: "smooth", block: "center",  });
									}}
								>
									{t("home.hero.cta_explore")}
								</MyButton>
								<MyButton
									 className=" btn-primary w-auto w-full focus:outline-none focus:ring-0"
									onClick={() => {
										document
											.getElementById("PriceSec")
											.scrollIntoView({ behavior: "smooth", block: "center",});
									}}
								>
									{t("home.hero.cta_view_pricing")}
								</MyButton>
							</div>
						</div>
					</div>
					<div
						aria-hidden="true"
						className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					>
						<div
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
							className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
						/>
					</div>
				</div>
			</div>

			{/* companies logo section  */}
			<div className="bg-gray-50 p-6 rounded-lg flex justify-center">
				<div className="bg-gray-50 p-6 rounded-lg flex justify-center">
					<div
						className="
        flex flex-wrap items-center justify-center 
        md:justify-between 
        w-full max-w-5xl 
        divide-y md:divide-y-0 md:divide-x divide-gray-200 
        text-gray-700 font-medium text-center
      "
					>
						<div className="px-6 py-3 w-1/2 md:w-auto cursor-pointer hover:text-orange-500 transition">
							{t("home.companies.zapier")}
						</div>

						<div className="px-6 py-3 w-1/2 md:w-auto flex items-center justify-center gap-2 cursor-pointer hover:text-green-500 transition">
							<i className="fab fa-spotify"></i>
							{t("home.companies.spotify")}
						</div>

						<div className="px-6 py-3 w-1/2 md:w-auto flex items-center justify-center gap-2 cursor-pointer hover:text-[#2D8CFF] transition">
							<i className="fas fa-video"></i>
							{t("home.companies.zoom")}
						</div>

						<div className="px-6 py-3 w-1/2 md:w-auto flex items-center justify-center gap-2 cursor-pointer hover:text-yellow-500 transition">
							<i className="fab fa-amazon"></i>
							{t("home.companies.amazon")}
						</div>

						<div className="px-6 py-3 w-1/2 md:w-auto flex items-center justify-center gap-2 cursor-pointer hover:text-red-600 transition">
							<i className="fab fa-adobe"></i>
							{t("home.companies.adobe")}
						</div>

						<div className="px-6 py-3 w-1/2 md:w-auto cursor-pointer hover:text-black transition">
							{t("home.companies.notion")}
						</div>

						<div className="px-6 py-3 w-1/2 md:w-auto flex items中心 justify-center gap-2 cursor-pointer hover:text-red-700 transition">
							<i className="fab fa-netflix"></i>
							{t("home.companies.netflix")}
						</div>
					</div>
				</div>
			</div>

			{/* Video section  */}
			<div className="relative overflow-hidden rounded-lg shadow-lg aspect-video">
				<iframe
					className="w-full h-full"
					src="https://www.youtube.com/embed/ScMzIvxBSi4"
					title={t("home.video.iframe_title")}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>

			{/* Benefits Section */}
			<CardsContainer
				title={<SectionTitle>{t("home.benefits.title")}</SectionTitle>}
				subtitle={
					<SectionSubtitle>{t("home.benefits.subtitle")}</SectionSubtitle>
				}
			>
				<BenefitCard
					num={"01"}
					title={t("home.benefits.items.0.title")}
					text={t("home.benefits.items.0.text")}
					component={
						<i className="fas fa-arrow-up-right-from-square text-orange-500"></i>
					}
				/>
				<BenefitCard
					num={"02"}
					title={t("home.benefits.items.1.title")}
					text={t("home.benefits.items.1.text")}
					component={
						<i className="fas fa-arrow-up-right-from-square text-orange-500"></i>
					}
				/>
				<BenefitCard
					num={"03"}
					title={t("home.benefits.items.2.title")}
					text={t("home.benefits.items.2.text")}
					component={
						<i className="fas fa-arrow-up-right-from-square text-orange-500"></i>
					}
				/>
				<BenefitCard
					num="04"
					title={t("home.benefits.items.3.title")}
					text={t("home.benefits.items.3.text")}
					component={
						<i className="fas fa-arrow-up-right-from-square text-orange-500"></i>
					}
				/>

				<BenefitCard
					num="05"
					title={t("home.benefits.items.4.title")}
					text={t("home.benefits.items.4.text")}
					component={
						<i className="fas fa-arrow-up-right-from-square text-orange-500"></i>
					}
				/>

				<BenefitCard
					num="06"
					title={t("home.benefits.items.5.title")}
					text={t("home.benefits.items.5.text")}
					component={
						<i className="fas fa-arrow-up-right-from-square text-orange-500"></i>
					}
				/>
			</CardsContainer>

			{/* Courses Section */}
			<CardsContainer 
				title={<SectionTitle>{t("home.courses_section.title")}</SectionTitle>}
				subtitle={
					<SectionSubtitle>
						{t("home.courses_section.subtitle")}
					</SectionSubtitle>
				}
			>
				{loading ? (
					<div className="py-8">Loading…</div>
				) : courses.length === 0 ? (
					<p className="text-sm opacity-70">
						{t("common.no_courses") || "No courses yet."}
					</p>
				) : (
					courses.map((c) => (
						<CourseCard
							key={c.id}
							image={c.imageUrl}
							title={c.title}
							description={c.description}
							buttonText={
								t("home.courses_section.cards.0.buttonText") || "View course"
							}
						/>
					))
				)}
			</CardsContainer>

			{/* Testimonial section */}
			<CardsContainer
				title={<SectionTitle>{t("home.testimonials.title")}</SectionTitle>}
				subtitle={
					<SectionSubtitle>{t("home.testimonials.subtitle")}</SectionSubtitle>
				}
			>
				{testimonials.map((item, idx) => (
					<TestimonialCard
						key={idx}
						text={t(`home.testimonials.items.${idx}.text`)}
						image={item.image}
						name={item.name}
					/>
				))}
			</CardsContainer>

			{/* price section  */}
			<div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="max-w-7xl mx-auto text-center mb-8">
					<SectionTitle>{t("home.pricing.title")}</SectionTitle>
					<SectionSubtitle>{t("home.pricing.subtitle")}</SectionSubtitle>
				</div>

				<div className="flex justify-center mb-12">
					<div className="bg-gray-100 p-1 rounded-lg flex gap-2">
						<button
							onClick={() => dispatch(togglePlan("monthly"))}
							className={`px-6 py-2 rounded-md font-medium transition ${
								planType === "monthly"
									? "bg-orange-500 text-white"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							{t("home.pricing.toggle.monthly")}
						</button>
						<button
							onClick={() => dispatch(togglePlan("yearly"))}
							className={`px-6 py-2 rounded-md font-medium transition ${
								planType === "yearly"
									? "bg-orange-500 text-white"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							{t("home.pricing.toggle.yearly")}
						</button>
					</div>
				</div>

				<div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">
					<PricingCard
						title={t("home.pricing.plans.free")}
						price={prices.free}
						features={mappedFreeFeatures}
					/>
					<PricingCard
						title={t("home.pricing.plans.pro")}
						price={prices.pro}
						features={mappedProFeatures}
						isPro
					/>
				</div>
			</div>
		</>
	);
}

export default Home;