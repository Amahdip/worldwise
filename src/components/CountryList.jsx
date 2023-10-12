import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Message from "./Message";
import { nanoid } from "nanoid";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message message='Please add your city by click on a city on the map' />
		);

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [
				...arr,
				{ country: city.country, emoji: city.emoji, id: nanoid() },
			];
		else return arr;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem key={country.id} country={country} />
			))}
		</ul>
	);
}
CountryList.propTypes = {
	cities: PropTypes.array,
	city: PropTypes.string,
	isLoading: PropTypes.bool,
};
export default CountryList;
