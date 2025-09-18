

import React, { useEffect, useState } from "react";
import { getCurrentUser, getUserEnrolledCourses } from "../lib/firebase";
import { getCoursesFromLocal, setCoursesToLocal } from "../lib/localStorage";

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user and courses when page loads
    useEffect(() => {
        (async () => {
            try {
                // Get current user
                const user = getCurrentUser();

                //If logged in, fetch from Firestore
                if (user?.uid) {
                    const remote = await getUserEnrolledCourses(user.uid);
                    // Also get local courses (in case of guest checkout)
                    const local = getCoursesFromLocal(user.uid);

                    // Merge unique courses by courseId
                    const map = new Map();
                    [...remote, ...local].forEach((c) => map.set(c.courseId, c));
                    const merged = Array.from(map.values());

                    //  Save merged list to local storage
                    setCoursesToLocal(user.uid, merged);
                    // Update state
                    setCourses(merged);
                } else {
                    // Guest user → load from guest localStorage
                    const guestCourses = getCoursesFromLocal("guest");
                    setCourses(guestCourses);
                }
            } finally {
                // Stop loading
                setLoading(false);
            }
        })();
    }, []);

    // Show while loading
    if (loading) {
        return <div className="p-6">Loading your courses…</div>;
    }

    // Show if no courses
    if (!courses.length) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">My Courses</h1>
                <p className="text-gray-600">No enrolled courses yet.</p>
            </div>
        );
    }

    // Show courses in grid
    return (
        <div className="p-6">
            {/* Page title */}
            <h1 className="text-2xl font-bold mb-6">My Courses</h1>
            {/* Course grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((c) => (
                    // Single course card
                    <div
                        key={c.courseId}
                        className="flex flex-col bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Course image */}
                        <div className="w-full h-48 bg-gray-100">
                            <img
                                src={c.imageUrl}
                                alt={c.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {/*  Course content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h2>
                            <p className="text-sm text-gray-600 mb-3">${c.price}</p>
                            <p className="text-xs text-gray-500 mt-auto">
                                Enrolled on: {new Date(c.enrolledAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
