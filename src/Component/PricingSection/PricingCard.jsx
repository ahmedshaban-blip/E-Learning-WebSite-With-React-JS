import MyButton from "../MyButton";

export default function PricingCard({ title, price, features }) {
	return (
		<div
			id="PriceSec"
			className="bg-white rounded-xl border shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition"
		>
			<div className="text-center">
				<div className="bg-orange-50 py-2 rounded text-gray-800 font-medium">
					{title}
				</div>

				<h2 className="mt-4 text-4xl font-bold text-gray-900">
					${price}
					<span className="text-lg font-normal text-gray-600">/month</span>
				</h2>
			</div>

			<div className="mt-6">
				<h4 className="font-semibold text-gray-800 mb-4">Available Features</h4>
				<ul className="space-y-3">
					{features.map((item, idx) => (
						<li
							key={idx}
							className={`flex items-center gap-2 text-sm ${
								item.included ? "text-gray-700" : "text-gray-400 line-through"
							}`}
						>
							<span>
								{item.included ? (
									<i className="fas fa-check text-orange-500"></i>
								) : (
									<i className="fas fa-times text-gray-400"></i>
								)}
							</span>
							{item.label}
						</li>
					))}
				</ul>
			</div>

			{/* Button */}
			<div className="mt-6">
				<MyButton bgColor="#ff9500" textColor="text-white">
					Get Started
				</MyButton>
			</div>
		</div>
	);
}
