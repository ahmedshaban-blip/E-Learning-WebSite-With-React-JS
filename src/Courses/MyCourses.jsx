

import React, { useEffect, useState } from "react";
import { getCurrentUser, getUserEnrolledCourses } from "../lib/firebase";
import { getCoursesFromLocal, setCoursesToLocal } from "../lib/localStorage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Fetch user and courses when page loads
  useEffect(() => {
    (async () => {
      try {
        const user = getCurrentUser();

        if (user?.uid) {
          const remote = await getUserEnrolledCourses(user.uid);
          const local = getCoursesFromLocal(user.uid);

          // Merge unique courses by courseId
          const map = new Map();
          [...(remote || []), ...(local || [])].forEach((c) => {
            if (c?.courseId) map.set(c.courseId, c);
          });
          const merged = Array.from(map.values());

          // persist and set
          setCoursesToLocal(user.uid, merged);
          setCourses(merged);
        } else {
          const guestCourses = getCoursesFromLocal("guest") || [];
          setCourses(guestCourses);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="h-10 w-40 rounded-xl bg-gray-100 animate-pulse" />
      </div>
    );

  if (!courses.length) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
          {t("myCourses.empty.title")}
        </h1>
        <p className="text-gray-600">{t("myCourses.empty.message")}</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
        {t("myCourses.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {courses.map((c) => {
          const courseId = c.courseId;
          const title = c.title || "Enrolled course";
          const imageUrl = c.imageUrl || "";


          // تاريخ التحاق آمن
          let enrolledLabel = "";
          if (c.enrolledAt) {
            const d = new Date(c.enrolledAt);
            enrolledLabel = isNaN(d.getTime()) ? String(c.enrolledAt) : d.toLocaleString();
          }

          return (
            <div
              key={courseId}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-48 bg-gray-50 overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : null}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                  {title}
                </h2>


                {enrolledLabel && (
                  <p className="mt-auto text-xs text-gray-500 flex items-center gap-2">
                    <i className="far fa-calendar-alt text-gray-400" />
                    <span>
					  {t("myCourses.enrolled_on")}: <span className="font-medium text-gray-600">{enrolledLabel}</span>
                    </span>
                  </p>
                )}
              </div>

              {/* Show content moved here */}
              <Link
                to={`/courses/${courseId}`}
                className="block w-full rounded-none bg-[#ff9500] px-4 py-2 text-center font-bold text-white hover:brightness-110 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("courses.card.show_content")}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
