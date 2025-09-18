import React from "react";

function Pagination({ currentPage, totalPages, onPageChange, size = "sm" }) {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	const baseClasses =
		size === "sm" ? "px-3 h-8 text-sm" : "px-4 h-10 text-base";

	return (
		<nav aria-label="Page navigation">
			<ul
				className={`flex items-center -space-x-px ${
					size === "sm" ? "h-8" : "h-10"
				}`}
			>
				{/* Previous Button */}
				<li>
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={`flex items-center justify-center ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 ${baseClasses}`}
					>
						<span className="sr-only">Previous</span>
						<svg
							className={`rtl:rotate-180 ${
								size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"
							}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
					</button>
				</li>

				{/* Page Numbers */}
				{pageNumbers.map((page) => (
					<li key={page}>
						<button
							onClick={() => onPageChange(page)}
							className={`flex items-center justify-center leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${baseClasses} ${
								currentPage === page
									? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
									: "text-gray-500 bg-white"
							}`}
						>
							{page}
						</button>
					</li>
				))}

				{/* Next Button */}
				<li>
					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={`flex items-center justify-center leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 ${baseClasses}`}
					>
						<span className="sr-only">Next</span>
						<svg
							className={`rtl:rotate-180 ${
								size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"
							}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
					</button>
				</li>
			</ul>
		</nav>
	);
}

export default Pagination;
