"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "./page.module.css";

//components
import LoginPopup from "@/_components/loginPopup";
import FavoritesPopup from "@/_components/favoritesPopup";
import Result from "@/_components/result";
import { ResultType, MapLocation } from "@/_components/result";
import MapContainer from "@/_components/mapPopup";
import NutrientProfile from "@/_components/nutrientData";

export default function Home() {
  const [results, setResults] = useState<ResultType[]>([]);
  const [search, setSearch] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapLocation, setMapLocation] = useState<MapLocation>({lat: 0, long: 0});
  const [showNutrients, setShowNutrients] = useState(false);

  const handleSearch = (text: string) => {
    if (text === "") {return;}
    setSearch(text);
    setShowNutrients(false);

    //TODO:
    //update once we have some API form to return data, so call API here to
    //get results array instead of just a single test result here
    const tempResult: ResultType = {
      storeName: "Walmart",
      loc: { lat: parseFloat((Math.random() * 90).toFixed(3)), long: parseFloat((Math.random() * 180).toFixed(3)) },
      distance: parseFloat(((Math.random() * 14) + 1).toFixed(0)),
      price: parseFloat((Math.random() * 20).toFixed(2)),
      isFavorite: false,
    };
    let currentResults;//[...results.slice(), tempResult];
    if (results[results.length - 1]?.storeName === tempResult.storeName) {
      currentResults = [...results.slice(), tempResult];
    } else {
      currentResults = [tempResult];
    }

    //TODO: Insert better sorting based off customer choices with price and distance equations
    console.log(tempResult);
    currentResults.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    setResults(currentResults);
  };

  return (
    <>
      <TopBar setShowLoginPopup={setShowLoginPopup} setFavoritesPopup={setShowFavoritesPopup} text={loggedIn ? "Logged In" : "Login"}/>

      {/* ----------SEARCH SECTION---------- */}
      <div className={styles.searchSection}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.searchContainer}>
            <SearchBar onSearchTextEntered={handleSearch} />
        </div>
      </div>

      {/* ----------RESULTS SECTION---------- */}
      <div className={styles.resultsSection}>
        {!showMap
          ? <ResultContainer 
              results={results} 
              search={search} 
              setLocationMethod={setMapLocation} 
              setMapMethod={setShowMap}
              showNutrients={showNutrients}
              setShowNutrients={setShowNutrients}
            />
          : showMap && <MapContainer setShowMapMethod={setShowMap} mapLocationObj={mapLocation} />
        }
      </div>

      {/* ----------POPUPS SECTION---------- */}
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} setLoggedIn={setLoggedIn} />} {/*TODO: make fade in out*/}
      {showFavoritesPopup && <FavoritesPopup setShowFavoritesPopup={setShowFavoritesPopup}/>}
    </>
  );
}

type TopBarProps = {
  setShowLoginPopup: Dispatch<SetStateAction<boolean>>;
  setFavoritesPopup: Dispatch<SetStateAction<boolean>>
  text: string;
};
function TopBar({setShowLoginPopup, setFavoritesPopup, text}: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.logoWrapper}>
        <div className={styles.logoBase}></div>
        <div className={styles.logoFill}></div>
      </div>

      <ul className={styles.topBarLinks}>
        <li><a href="#" onClick={() => setFavoritesPopup(true)}>Favorites</a></li>
        <li><a href="#" onClick={() => setShowLoginPopup(true)}>{text}</a></li>
      </ul>
    </div>
  );
}

type SearchBarProps = {
  onSearchTextEntered: (val: string) => void;
};

function SearchBar({onSearchTextEntered}: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search for produce..."
        className={styles.searchInput}
        onKeyDown={(e) => e.key === "Enter" && onSearchTextEntered(inputValue)}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.searchButton} onClick={() => onSearchTextEntered(inputValue)}>Search</button>
    </div>
  );
}

type ResultContainerProps = {
  results: ResultType[];
  search: string;
  setLocationMethod: Dispatch<SetStateAction<MapLocation>>
  setMapMethod: Dispatch<SetStateAction<boolean>>
  showNutrients: boolean;
  setShowNutrients: Dispatch<SetStateAction<boolean>>;
};

function ResultContainer({results, search, setLocationMethod, setMapMethod, showNutrients, setShowNutrients}: ResultContainerProps) {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => { search !== "" && setShowHeading(true);}, [search]);
  if(!showHeading && results.length === 0) return null;

  return (
    <>
      <div className={styles.resultsContainer}>
        <div className={styles.resultsContainerHeader}>
          <h2 className={styles.searchTerm + " " + (showHeading ? styles.show : "")}>Search Results for: {search}</h2>
          <button className={styles.showNutrientsButton} onClick={() => setShowNutrients(!showNutrients)}>
            {showNutrients ? "Back" : "Show Nutrients"}
          </button>
        </div>

        {
          showNutrients ? (
            <NutrientProfile search={search} />
          ) : (
            results.map((result, index) => 
              <Result result={result} key={index} showHeadingValue={showHeading} setLocMethod={setLocationMethod} setMapShown={setMapMethod}/>
            )
          )
        }
      </div>
    </>
  );
}