import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import "./assets/scss/App.scss";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Latest from "./pages/Latest";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Genre from './pages/Genre'
import Director from "./pages/Director";
import SearchResults from "./pages/Search";
import Upcoming from "./pages/Upcoming";
import Last10Visits from "./pages/Last10Visits";
import Spinner from "./components/Spinner";


const App = () => {
	return (
		<div id="App">
			<Navigation />
			<Spinner />
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/latest" element={<Latest />} />
					<Route path="/upcoming" element={<Upcoming />} />
					<Route path="/popular" element={<Popular />} />
					<Route path="/toprated" element={<TopRated />} />
					<Route path="/:id" element={<Movie />} />
					<Route path="person/:id" element={<Actor />} />
					<Route path="person/:id" element={<Director />} />
					<Route path="/genre/:genreId" element={<Genre/>} />
					<Route path="/search" element={<SearchResults />} />
					<Route path="/last10visits" element={<Last10Visits />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	);
};

export default App;
