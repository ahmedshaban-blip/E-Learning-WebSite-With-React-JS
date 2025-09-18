import MyButton from "../MyButton";
import { useTranslation } from "react-i18next";

export default function CourseCard({
        image,
        duration,
        level,
        instructor,
        title,
        description,
        buttonText,
}) {
        const { t } = useTranslation();

        return (
                <div
                        id="CoursesSec"
			className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition"
		>
			<img src={image} alt={title} className="w-full h-48 object-cover" />

			<div className="p-6 flex flex-col gap-4">
				<div className="flex items-center justify-between text-sm text-gray-600">
					<div className="flex gap-2">
						<span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
							{duration} {/* Duration which will come from DB ان شاء المولي */}
						</span>
                                                <span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                                                        {level} {/*   Level لو موجودة  */}
                                                </span>
                                        </div>
                                        <span className="font-medium">{t("courses.by", { name: instructor })}</span>
                                        {/* Instructor */}
                                </div>

				{/* Title & Description */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					<p className="mt-2 text-gray-600 text-sm">{description}</p>
				</div>

				<MyButton bgColor="#E4E4E7" textColor="text-gray-800">
					{buttonText}
				</MyButton>
			</div>
		</div>
	);
}
