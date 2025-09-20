import MyButton from "../MyButton";

export default function TestimonialCard({ text, image, name }) {
	return (
		<div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
			<p className="text-gray-700 text-sm leading-relaxed">{text}</p>

			<div className="mt-6 flex flex-col items-center justify-between border-t pt-4">
				<div className="flex items-center gap-3">
					<img
						src={image}
						alt={name}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<span className="font-medium text-gray-800">{name}</span>
				</div>

				<MyButton bgColor="#ff9500" textColor="text-gray-800">
					Read Full Story
				</MyButton>
			</div>
		</div>
	);
}
