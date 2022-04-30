import { useState, useEffect } from "react";
// Packages
import axios from "axios";
// Context
import MovieContext from "./context/MovieContext";
// Components
import Search from "./components/Search";
import Listing from "./components/Listing";
import Details from "./components/Details";
import Loader from "./components/Loader";
import "./App.css";
// Config
import { URL, API_KEY } from "./utils";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Film recherché
  const [searchTerm, setSearchTerm] = useState("");
  // Liste de films
  const [data, setData] = useState([]);
  // Sélection d'un film
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint;
        // On affiche les films populaires
        if (!searchTerm) {
          endpoint = await axios.get(
            `${URL}movie/popular?api_key=${API_KEY}&language=fr-FR`
          );
        } else {
          // Sinon on recherche un film
          endpoint = await axios.get(
            `${URL}search/movie?api_key=${API_KEY}&language=fr-FR&query=${searchTerm
              .trim()
              .toLocaleLowerCase()}`
          );
        }
        if (endpoint.status === 200) {
          setData(endpoint.data.results);
          // Dès la première actualisation, il vaut mieux afficher le détail du premier film de la liste de films plutôt qu'un message d'erreur
          setCurrentMovie(endpoint?.data?.results[0]?.id);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      {/* Ici, j'utilise le context pour éviter les prérendus inutiles à chaque chargement des composants */}
      <MovieContext.Provider value={{ data, currentMovie, setCurrentMovie }}>
        <div className="container">
          <div className="container__half">
            <Search
              query={searchTerm}
              handleChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            {Array.isArray(data) && data.length === 0 ? (
              <div className="error-message">
                <p>Ce film n'existe pas.</p>
              </div>
            ) : (
              <Listing />
            )}
          </div>
          <div className="container__half">
            {data.length === 0 || currentMovie === null ? (
              <div className="error-message" style={{ margin: "0 1rem 0" }}>
                <p>Aucun film n'a été sélectionné</p>
              </div>
            ) : (
              <Details />
            )}
          </div>
        </div>
      </MovieContext.Provider>
    </main>
  );
}

export default App;
