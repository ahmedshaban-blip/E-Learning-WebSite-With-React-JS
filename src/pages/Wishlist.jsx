import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice'; 
import { Link } from 'react-router-dom';

function Wishlist() {
    // read rudux store
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty </h1>
                <p className="text-gray-600 mb-6">You haven't saved any courses yet. Start exploring!</p>
                <Link
                    to="/courses"
                    className="w-full rounded-lg bg-white px-6 py-2 text-center font-bold text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Browse Courses
                </Link>
            </div>
        );
    }
    //    if there are item in wishlist display them 
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 border-b pb-4">My Wishlist </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                    >
                        <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-bold mb-2 flex-grow">{course.title}</h2>
                            <p className="text-xl font-bold text-orange-500 mb-4">${course.price}</p>
                            <button
                                onClick={() => dispatch(removeFromWishlist(course.id))}
                                className="w-full rounded-lg bg-white px-6 py-2 text-center font-bold text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;