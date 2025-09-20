




import { useDispatch, useSelector } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
  setFavorites,
} from "../redux/slices/wishlistSlice";

import { getAllData } from "../lib/firebase";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import MyButton from "../Component/MyButton";
import Pagination from "../Component/pagination";
import { useAuth } from "../context/AuthContext";

// add to fav imports
import {
  addCourseToFav,
  removeCourseFromFav,
  getUserFavCourses,
} from "../lib/firebase";

const CATEGORIES = [
  "Programming",
  "Graphic Design",
  "Social Media",
  "Marketing",
  "Ui/UX",
];

import { useTranslation } from "react-i18next";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const itemsPerPage = 5;

  // Redux
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  // open authmodal for fav section
  const openLoginPrompt = () => {
    sessionStorage.setItem("authModalOpen", "1");
    sessionStorage.setItem("lastProtectedPath", location.pathname);
    window.dispatchEvent(new CustomEvent("showLoginModal"));
  };

  // URL params
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "";
  const q = params.get("q") || "";
  const [searchInput, setSearchInput] = useState(q);

  // load fav from firestore
  useEffect(() => {
    (async () => {
      if (!user?.uid) return;
      const ids = await getUserFavCourses(user.uid);
      dispatch(setFavorites(ids));
    })();
  }, [user?.uid, dispatch]);

  useEffect(() => {
    async function loadCourses() {
      const data = await getAllData("courses");
      setCourses(data);
    }
    loadCourses();
  }, []);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cat, q, courses.length]);

  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (!searchInput.trim()) next.delete("q");
      else next.set("q", searchInput.trim());
      setParams(next, { replace: true });
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const onChangeCat = (value) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete("cat");
    else next.set("cat", value);
    setParams(next);
  };

  const filtered = useMemo(() => {
    const base = cat ? courses.filter((c) => c.category === cat) : courses;
    if (!q.trim()) return base;

    const term = q.trim().toLowerCase();
    return base.filter((c) => {
      const title = String(c.title || "").toLowerCase();
      const desc = String(c.description || "").toLowerCase();
      const category = String(c.category || "").toLowerCase();
      return (
        title.includes(term) || desc.includes(term) || category.includes(term)
      );
    });
  }, [courses, cat, q]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Enroll
  const handleEnroll = (course) => {
    navigate("/checkout", { state: { course } });
  };

  // Clear search
  const clearSearch = () => setSearchInput("");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Header: Title + Filters */}
      <header className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {cat ? t("courses.title_cat", { cat }) : t("courses.title_all")}
              {q ? (
                <span className="text-gray-500 font-medium">
                  {" "}
                  {t("courses.title_search_suffix", { q })}
                </span>
              ) : (
                ""
              )}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {t("courses.search.subtitle", {
                defaultValue: "Find your next course and start learning today.",
              })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
            {/* Searchbar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t("courses.search.placeholder")}
                className="w-full h-11 pl-11 pr-9 rounded-2xl border border-gray-200 bg-white text-sm text-gray-600 placeholder-gray/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-300 transition"
              />
              {searchInput && (
                <button
                  aria-label={t("courses.search.clear_aria")}
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full hover:bg- text-gray-500"
                >
                  ×
                </button>
              )}
            </div>

            {/* Category dropdown */}
            <label className="inline-flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {t("courses.search.filter_label")}:
              </span>

              <select
                value={cat}
                onChange={(e) => onChangeCat(e.target.value)}
                className="w-full h-11 pl-11 pr-9 rounded-2xl border border-gray-200 bg-white text-sm text-gray-600 placeholder-gray/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-300 transition"
              >
                {/* خيار الكل */}
                <option value="">{t("courses.search.all_option")}</option>

                {/* خيارات التصنيفات */}
                {CATEGORIES.map((name) => (
                  <option key={name} value={name}>
                    {t(["courses", "categories", name].join("."))}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {currentCourses.map((course) => {
          const isSaved = wishlistItems.includes(course.id);

          const handleToggleWishlist = async () => {
            if (!user) {
              openLoginPrompt();
              return;
            }

            const id = course.id;

            if (isSaved) {
              dispatch(removeFromWishlist(id)); // UI سريع
              try {
                await removeCourseFromFav(user.uid, id);
              } catch (e) {
                dispatch(addToWishlist(id)); // rollback
                console.error("Failed to remove fav:", e);
              }
            } else {
              dispatch(addToWishlist(id));
              try {
                await addCourseToFav(user.uid, id);
              } catch (e) {
                dispatch(removeFromWishlist(id)); // rollback
                console.error("Failed to add fav:", e);
              }
            }
          };

          return (
            <div
              key={course.id}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
            >
              {/* Wishlist heart */}
              <div
                onClick={handleToggleWishlist}
                className="absolute top-3 right-3 z-10 cursor-pointer rounded-full px-3 py-2 text-sm font-medium text-gray-800 bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm hover:bg-white hover:shadow transition"
                aria-label={
                  isSaved
                    ? t("courses.card.remove_fav")
                    : t("courses.card.add_fav")
                }
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
              <div className="w-full h-48 bg-gray-50 overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                  {course.title}
                </h2>

                {/* Category chip (نفس النص – شكل فقط) */}
                {course.category && (
                  <p className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 w-max mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {course.category}
                  </p>
                )}

                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                  {course.description}
                </p>

                {/* Footer */}
                <div className="pt-4 border-t mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-700">
                          {t("course.price.label")}
                        </span>
                      </div>
                      <div className=" price-shadow flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                        <span className=" font-extrabold text-black">
                          {t("currency.symbol")}
                          {course.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MyButton
                        bgColor="#ff9500"
                        onClick={() => handleEnroll(course)}
                      >
                        {t("courses.card.enroll")}
                      </MyButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {!currentCourses.length && (
        <p className="text-gray-500 text-center mt-10">
          No courses found{q ? ` for “${q}”` : ""}
          {cat ? ` in ${cat}` : ""}.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            size="md"
          />
        </div>
      )}
    </div>
  );
}

export default AllCourses;
