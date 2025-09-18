export default function CardsContainer({ title, subtitle, children }) {
	return (
		<div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto text-center mb-12">
				{title}
				{subtitle && <div className="mt-4">{subtitle}</div>}
			</div>

			<div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{children}
			</div>
		</div>
	);
}
