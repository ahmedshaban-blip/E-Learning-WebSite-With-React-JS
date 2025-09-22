// CoursesTable.jsx
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
	collection,
	getDocs,
	orderBy,
	query,
	where,
	doc,
	getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import CourseRow from "./CourseRow";
import { useTranslation } from "react-i18next";

function CoursesTable() {
	const { t } = useTranslation();

	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [role, setRole] = useState(null);
	const [user, setUser] = useState(null);

	// get current user
	useEffect(() => {
		const auth = getAuth();
		const currentUser = auth.currentUser;
		if (!currentUser) {
			console.log(" no user logged in");
			setIsLoading(false);
			return;
		}
		setUser(currentUser);

		const fetchRole = async () => {
			try {
				const userRef = doc(db, "users", currentUser.uid);
				const snap = await getDoc(userRef);
				if (snap.exists()) {
					console.log(" role data:", snap.data());
					setRole(snap.data().role);
				} else {
					console.log(" role data not found");
				}
			} catch (err) {
				console.error("Error fetching role:", err);
			}
		};

		fetchRole();
	}, []);

	// Get courses
	useEffect(() => {
		if (!role || !user) return;

		const fetchCourses = async () => {
			try {
				const coursesCollection = collection(db, "courses");
				let q;

				if (role === "admin") {
					q = query(
						coursesCollection,
						where("ownerUid", "==", user.uid),
						orderBy("createdAt", "desc")
					);
				} else {
					q = query(coursesCollection, orderBy("createdAt", "desc"));
				}

				console.log(" running query with role:", role, " uid:", user.uid);

				const querySnapshot = await getDocs(q);
				const coursesData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				console.log(" courses fetched:", coursesData);
				setCourses(coursesData);
			} catch (error) {
				console.error("Error fetching courses: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCourses();
	}, [role, user]);

	const handleDeleteCourse = (idToDelete) => {
		setCourses((currentCourses) =>
			currentCourses.filter((course) => course.id !== idToDelete)
		);
	};

	if (isLoading) {
		return <div className="text-center p-10">{t("myCourses.loading")}</div>;
	}

	return (
		<div className="bg-white m-0 md:m-6 p-0 md:p-6 rounded-none md:rounded-lg shadow-sm overflow-x-auto -mx-4 sm:mx-0">
			<table
				className="
          w-full table-auto text-left
          min-w-[720px] md:min-w-0  
        "
			>
				<thead className="bg-gray-50">
					<tr className="border-b border-gray-200">
						<th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-600 text-center w-[90px] sm:w-[110px]">
							{t("coursesTable.headers.image")}
						</th>
						<th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-600 text-center">
							{t("coursesTable.headers.courseName")}
						</th>
						<th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-600 text-center whitespace-nowrap w-[110px]">
							{t("coursesTable.headers.price")}
						</th>
						<th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-600 text-center hidden lg:table-cell">
							{t("coursesTable.headers.description")}
						</th>
						<th className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-600 text-center whitespace-nowrap w-[140px] sm:w-[160px]">
							{t("coursesTable.headers.actions")}
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-100">
					{courses.length > 0 ? (
						courses.map((course) => (
							<CourseRow
								key={course.id}
								course={course}
								onDelete={handleDeleteCourse}
							/>
						))
					) : (
						<tr>
							<td colSpan="5" className="text-center p-10 text-gray-500">
								{t("coursesTable.empty")}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default CoursesTable;
