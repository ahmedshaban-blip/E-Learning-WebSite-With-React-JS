import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlaylistVideos } from "./CallYoutubeApi";
import { getData } from "../lib/firebase";
export default function CourseDetails() {
	const { id } = useParams();
	const [course, setCourse] = useState(null);
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		async function load() {
			const courseData = await getData("courses", id);

			if (!courseData) {
				console.error("Course not found");
				return;
			}

			setCourse(courseData);

			if (courseData.playlistId) {
				const vids = await fetchPlaylistVideos(courseData.playlistId);
				setVideos(vids);
			}
		}

		load();
	}, [id]);

	if (!course) return <p>Loading...</p>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">{course.title}</h1>
			<p className="mb-4">{course.description}</p>

			<div className="grid grid-cols-3 gap-4">
				{videos.map((v) => (
					<div key={v.videoId} className="border p-2 rounded">
						<img src={v.thumbnail} alt={v.title} className="mb-2" />
						<p className="font-semibold">{v.title}</p>
						<iframe
							width="100%"
							height="200"
							src={`https://www.youtube.com/embed/${v.videoId}`}
							frameBorder="0"
							allowFullScreen
							title={v.title}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
