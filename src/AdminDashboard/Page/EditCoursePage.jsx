
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditCoursePage() {
  const { courseId } = useParams(); //to get course id from url
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  // to fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseDocRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(courseDocRef);

        if (docSnap.exists()) {
          setCourseData(docSnap.data());
        } else {
          setMessage("Course not found.");
        }
      } catch (error) {
        setMessage("Error fetching course data.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]); //work when courseId changes

  // function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevData => ({ ...prevData, [name]: value }));
  };

  // function to update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const courseDocRef = doc(db, 'courses', courseId);
      await updateDoc(courseDocRef, {
        title: courseData.title,
        description: courseData.description,
        price: Number(courseData.price),
        playlistId: courseData.playlistId,
        category: courseData.category

      });
      setMessage("Course updated successfully.");
      setTimeout(() => navigate('/AdminPage'), 2000);
    } catch (error) {
      setMessage("Error updating course.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!courseData) {
    return <div className="text-center p-10">{message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="mb-6 grid grid-cols-3 items-center">
          <div /> {/* left empty to balance */}
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Edit Course
          </h1>
          <Link to="/AdminPage" className="text-sm text-gray-500 hover:text-orange-500 justify-self-end">
            <button className='bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors'>Back To Dashboard</button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/*Course name*/}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2 text-left">Course Name </label>
            <input
              type="text"
              id="title"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="playlistId" className="block text-gray-700 font-medium mb-2 text-left">Playlist ID </label>
            <input
              type="text"
              id="playlistId"
              name="playlistId"
              value={courseData.playlistId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {/* description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2 text-left">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={courseData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2 text-left">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
           {/* Add Dropdown for Category  */}
          <div className="mb-4">
  <label htmlFor="category" className="block text-gray-700 font-medium mb-2 text-left">
    Category
  </label>
  <select
    id="category"
    name="category"                       
    value={courseData.category ?? ''}       
    onChange={handleInputChange}           
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
    required
  >
    <option value="" disabled>Choose a category</option>
    <option value="Programming">Programming</option>
    <option value="Graphic Design">Graphic Design</option>
    <option value="Social Media">Social Media</option>
    <option value="Marketing">Marketing</option>
    <option value="Ui/UX">Ui/UX</option>
  </select>
</div>

          {/* Save Button */}
          <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600">
            {isLoading ? 'Saving ...' : 'Saving Changes'}
          </button>
          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditCoursePage;
