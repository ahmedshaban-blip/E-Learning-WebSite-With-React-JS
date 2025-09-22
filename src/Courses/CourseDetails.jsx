import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchPlaylistVideos } from "./CallYoutubeApi";
import { getData } from "../lib/firebase";
import Pagination from "../Component/pagination";

export default function CourseDetails() {
	const { id } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const [course, setCourse] = useState(null);
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Modal state
	const [open, setOpen] = useState(false);
	const [activeVideo, setActiveVideo] = useState(null);

	// Pagination state
	const itemsPerPage = 9; // tweak as you like (6, 9, 12…)
	const initialPage = Math.max(1, Number(searchParams.get("page") || 1));
	const [currentPage, setCurrentPage] = useState(initialPage);

	const totalPages = Math.max(
		1,
		Math.ceil((videos?.length || 0) / itemsPerPage)
	);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, videos.length);

	const pagedVideos = useMemo(
		() => videos.slice(startIndex, endIndex),
		[videos, startIndex, endIndex]
	);

	const openVideo = useCallback((v) => {
		setActiveVideo(v);
		setOpen(true);
	}, []);
	const close = useCallback(() => {
		setOpen(false);
		setActiveVideo(null);
	}, []);

	// Keep URL in sync when page changes
	const handlePageChange = useCallback(
		(page) => {
			const next = Math.min(Math.max(1, page), totalPages);
			setCurrentPage(next);
			const newParams = new URLSearchParams(searchParams);
			newParams.set("page", String(next));
			setSearchParams(newParams, { replace: true });
			// Optional: scroll to the grid after page change
			const section = document.getElementById("curriculum");
			if (section)
				section.scrollIntoView({ behavior: "smooth", block: "start" });
		},
		[searchParams, setSearchParams, totalPages]
	);

	// Clamp page if videos length changes or URL has an out-of-range page
	useEffect(() => {
		if (currentPage > totalPages) {
			handlePageChange(totalPages);
		} else if (currentPage < 1) {
			handlePageChange(1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalPages]);

	// Load course + videos
	useEffect(() => {
		let cancelled = false;
		async function load() {
			setLoading(true);
			setError("");
			try {
				const courseData = await getData("courses", id);
				if (!courseData) throw new Error("Course not found");
				if (!cancelled) setCourse(courseData);

				if (courseData.playlistId) {
					const vids = await fetchPlaylistVideos(courseData.playlistId);
					if (!cancelled) setVideos(Array.isArray(vids) ? vids : []);
				} else {
					if (!cancelled) setVideos([]);
				}
			} catch (e) {
				if (!cancelled) setError(e?.message || "Failed to load course");
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [id]);

	if (loading) return <p className="p-6">Loading...</p>;
	if (error) return <p className="p-6 text-red-600">{error}</p>;
	if (!course) return <p className="p-6">Course not found.</p>;

	return (
		<div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<nav className="text-sm text-gray-500 mb-4">
					<span className="hover:text-gray-700 cursor-pointer">Courses</span>
					<span className="mx-1">/</span>
					<span className="text-gray-700 dark:text-gray-300">
						{course?.title}
					</span>
				</nav>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main content */}
					<div className="lg:col-span-2">
						<header className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-700">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
								{course?.title}
							</h1>
							<p className="mt-2 text-gray-600 dark:text-gray-300">
								{course?.description}
							</p>

							<div className="mt-4 flex flex-wrap gap-3">
								<span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold">
									{course?.level || "All Levels"}
								</span>
								<span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold">
									{course?.duration || "Self-paced"}
								</span>
								{course?.category && (
									<span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">
										{course.category}
									</span>
								)}
							</div>
						</header>

						{/* Curriculum preview */}
						<section id="curriculum" className="mt-6">
							<div className="flex items-center justify-between mb-3">
								<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
									Curriculum preview
								</h2>
								<span className="text-sm text-gray-500">
									{videos.length
										? `Showing ${startIndex + 1}–${endIndex} of ${
												videos.length
										  } videos`
										: "No videos"}
								</span>
							</div>

							{pagedVideos.length ? (
								<>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
										{pagedVideos.map((v) => (
											<button
												key={v.videoId}
												onClick={() => openVideo(v)}
												className="group text-left bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												<div className="relative">
													<img
														src={v.thumbnail}
														alt={v.title}
														loading="lazy"
														className="w-full aspect-video object-cover"
													/>
													<span className="absolute inset-0 grid place-items-center">
														<span className="h-12 w-12 rounded-full bg-black/50 backdrop-blur-sm grid place-items-center transition group-hover:scale-105">
															<svg
																viewBox="0 0 24 24"
																aria-hidden="true"
																className="h-6 w-6 fill-white"
															>
																<path d="M8 5v14l11-7z" />
															</svg>
														</span>
													</span>
												</div>
												<div className="p-3">
													<p className="font-medium text-gray-900 dark:text-white line-clamp-2">
														{v.title}
													</p>
													{v.length && (
														<p className="text-xs text-gray-500 mt-1">
															{v.length}
														</p>
													)}
												</div>
											</button>
										))}
									</div>

									{/* Pagination control */}
									{totalPages > 1 && (
										<div className="mt-6 flex justify-center">
											<Pagination
												currentPage={currentPage}
												totalPages={totalPages}
												onPageChange={handlePageChange}
												size="sm"
											/>
										</div>
									)}
								</>
							) : (
								<div className="text-sm text-gray-500">
									No videos found for this course.
								</div>
							)}
						</section>
					</div>

					{/* Sidebar */}
					<aside className="lg:col-span-1">
						<div className="sticky top-6 bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-700">
							<ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
								<li>• {course?.lessons || videos.length} lessons</li>
								<li>
									• {course?.duration || `Approx. ${videos.length * 5} mins`}
								</li>
								<li>• {course?.language || "Language: English"}</li>
								<li>• Lifetime access</li>
								<li>• Certificate of completion</li>
							</ul>
						</div>

						{course?.instructor && (
							<div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-700">
								<div className="flex items-center gap-3">
									<img
										src={course.instructor.avatar}
										alt={course.instructor.name}
										className="h-12 w-12 rounded-full object-cover"
									/>
									<div>
										<p className="font-semibold text-gray-900 dark:text-white">
											{course.instructor.name}
										</p>
										{course.instructor.title && (
											<p className="text-xs text-gray-500">
												{course.instructor.title}
											</p>
										)}
									</div>
								</div>
								{course.instructor.bio && (
									<p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
										{course.instructor.bio}
									</p>
								)}
							</div>
						)}
					</aside>
				</div>
			</div>

			{/* Modal player */}
			{open && activeVideo && (
				<div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
					<div className="absolute inset-0 bg-black/60" onClick={close} />
					<div className="relative max-w-4xl mx-auto mt-24 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
						<button
							onClick={close}
							className="absolute right-3 top-3 p-2 rounded-full bg-black/50 text-white"
							aria-label="Close"
						>
							✕
						</button>
						<div className="w-full aspect-video">
							<iframe
								key={activeVideo.videoId}
								src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
								title={activeVideo.title}
								allowFullScreen
								className="w-full h-full"
							/>
						</div>
						<div className="p-4">
							<h3 className="font-semibold text-gray-900 dark:text-white">
								{activeVideo.title}
							</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
