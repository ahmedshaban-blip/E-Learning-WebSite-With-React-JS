
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; 
import { db } from '../../lib/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
function AddCoursePage() {
  const user = getAuth().currentUser;
  const [title, setTitle] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');
  // To display message to user after submit
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // To navigate to another page
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Validate file type
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation form
    if (!title|| !playlistId || !description || !price || !imageFile) {
      setMessage('Please fill all required fields.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // 1.upload image to Supabase
      const filePath = `public/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('images') 
        .upload(filePath, imageFile);

      if (uploadError) {
        throw uploadError; 
      }

      // 2. Get public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('images') 
        .getPublicUrl(filePath);

      // 3. Save course data to Firestore
      await addDoc(collection(db, "courses"), {
        ownerUid: user.uid,         
        ownerEmail: user.email ?? null,
        title: title,
        playlistId: playlistId,
        description: description,
        price: Number(price), 
        imageUrl: publicUrl, 
        createdAt: new Date(),
        category: category  
      });

      setMessage('Course added successfully!');
      setIsLoading(false);
      
      // After 2 seconds, navigate to AdminPage
      setTimeout(() => {
        navigate('/AdminPage');
      }, 2000);

    } catch (error) {
      console.error("Error:", error.message);
      setMessage(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        
       <div className="mb-6 grid grid-cols-3 items-center">
  <div /> {/* left empty to balance */}
  <h1 className="text-2xl font-bold text-gray-800 text-center">
    Add New Course
  </h1>
  <Link to="/AdminPage" className="text-xs text-gray-500 justify-self-end">
    <button className=' bg-white text-orange-500 font- py-2 px-4 rounded-lg hover:bg-rose-950 hover:text-cyan-500 transition-colors '>Back To Dashboard</button>
  </Link>
</div>


        <form onSubmit={handleSubmit}>
          {/*title*/}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2 text-left">Course Title </label>
            <input 
              type="text" 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
            />
          </div>
            {/*PlaylistId*/}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2 text-left"> Playlist ID </label>
            <input 
              type="text" 
              id="playlistId"
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
            />
          </div>

          {/*Description*/}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2 text-left">Description</label>
            <textarea 
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2 text-left">Price ($)</label>
            <input 
              type="number" 
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" 
            />
          </div>


          {/* Add Dropdown for Category  */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2 text-left">Category</label>
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
                <option value="" disabled>Choose a category</option>
              <option value="Programming">Programming</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Social Media">Social Media</option>
              <option value="Marketing">Marketing</option>
              <option value="Ui/UX">Ui/UX</option>
            </select>
          </div>

          {/* Image */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2 text-left"> Cover Image </label>
            <input 
              type="file" 
              id="image"
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
          </div>
          
          {/* Save Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Saving ...' : 'Add Course'}
          </button>
          
          {/* Show message*/}
          {message && <p className={`mt-4 text-center text-sm ${message.includes('خطأ') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddCoursePage;