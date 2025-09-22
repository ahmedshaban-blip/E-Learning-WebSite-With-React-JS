import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Registration from "./regisrtaion/Registration";
import NotFound from "./NotFound/NotFound";
import Login from "./login/Login";
import Home from "./pages/Home";
import AdminPage from "./AdminDashboard/Page/AdminPage";
import AddCoursePage from "./AdminDashboard/Page/AddCoursePage";
import EditCoursePage from "./AdminDashboard/Page/EditCoursePage";
import CourseDetails from "./Courses/CourseDetails";
import AllCourses from "./Courses/courses";
import PayPalCheckout from "./pages/PayPalCheckout";
import MyCourses from "./Courses/MyCourses";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Wishlist from "./pages/Wishlist";
import store from "./redux/store";
import { Provider } from "react-redux";
function App() {
	let router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "register", element: <Registration /> },
				{ path: "login", element: <Login /> },
				{
					path: "contact",
					element: <ContactUs />,
				},
				{ path: "AdminPage", element: <AdminPage /> },
				{ path: "add-course", element: <AddCoursePage /> },
				{ path: "edit-course/:courseId", element: <EditCoursePage /> },
				{ path: "courses/:id", element: <CourseDetails /> },

				{
					path: "checkout",
					element: (
						<ProtectedRoute>
							<PayPalCheckout />
						</ProtectedRoute>
					),
				},
				{
					path: "my-courses",
					element: (
						<ProtectedRoute>
							<MyCourses />
						</ProtectedRoute>
					),
				},
				{
					path: "wishlist",
					element: (
						<ProtectedRoute>
							<Wishlist />
						</ProtectedRoute>
					),
				},
				// ----------------------------------------------
				{ path: "Courses", element: <AllCourses /> },
				{ path: "about", element: <AboutUs /> },
				{ path: "*", element: <NotFound /> },
			],
		},
	]);

	return (
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router}></RouterProvider>
			</AuthProvider>
		</Provider>
	);
}

export default App;
