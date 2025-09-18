import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";

import { getAllData } from "../lib/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../Component/MyButton";
import Pagination from "../Component/pagination";

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 5;

    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    useEffect(() => {
        async function loadCourses() {
            const data = await getAllData("courses");
            setCourses(data);
        }
        loadCourses();
    }, []);

    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    const handleEnroll = (course) => {
        navigate("/checkout", { state: { course } });
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCourses.map((course) => {
                    const isSaved = wishlistItems.some((item) => item.id === course.id);

                    const handleToggleWishlist = () => {
                        if (isSaved) {
                            dispatch(removeFromWishlist(course.id));
                        } else {
                            dispatch(addToWishlist(course));
                        }
                    };

                    return (
                        <div
                            key={course.id}
                            className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative"
                        >
                            <div
                                onClick={handleToggleWishlist}
                                className="absolute top-4 right-4 cursor-pointer text-2xl z-10"
                            >
                                <i
                                    className={
                                        isSaved
                                            ? "fas fa-heart text-red-500" 
                                            : "far fa-heart text-gray-700" 
                                    }
                                ></i>
                            </div>

                            {/* Image */}
                            <div className="w-full h-48 bg-gray-100">
                                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-contain" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-5">
                                <h2 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h2>
                                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{course.description}</p>
                                
                                {/* Footer */}
                                <div className="pt-3 border-t mt-auto">
                                    <div className="mt-4 flex justify-center items-center gap-16">
                                        <p className="text-lg font-bold text-gray-900 mb-2">Price:</p>
                                        <span className="text-2xl font-bold text-orange-500">${course.price}</span>
                                    </div>
									<div className="flex gap-3 mt-4">
										
										<Link
											to={`/courses/${course.id}`}
											className="block w-full rounded bg-[#ff9500] px-4 py-2 text-center font-bold text-white hover:brightness-110 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
										>
											Show content
										</Link>
                                       
                                        <MyButton bgColor="#ff9500" onClick={() => handleEnroll(course)}>
                                            Enroll
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
}

export default AllCourses;