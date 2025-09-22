// CourseRow.jsx
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;

function CourseRow({ course, onDelete }) {
	const { t } = useTranslation();

	const handleDelete = async () => {
		try {
			const courseDocRef = doc(db, "courses", course.id);
			await deleteDoc(courseDocRef);
			onDelete(course.id);
		} catch (error) {
			console.error("Error removing document: ", error);
		}
	};

	return (
		<tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
			{/* Image */}
			<td className="px-2 sm:px-4 py-3 text-center align-middle">
				<img
					src={course.imageUrl}
					alt={course.title}
					className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-md inline-block"
					loading="lazy"
					onError={(e) => (e.currentTarget.style.visibility = "hidden")}
				/>
			</td>

			{/* Title */}
			<td className="px-2 sm:px-4 py-3 text-gray-800 font-semibold text-center align-middle truncate max-w-[180px] sm:max-w-none">
				{course.title}
			</td>

			{/* Price */}
			<td className="px-2 sm:px-4 py-3 text-center align-middle whitespace-nowrap text-gray-700 font-medium">
				{course.price} $
			</td>

			{/* Description (hidden on small screens) */}
			<td className="px-2 sm:px-4 py-3 text-gray-600 text-center align-middle hidden lg:table-cell max-w-[420px] truncate">
				{course.description}
			</td>

			{/* Actions */}
			<td className="px-2 sm:px-4 py-3 text-center align-middle whitespace-nowrap">
				<div className="inline-flex flex-wrap items-center justify-center gap-2">
					<Link
						to={`/edit-course/${course.id}`}
						className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-orange-500 hover:border-orange-200 hover:shadow-sm transition"
						title={t("coursesTable.actions.edit")}
					>
						<EditIcon />
					</Link>

					<button
						onClick={handleDelete}
						className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-red-500 hover:border-red-200 hover:shadow-sm transition"
						title={t("coursesTable.actions.delete")}
						type="button"
					>
						<DeleteIcon />
					</button>
				</div>
			</td>
		</tr>
	);
}

export default CourseRow;
