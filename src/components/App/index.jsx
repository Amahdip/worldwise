import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "../CityList";
import CountryList from "../CountryList";
import City from "../City";
import Form from "../Form";
import User from "../User";
import ProtectedRoute from "../../pages/ProtectedRoute";
import { AuthProvider } from "../../contexts/FakeAuthContext";
import { CitiesProvider } from "../../contexts/CitiesContext";
import SpinnerFullPage from "../SpinnerFullPage";

const Product = lazy(() => import("../../pages/Product"));
const Homepage = lazy(() => import("../../pages/Homepage"));
const Pricing = lazy(() => import("../../pages/Pricing"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound"));
const AppLayout = lazy(() => import("../../pages/AppLayout"));
const Login = lazy(() => import("../../pages/Login"));

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='product' element={<Product />} />
							<Route path='pricing' element={<Pricing />} />
							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route index element={<Navigate replace to='cities' />} />
								<Route path='user' element={<User />} />
								<Route path='cities' element={<CityList />} />
								<Route path='cities/:id' element={<City />} />
								<Route path='countries' element={<CountryList />} />
								<Route path='form' element={<Form />} />
							</Route>
							<Route path='login' element={<Login />} />
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
