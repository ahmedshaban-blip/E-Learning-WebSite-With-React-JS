import React, { useEffect, useState } from "react";
import MyButton from "../Component/MyButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

export default function Nav() {
	const { user, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { t, i18n } = useTranslation();
	const userName = user?.displayName || user?.email;

	useEffect(() => {
		document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
	}, [i18n.language]);

	const toggleLang = () => {
		const newLanguage = i18n.language === "en" ? "ar" : "en";
		i18n.changeLanguage(newLanguage);
		document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
	};

	const dispatch = useDispatch();
	const mode = useSelector((state) => state.theme.mode);

	return (
		<>
			{/* Promo Bar */}
			<p className="m-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-2 text-sm tracking-wide">
				{t("nav.promo.beforeStar")}{" "}
				<i className="fa-solid fa-star text-yellow-300 mx-1 drop-shadow-[0_0_2px_rgba(0,0,0,0.2)]"></i>{" "}
				{t("nav.promo.afterStar")}
			</p>

			{/* Navbar */}
			<nav className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200/60 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
				<div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						{/* Hamburger: phones only (< md) */}
						<div className="absolute inset-y-0 nav-start flex items-center md:hidden">
							<button
								type="button"
								onClick={() => setIsMenuOpen((s) => !s)}
								className="inline-flex items-center justify-center rounded-xl p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/60 transition"
								aria-controls="mobile-menu"
								aria-expanded={isMenuOpen}
							>
								<span className="sr-only">{t("nav.openMenu")}</span>
								<svg
									className={`size-6 ${isMenuOpen ? "hidden" : "block"}`}
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

						{/* Brand + Links */}
						<div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start min-w-0">
							{/* Logo */}
							<div className="flex shrink-0 items-center">
								<img
									src="/images/logo.png"
									alt={t("nav.logoAlt")}
									className="h-9 w-auto rounded-md shadow-sm ring-1 ring-gray-200/70"
								/>
							</div>

							{/* Links: hidden on phones; scrollable row from md; wider gaps on lg */}
							<div className="hidden md:block md:ml-4 lg:ml-6 md:min-w-0">
								<div className="flex items-center gap-2 lg:gap-3 overflow-x-auto no-scrollbar md:py-1">
									<Link
										to="/"
										className="rounded-full px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
									>
										{t("nav.menu.home")}
									</Link>
									<Link
										to="/courses"
										className="rounded-full px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
									>
										{t("nav.menu.courses")}
									</Link>
									{user && (
										<Link
											to="/my-courses"
											className="rounded-full px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
										>
											{t("nav.menu.myCourses")}
										</Link>
									)}
									<Link
										to="/about"
										className="rounded-full px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
									>
										{t("nav.menu.about")}
									</Link>
									<Link
										to="/contact"
										className="rounded-full px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
									>
										{t("nav.menu.contact")}
									</Link>
									<Link
										to="/wishlist"
										className="rounded-full px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
									>
										{t("nav.menu.wishlist")}
									</Link>
								</div>
							</div>
						</div>

						{/* Right controls: show from md */}
						<div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 md:static md:inset-auto md:ml-4 lg:ml-6 md:pr-0">
							{/* Language */}
							<div className="hidden md:block">
								<button
									onClick={toggleLang}
									className="rounded-full bg-orange-500 px-3 py-1.5 text-white text-[13px] lg:text-sm font-semibold shadow hover:bg-orange-600 active:scale-[0.98] transition focus:outline-none focus:ring-2 focus:ring-orange-500/50"
								>
									{i18n.language === "en"
										? t("nav.language.short.ar")
										: t("nav.language.short.en")}
								</button>
							</div>

							{/* Theme toggle */}
							<button
								onClick={() => dispatch(toggleTheme())}
								className="rounded-full bg-gray-900 text-white px-3 py-1.5 text-[13px] lg:text-sm shadow hover:bg-black active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-gray-900/30"
								aria-label="Toggle theme"
								title="Toggle theme"
							>
								{mode === "dark" ? "🌞" : "🌙"}
							</button>

							{/* Auth */}
							<div className="hidden md:flex items-center ml-2">
								{!user ? (
									<div className="flex items-center gap-2 lg:gap-4">
										<Link to="register">
											<MyButton className="btn-primary w-full shadow-sm hover:shadow active:scale-[0.99] text-[13px] lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2">
												{t("nav.auth.signup")}
											</MyButton>
										</Link>
										<Link to="login">
											<MyButton
												bgColor="#ff9500"
												textColor="text-white"
												className="btn-primary w-full shadow-sm hover:shadow active:scale-[0.99] text-[13px] lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2"
											>
												{t("nav.auth.login")}
											</MyButton>
										</Link>
									</div>
								) : (
									<>
										<span
											id="userNameNav"
											className="mr-3 text-[13px] lg:text-sm text-gray-800 max-w-[160px] truncate"
										>
											{t("nav.auth.welcome", { name: userName })}
										</span>
										<div className="ml-2">
											<Link to="/">
												<MyButton
													bgColor="#ff9500"
													textColor="text-white"
													className="text-[13px] lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2"
													onClick={logout}
												>
													{t("nav.auth.logout")}
												</MyButton>
											</Link>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Mobile menu: phones only (< md) */}
				<div
					className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
					id="mobile-menu"
				>
					<div className="px-3 pt-3 pb-6">
						<div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200/70 overflow-hidden">
							<div className="space-y-1 p-2">
								<Link
									to="/"
									className="block rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition"
								>
									{t("nav.menu.home")}
								</Link>
								<Link
									to="/courses"
									className="block rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition"
								>
									{t("nav.menu.courses")}
								</Link>
								{user && (
									<Link
										to="/my-courses"
										className="block rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition"
									>
										{t("nav.menu.myCourses")}
									</Link>
								)}
								<Link
									to="/about"
									className="block rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition"
								>
									{t("nav.menu.about")}
								</Link>
								<Link
									to="/contact"
									className="block rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition"
								>
									{t("nav.menu.contact")}
								</Link>
								<Link
									to="/wishlist"
									className="block rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition"
								>
									{t("nav.menu.wishlist")}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
