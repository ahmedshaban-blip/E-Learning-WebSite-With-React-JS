import React from "react";
import Nav from "./Navbar/Nav";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import LoginPromptModal from "./Component/LoginPromptModal";

export default function Layout() {
	return (
		<>
			<Nav />
			<Outlet></Outlet>
			{/* others component */}
			<LoginPromptModal />
			<Footer />
		</>
	);
}
