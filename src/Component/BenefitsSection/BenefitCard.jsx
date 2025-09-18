export default function BenefitCard({ num, title, text, component }) {
	return (
		<div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
			<div className="flex justify-end">
				<span className="text-4xl font-bold text-gray-900">{num}</span>
			</div>

			<div className="mt-4">
				<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
				<p className="mt-2 text-gray-600">{text}</p>
			</div>

			{component && (
				<div className="mt-6 flex justify-end">
					<div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 border hover:bg-gray-100 transition">
						{component}
					</div>
				</div>
			)}
		</div>
	);
}
