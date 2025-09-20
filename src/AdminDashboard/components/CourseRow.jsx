// CourseRow.jsx
import { doc, deleteDoc } from 'firebase/firestore'; 
import { db } from '../../lib/firebase'; 
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;

//  Function for Delete
function CourseRow({ course, onDelete }) {
    const { t } = useTranslation();

    //  Function for Delete
    const handleDelete = async () => {
        // Display a confirmation dialog for deletion
        if (window.confirm(t('courseRow.confirmDelete', { title: course.title }))) {
            try {
                const courseDocRef = doc(db, 'courses', course.id);
                // delete the document from Firestore
                await deleteDoc(courseDocRef);
                // Call the onDelete function
                onDelete(course.id);
            } catch (error) {
                console.error("Error removing document: ", error);
            }
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-4">
                <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-24 h-14 object-cover rounded-md"
                />
            </td>
            <td className="p-4 text-gray-800 text-center">{course.title}</td>
            <td className="p-4 text-gray-500 text-center">{course.price} $</td>
            <td className="p-4 text-gray-500 max-w-sm text-center">{course.description} $</td>
            <td className="p-4 flex items-center space-x-4">
                <Link to={`/edit-course/${course.id}`} className="text-gray-500 hover:text-orange-500">
                    <EditIcon />
                </Link>
                {/* onClick for Delete */}
                <button onClick={handleDelete} className="text-gray-500 hover:text-red-500">
                    <DeleteIcon />
                </button>
            </td>
        </tr>
    );
}

export default CourseRow;
