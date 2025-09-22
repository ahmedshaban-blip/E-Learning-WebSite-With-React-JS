import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { useTranslation } from "react-i18next";
function Header() {
	const { t } = useTranslation();
	return (
		<header className="bg-white p-6 border-b border-gray-200">
			<div className="flex justify-between items-center">
				{/* Page Title */}
				<h1 className="text-2xl font-bold text-gray-800">
					{t("header.title")}
				</h1>

				{/*Add New Course */}

				<Link to="/add-course">
					<PrimaryButton>{t("header.addNew")}</PrimaryButton>
				</Link>
			</div>
		</header>
	);
}

export default Header;
