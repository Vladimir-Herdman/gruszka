"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "./page.module.css";

//components
import LoginPopup from "@/_components/loginPopup";
import FavoritesPopup from "@/_components/favoritesPopup";
import Result from "@/_components/result";
import { ResultType } from "@/_components/result";

export default function Home() {
  const [results, setResults] = useState<ResultType[]>([]);
  const [search, setSearch] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSearch = (text: string) => {
    if (text === "") {return;}
    setSearch(text);

    //TODO:
    //update once we have some API form to return data, so call API here to
    //get results array instead of just a single test result here
    const tempResult: ResultType = {
      storeName: text,
      loc: { lat: parseFloat((Math.random() * 90).toFixed(3)), long: parseFloat((Math.random() * 180).toFixed(3)) },
      distance: parseFloat((Math.random() * 14).toFixed(0)),
      price: parseFloat((Math.random() * 20).toFixed(2)),
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
      <TopBar setShowLoginPopup={setShowLoginPopup}/>

      {/* ----------SEARCH SECTION---------- */}
      <div className={styles.searchSection}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.searchContainer}>
            <SearchBar onSearchTextEntered={handleSearch} />
        </div>
      </div>

      <FavoritesPopup /> {/* MACADEN ADDED REMOVE LATER */}

      {/* ----------RESULTS SECTION---------- */}
      <div className={styles.resultsSection}>
        <ResultContainer results={results} search={search} />
      </div>

      {/* ----------POPUPS SECTION---------- */}
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup}/>} {/*TODO: make fade in out*/}
    </>
  );
}

type TopBarProps = {
  setShowLoginPopup: Dispatch<SetStateAction<boolean>>
};
function TopBar({setShowLoginPopup}: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.logoWrapper}>
        <div className={styles.logoBase}></div>
        <div className={styles.logoFill}></div>
      </div>

      <ul className={styles.topBarLinks}>
        <li><a href="#">Favorites</a></li>
        <li><a href="#" onClick={() => setShowLoginPopup(true)}>Login</a></li>
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
};

function ResultContainer({results, search}: ResultContainerProps) {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => { search !== "" && setShowHeading(true);}, [search]);

  return (
    <>
      <div className={styles.resultsContainer}>
        <h2 className={styles.searchTerm + " " + (showHeading ? styles.show : "")}>Search Results for: {search}</h2>
        {
          results.map((result, index) => 
            <Result result={result} key={index} showHeadingValue={showHeading} />
          )
        }
      </div>
    </>
  );
}
