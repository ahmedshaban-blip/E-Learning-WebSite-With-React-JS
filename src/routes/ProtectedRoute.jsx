// src/routes/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
	const { user } = useAuth();
	const location = useLocation();

	useEffect(() => {
		if (!user) {
			sessionStorage.setItem("authModalOpen", "1");
			sessionStorage.setItem("lastProtectedPath", location.pathname);
			window.dispatchEvent(new CustomEvent("showLoginModal"));
		}
	}, [user, location.pathname]);

	if (!user) return null;
	return children;
}
