// AdminPage.jsx
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CoursesTable from "../components/CoursesTable";

function AdminPage() {
	return (
		<div className="min-h-dvh bg-gray-50 flex flex-col lg:flex-row">
			<aside className="w-full lg:w-72 xl:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
				<Sidebar />
			</aside>

			<main className="flex-1 flex flex-col min-w-0">
				<div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
					<Header />
				</div>

				<div className="flex-1 overflow-x-auto">
					<div className="px-4 sm:px-6 lg:px-8 py-4">
						<CoursesTable />
					</div>
				</div>
			</main>

			<div className="pb-[env(safe-area-inset-bottom)]" />
		</div>
	);
}

export default AdminPage;
