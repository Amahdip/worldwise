import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");
	const navigate = useNavigate();

	return (
		<div onClick={() => navigate("form")} className={styles.mapContainer}></div>
	);
}

export default Map;
