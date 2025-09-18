import React, { useState } from "react";
import MyButton from "../Component/MyButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
	const { user, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { i18n } = useTranslation();

	const toggleLang = () => {
		i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
	};

	return (
		<>
			<p className="bg-[#ff9500] text-white m-0 p-2 text-center ">
				Free Course <i className="fa-solid fa-star text-yellow-400"></i> Sale
				Ends Soon, Get It Now
			</p>
			<nav className="relative bg-white ">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button
								type="button"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
								aria-controls="mobile-menu"
								aria-expanded={isMenuOpen}
							>
								<span className="sr-only">Open main menu</span>
								<svg
									className={`block size-6 ${isMenuOpen ? "hidden" : "block"}`}
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
								<svg
									className={`size-6 ${isMenuOpen ? "block" : "hidden"}`}
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex shrink-0 items-center">
								<img
									src="/images/logo.png"
									alt="Your Company"
									className="h-8 w-auto rounded-md"
								/>
							</div>
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									<Link
										to="/"
										className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
									>
										Home
									</Link>
									<Link
										to="/courses"
										className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
									>
										Courses
									</Link>
									{user && (
										<Link
											to="/my-courses"
											className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
										>
											My Courses
										</Link>
									)}
									<Link
										to="/about"
										className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
									>
										About Us
									</Link>
									<Link
										to="/pricing"
										className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
									>
										Pricing
									</Link>
									<Link
										to="/contact"
										className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
									>
										Contact
									</Link>
									<Link
										to="/wishlist"
										className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-200 hover:text-black"
									>
										wishlist
									</Link>
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<div className="toggleLanguage hidden sm:block">
								<button
									onClick={toggleLang}
									className="bg-[#ff9500] text-white px-3 py-1 rounded rounded focus:outline-none focus:ring-0 w-full disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{i18n.language === "en" ? "AR" : "EN"}
								</button>
							</div>
							<div className="hidden sm:flex items-center ml-4">
								{!user ? (
									<>
										<Link to="register">
											<MyButton bgColor="#e4e4e7" textColor="text-gray-800">
												sign up
											</MyButton>
										</Link>
										<div className="relative ml-3">
											<Link to="login">
												<MyButton bgColor="#ff9500" textColor="text-white">
													login
												</MyButton>
											</Link>
										</div>
									</>
								) : (
									<>
										<span className="mr-3 text-sm">
											Welcome, {user.displayName || user.email}
										</span>
										<div className="relative ml-3">
											<MyButton
												bgColor="#ff9500"
												textColor="text-white"
												onClick={logout}
											>
												logout
											</MyButton>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div
					className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}
					id="mobile-menu"
				>
					<div className="space-y-1 px-2 pt-2 pb-3">
						<Link
							to="/"
							className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
						>
							Home
						</Link>
						<Link
							to="/Courses"
							className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
						>
							Courses
						</Link>
						
						{user && (
							<Link
								to="/my-courses"
								className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
							>
								My Courses
							</Link>
						)}
						<Link
							to="/about"
							className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
						>
							About Us
						</Link>
						<Link
							to="/pricing"
							className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
						>
							Pricing
						</Link>
						<Link
							to="/contact"
							className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
						>
							Contact
						</Link>
						<hr className="my-4" />
						<div className="px-2">
							<button
								onClick={toggleLang}
								className="w-full bg-[#ff9500] text-white px-3 py-2 my-2 rounded text-base font-medium"
							>
								{i18n.language === "en"
									? "Switch to Arabic"
									: " switch to English"}
							</button>
							{!user ? (
								<>
									<Link to="login">
										<div className="w-full text-center bg-[#ff9500] text-gray-800 px-3 py-2 my-2 rounded text-base font-medium">
											login
										</div>
									</Link>
									<Link to="register">
										<div className="w-full text-center bg-[#e4e4e7] text-gray-800 px-3 py-2 my-2 rounded text-base font-medium">
											sign up
										</div>
									</Link>
								</>
							) : (
								<>
									<p className="text-center mb-2">
										Welcome, {user.displayName || user.email}
									</p>

									
									<button
										onClick={logout}
										className="w-full text-center bg-[#ff9500] text-white px-3 py-2 my-2 rounded text-base font-medium"
									>
										logout
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
