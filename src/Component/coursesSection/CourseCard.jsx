import MyButton from "../MyButton";
import { Link } from "react-router-dom";

export default function CourseCard({
	image,
	duration,
	level,
	instructor,
	title,
	description,
	buttonText,
}) {
	return (
		<div id="CoursesSec" className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition">
			{image ? (
				<img
					src={image}
					alt={title || "Course"}
					className="w-full h-48 object-cover"
				/>
			) : null}

			<div className="p-6 flex flex-col gap-4">
				{(duration || level || instructor) && (
					<div className="flex items-center justify-between text-sm text-gray-600">
						<div className="flex gap-2">
							{duration && (
								<span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
									{duration}
								</span>
							)}
							{level && (
								<span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
									{level}
								</span>
							)}
						</div>
						{instructor && <span className="font-medium">By {instructor}</span>}
					</div>
				)}

				{title && (
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				)}
				{description && (
					<p className="mt-2 text-gray-600 text-sm">{description}</p>
				)}

				{buttonText && (
					<Link to="/courses" className="inline-block">
						<MyButton bgColor="#E4E4E7" textColor="text-gray-800">
							{buttonText}
						</MyButton>
					</Link>
				)}
			</div>
		</div>
	);
}
