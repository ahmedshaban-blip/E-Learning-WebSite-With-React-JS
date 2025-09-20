import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	removeFromWishlist,
	setFavorites,
} from "../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserFavCourses, getAllData } from "../lib/firebase";
import { useTranslation } from 'react-i18next';

function Wishlist() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { user } = useAuth();

	const { items: wishlistIds } = useSelector((s) => s.wishlist);

	useEffect(() => {
		(async () => {
			if (!user?.uid) return;
			const ids = await getUserFavCourses(user.uid);
			dispatch(setFavorites(ids));
		})();
	}, [user?.uid, dispatch]);

	const [allCourses, setAllCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let cancel = false;
		(async () => {
			try {
				const data = await getAllData("courses");
				if (!cancel) setAllCourses(data || []);
			} finally {
				if (!cancel) setLoading(false);
			}
		})();
		return () => {
			cancel = true;
		};
	}, []);

	// فلترة حسب IDs
	const favCourses = useMemo(() => {
		const setIds = new Set(wishlistIds);
		return (allCourses || []).filter((c) => setIds.has(c.id));
	}, [allCourses, wishlistIds]);

	if (loading) return <div className="p-6 text-center">Loading…</div>;

	if (!favCourses.length) {
		return (
			<div className="text-center p-10">
				<h1 className="text-3xl font-bold mb-4">{t("wishlist.empty.title")}</h1>
				<p className="text-gray-600 mb-6">
					{t("wishlist.empty.subtitle")}
				</p>
				<Link
					to="/courses"
					className="w-full rounded-lg bg-white px-6 py-2 text-center font-bold text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white"
				>
					{t("wishlist.empty.cta")}
				</Link>
			</div>
		);
	}

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6 border-b pb-4">{t("wishlist.title")}</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{favCourses.map((course) => (
					<div
						key={course.id}
						className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
					>
						<img
							src={course.imageUrl}
							alt={course.title}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4 flex flex-col flex-grow">
							<h2 className="text-lg font-bold mb-2 flex-grow">
								{course.title}
							</h2>
							<p className="text-xl font-bold text-orange-500 mb-4">
								{typeof course.price === "number" ? `${t("wishlist.price.currencySymbol")} ${course.price}` : "$"}
							</p>
							<button
								onClick={() => dispatch(removeFromWishlist(course.id))}
								className="w-full rounded-lg bg-white px-6 py-2 text-center font-bold text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white"
							>
								{t("wishlist.card.remove")}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Wishlist;
