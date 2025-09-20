import React from "react";
import Nav from "./Navbar/Nav";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import LoginPromptModal from "./Component/LoginPromptModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function Layout() {
	  const mode = useSelector((state) => state.theme.mode);
	    useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

	return (
		<div  className={mode === "dark" ? "dark" : "light"}>
			<Nav />
			<Outlet></Outlet>
			{/* others component */}
			<LoginPromptModal />
			<Footer />
		</div>
	);
}
