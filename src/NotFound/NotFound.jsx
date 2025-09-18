import React from "react";
import imagError from "../../src/assets/imgError.png";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="text-center p-6">
				<img
					src={imagError}
					alt="Page not found"
					className="block mx-auto mb-4 w-full max-w-xs"
				/>
				<p className="text-2xl font-semibold">
					<span className="text-[#ff9500]">Oops!</span> Page not found.
				</p>
				<p className="mt-2 text-lg text-gray-600">
					The page you’re looking for doesn’t exist or has been moved.
				</p>
				<Link
					to={"/"}
					className="mt-6 inline-block rounded-lg bg-[#ff9500] px-6 py-2 font-bold text-white transition-colors hover:bg-[#e68600] hover:text-white"
				>
					Go to Homepage
				</Link>
			</div>
		</div>
	);
}
