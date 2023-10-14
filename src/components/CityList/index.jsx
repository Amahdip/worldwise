import CityItem from "../CityItem";
import styles from "./style.module.css";
import Spinner from "../SpinnerFullPage";
import Message from "../Message";
import PropTypes from "prop-types";
import { useCities } from "../../contexts/CitiesContext";

function CityList() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message='Please add your city by click on a city on the map' />;
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
}

CityList.propTypes = {
	cities: PropTypes.array,
	isLoading: PropTypes.bool,
};

export default CityList;
