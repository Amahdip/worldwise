import PropTypes from "prop-types";
import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
			};
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error("Unknown action type");
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

	useEffect(function () {
		dispatch({ type: "loading" });
		async function fetchCities() {
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({ type: "rejected", payload: "There was an error loading cities ...." });
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error loading city ...." });
		}
	}
	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error creating the city ...." });
		}
	}
	async function deleteCity(id) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error deleting city ...." });
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("CitiesContext was used outside of the CitiProvider");
	return context;
}

CitiesContext.propTypes = {
	children: PropTypes.node,
};

export { CitiesProvider, useCities };