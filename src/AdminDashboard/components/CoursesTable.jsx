// CoursesTable.jsx
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { 
  collection, 
  getDocs, 
  orderBy, 
  query, 
  where,
  doc, 
  getDoc 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import CourseRow from './CourseRow';

function CoursesTable() {
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
        const coursesCollection = collection(db, 'courses');
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
        const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
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
    setCourses(currentCourses => currentCourses.filter(course => course.id !== idToDelete));
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="bg-white m-6 p-6 rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-4 text-sm font-bold text-gray-600 text-center"> Image </th>
            <th className="p-4 text-sm font-bold text-gray-600 text-center"> Course Name </th>
            <th className="p-4 text-sm font-bold text-gray-600 text-center">Price</th>
            <th className="p-4 text-sm font-bold text-gray-600 text-center">Description</th>
            <th className="p-4 text-sm font-bold text-gray-600 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
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
                Don't have any course yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesTable;
