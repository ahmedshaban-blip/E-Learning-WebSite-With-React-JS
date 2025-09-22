import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPromptModal() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		const shouldOpen =
			Boolean(location.state?.showLoginModal) ||
			sessionStorage.getItem("authModalOpen") === "1";

		if (!user && shouldOpen) setOpen(true);
	}, [location.state, user]);

	useEffect(() => {
		const handler = () => setOpen(true);
		window.addEventListener("showLoginModal", handler);
		return () => window.removeEventListener("showLoginModal", handler);
	}, []);

	useEffect(() => {
		if (user && open) {
			setOpen(false);
			sessionStorage.removeItem("authModalOpen");
			sessionStorage.removeItem("lastProtectedPath");
		}
	}, [user, open]);

	const closeAndClear = () => {
		setOpen(false);
		sessionStorage.removeItem("authModalOpen");
		sessionStorage.removeItem("lastProtectedPath");
	};

	const onCancel = () => {
		closeAndClear();
		// navigate("/");
	};

	const onGoLogin = () => {
		setOpen(false);

		const from =
			sessionStorage.getItem("lastProtectedPath") || location.pathname || "/";
		navigate("/login", { state: { from } });
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[1000] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onCancel} />
			<div className="relative w-[92%] max-w-md rounded-xl bg-white p-6 shadow-xl">
				<h3 className="text-lg font-semibold mb-2">Login required</h3>
				<p className="text-sm text-gray-600 mb-5">
					You need to be logged in to continue.
				</p>
				<div className="flex items-center gap-3">
					<button
						onClick={onGoLogin}
						className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-[#ff9500] text-white"
					>
						Go to login
					</button>
					<button
						onClick={onCancel}
						className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-gray-200 text-gray-800"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
