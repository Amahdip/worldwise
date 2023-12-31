import { Link } from "react-router-dom";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { useCities } from "../../contexts/CitiesContext";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	const handleClick = (e) => {
		e.preventDefault();
		deleteCity(id);
	};

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button onClick={handleClick} className={styles.deleteBtn}>
					&times;
				</button>
			</Link>
		</li>
	);
}

CityItem.propTypes = {
	city: PropTypes.object,
	cityName: PropTypes.string,
	emoji: PropTypes.string,
	date: PropTypes.number,
};
export default CityItem;
