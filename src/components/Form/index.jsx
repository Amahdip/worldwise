// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import BackButton from "../BackButton";
import styles from "./style.module.css";
import Button from "../Button";
import { useNavigate } from "react-router";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useEffect } from "react";
import Message from "../Message";
import Spinner from "../SpinnerFullPage";
import DatePicker from "react-datepicker";
import { useCities } from "../../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const navigate = useNavigate();
	const [lat, lng] = useUrlPosition();
	const [emoji, setEmoji] = useState("");
	const [geocodingError, setGeocodingError] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const { createCity, isLoading } = useCities();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		await createCity(newCity);
		navigate("/app/cities");
	};

	useEffect(
		function () {
			if (!lat && !lng) return;
			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeocodingError("");
					const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
					const data = await res.json();
					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
					if (!data.countryCode)
						throw new Error("That dosen't seem to be a city, Click somewhere else");
				} catch (error) {
					setGeocodingError(error.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	if (isLoadingGeocoding) return <Spinner />;
	if (geocodingError) return <Message message={geocodingError} />;
	if (!lat && !lng) return <Message message='Start by clicking on the map' />;

	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				{/* <input id='date' onChange={(e) => setDate(e.target.value)} value={date} /> */}
				<DatePicker
					id='date'
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					dateFormat='dd/mm/yyyy'
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type='primary'>Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
