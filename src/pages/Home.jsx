import MyButton from "../Component/MyButton";
import CardsContainer from "../Component/CardsContainer";
import SectionTitle from "../Component/SectionTitle";
import SectionSubtitle from "../Component/SectionSubtitle";
import BenefitCard from "../Component/BenefitsSection/BenefitCard";
import CourseCard from "../Component/coursesSection/CourseCard";
import TestimonialCard from "../Component/TestimonialSection/TestimonialCard";
import PricingCard from "../Component/PricingSection/PricingCard";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { togglePlan } from "../redux/slices/pricingSlice";
const TESTIMONIAL_ASSETS = [
        {
                key: "doha",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
                key: "ahmed",
                image: "https://randomuser.me/api/portraits/men/46.jpg",
        },
        {
                key: "hoda",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
                key: "abdulrhman",
                image: "https://randomuser.me/api/portraits/men/65.jpg",
        },
];

const PARTNER_ITEMS = [
        { key: "zapier", hoverClass: "hover:text-orange-500" },
        {
                key: "spotify",
                iconClass: "fab fa-spotify",
                hoverClass: "hover:text-green-500",
        },
        {
                key: "zoom",
                iconClass: "fas fa-video",
                hoverClass: "hover:text-[#2D8CFF]",
        },
        {
                key: "amazon",
                iconClass: "fab fa-amazon",
                hoverClass: "hover:text-yellow-500",
        },
        {
                key: "adobe",
                iconClass: "fab fa-adobe",
                hoverClass: "hover:text-red-600",
        },
        { key: "notion", hoverClass: "hover:text-black" },
        {
                key: "netflix",
                iconClass: "fab fa-netflix",
                hoverClass: "hover:text-red-700",
        },
];
function Home() {
        const { t } = useTranslation();
        const { prices, planType } = useSelector((state) => state.pricing);
        const dispatch = useDispatch();
        const partnerLabels = t("partners.items", { returnObjects: true });
        const benefitItems = t("benefits.items", { returnObjects: true });
        const testimonialsContent = TESTIMONIAL_ASSETS.map(({ key, image }) => ({
                key,
                image,
                name: t(`testimonials.items.${key}.name`),
                text: t(`testimonials.items.${key}.text`),
        }));
        const freeFeatures = t("pricing.features.free", { returnObjects: true });
        const proFeatures = t("pricing.features.pro", { returnObjects: true });
        const courseTranslations = t("courses.items", { returnObjects: true });
        const courseButtonText = t("courses.cta");
        return (
                <>
			<div className="bg-white">
				<div className="relative isolate px-6 pt-14 lg:px-8">
					<div className="mx-auto max-w-2xl py-10 sm:py-12 lg:py-15">
                                                <div className="text-center">
                                                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                                                                <i className="fas fa-bolt" aria-hidden="true"></i>{" "}
                                                                <span style={{ color: `#ff9500 ` }}>{t("hero.highlight")}</span>{" "}
                                                                {t("hero.headline")}
                                                        </h1>
                                                        <h3 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                                                                {t("hero.subline")}
                                                        </h3>
                                                        <p>{t("hero.desc")}</p>
                                                        <div className="mt-10 flex items-center justify-center gap-x-6">
                                                                <MyButton
                                                                        bgColor="#ff9500"
                                                                        onClick={() => {
                                                                                document
                                                                                        .getElementById("CoursesSec")
                                                                                        .scrollIntoView({ behavior: "smooth" });
                                                                        }}
                                                                >
                                                                        {t("hero.explore")}
                                                                </MyButton>
                                                                <MyButton
                                                                        bgColor="#E4E4E7"
                                                                        textColor={"text-black-500"}
                                                                        onClick={() => {
                                                                                document
                                                                                        .getElementById("PriceSec")
                                                                                        .scrollIntoView({ behavior: "smooth" });
                                                                        }}
                                                                >
                                                                        {t("hero.pricing")}
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
                                                {PARTNER_ITEMS.map(({ key, iconClass, hoverClass }) => (
                                                        <div
                                                                key={key}
                                                                className={`px-6 py-3 w-1/2 md:w-auto flex items-center justify-center gap-2 cursor-pointer transition ${hoverClass}`}
                                                        >
                                                                {iconClass ? (
                                                                        <i className={iconClass} aria-hidden="true"></i>
                                                                ) : null}
                                                                {partnerLabels?.[key] || ""}
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </div>
			{/* Video section  */}
			<div className="relative overflow-hidden rounded-lg shadow-lg aspect-video">
                                <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/ScMzIvxBSi4"
                                        title={t("video.title")}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>

			{/* Benefits Section */}
                        <CardsContainer
                                title={<SectionTitle>{t("benefits.title")}</SectionTitle>}
                                subtitle={
                                        <SectionSubtitle>
                                                {t("benefits.subtitle")}
                                        </SectionSubtitle>
                                }
                        >
                                {benefitItems.map((benefit) => (
                                        <BenefitCard
                                                key={benefit.num}
                                                num={benefit.num}
                                                title={benefit.title}
                                                text={benefit.text}
                                                component={
                                                        <i
                                                                className="fas fa-arrow-up-right-from-square text-orange-500"
                                                                aria-hidden="true"
                                                        ></i>
                                                }
                                        />
                                ))}
                        </CardsContainer>

			{/* Courses Section */}
                        <CardsContainer
                                title={<SectionTitle>{t("courses.title")}</SectionTitle>}
                                subtitle={
                                        <SectionSubtitle>
                                                {t("courses.subtitle")}
                                        </SectionSubtitle>
                                }
			>
				{/* mock data to be changed  */}
                                <CourseCard
					image="data:image/jpeg;base64,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"
                                        duration={courseTranslations.webDesign.duration}
                                        level={courseTranslations.webDesign.level}
                                        instructor={courseTranslations.webDesign.instructor}
                                        title={courseTranslations.webDesign.title}
                                        description={courseTranslations.webDesign.description}
                                        buttonText={courseButtonText}
				/>

				<CourseCard
					image="data:image/png;base64,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"
                                        duration={courseTranslations.uiux.duration}
                                        level={courseTranslations.uiux.level}
                                        instructor={courseTranslations.uiux.instructor}
                                        title={courseTranslations.uiux.title}
                                        description={courseTranslations.uiux.description}
                                        buttonText={courseButtonText}
					id=""
				/>
			</CardsContainer>

			{/* Testimonial section */}
			<CardsContainer
                                title={<SectionTitle>{t("testimonials.title")}</SectionTitle>}
				subtitle={
                                        <SectionSubtitle>
                                                {t("testimonials.desc")}
                                        </SectionSubtitle>
				}
			>
                                {testimonialsContent.map((item) => (
                                        <TestimonialCard
                                                key={item.key}
						text={item.text}
						image={item.image}
						name={item.name}
					/>
				))}
			</CardsContainer>

			{/* price section  */}

			<div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
                                <div className="max-w-7xl mx-auto text-center mb-8">
                                        <SectionTitle>{t("pricing.title")}</SectionTitle>
                                        <SectionSubtitle>{t("pricing.desc")}</SectionSubtitle>
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
                                                        {t("pricing.monthly")}
                                                </button>
						<button
							onClick={() => dispatch(togglePlan("yearly"))}
							className={`px-6 py-2 rounded-md font-medium transition ${
								planType === "yearly"
									? "bg-orange-500 text-white"
									: "text-gray-600 hover:text-gray-900"
							}`}
                                                >
                                                        {t("pricing.yearly")}
                                                </button>
                                        </div>
                                </div>

                                <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">
                                        <PricingCard
                                                title={t("pricing.free")}
                                                price={prices.free}
                                                features={freeFeatures}
                                        />
                                        <PricingCard
                                                title={t("pricing.pro")}
                                                price={prices.pro}
                                                features={proFeatures}
                                                isPro
					/>
				</div>
			</div>
		</>
	);
}

export default Home;
