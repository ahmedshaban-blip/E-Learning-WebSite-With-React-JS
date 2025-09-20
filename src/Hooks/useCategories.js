import { useEffect, useState } from "react";
import { db } from "../firebaseApp";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function useCategories({ from = "categories" } = {}) {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        (async () => {
            setLoading(true);
            try {
                if (from === "categories") {
                    const q = query(collection(db, "categories"), orderBy("order", "asc"));
                    const snap = await getDocs(q);
                    const items = snap.docs.map(d => ({ id: d.id, ...(d.data() || {}) })); // {name, slug}
                    if (!ignore) setCats(items);
                } else {
                    // fallback: distinct from courses.category
                    const snap = await getDocs(collection(db, "courses"));
                    const set = new Set(snap.docs.map(d => d.data().category).filter(Boolean));
                    if (!ignore) setCats([...set].sort().map(x => ({ id: x, name: x, slug: x })));
                }
            } finally { if (!ignore) setLoading(false); }
        })();
        return () => { ignore = true; };
    }, [from]);

    return { cats, loading };
}
