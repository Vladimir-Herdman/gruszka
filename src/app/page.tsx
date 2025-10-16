"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "./page.module.css";

//components
import LoginPopup from "@/_components/loginPopup";

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);
  const [search, setSearch] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSearch = (text: string) => {
    if (text === "") {return;}
    setSearch(text);

    //TODO:
    //update once we have some API form to return data, so call API here to
    //get results array instead of just a single test result here
    const tempResult: Result = {
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
      <TopBar setShowLoginPopup={setShowLoginPopup} text={loggedIn ? "Logged In" : "Login"}/>

      {/* ----------SEARCH SECTION---------- */}
      <div className={styles.searchSection}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.searchContainer}>
            <SearchBar onSearchTextEntered={handleSearch} />
        </div>
      </div>

      {/* ----------RESULTS SECTION---------- */}
      <div className={styles.resultsSection}>
        <ResultContainer results={results} search={search} />
      </div>

      {/* ----------POPUPS SECTION---------- */}
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} setLoggedIn={setLoggedIn} />} {/*TODO: make fade in out*/}
    </>
  );
}

type TopBarProps = {
  setShowLoginPopup: Dispatch<SetStateAction<boolean>>;
  text: string;
};
function TopBar({setShowLoginPopup, text}: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.logoWrapper}>
        <div className={styles.logoBase}></div>
        <div className={styles.logoFill}></div>
      </div>

      <ul className={styles.topBarLinks}>
        <li><a href="#">Favorites</a></li>
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

type Result = {
  storeName: string;
  loc: {lat: number, long: number};
  price?: number;
  distance?: number;
  websiteURL?: string;
};
type ResultProps = {
  result: Result;
  className: string;
}

type ResultContainerProps = {
  results: Result[];
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
            <Result result={result} key={index} className={showHeading ? styles.show : ""} />
          )
        }
      </div>
    </>
  );
}

function Result({result, className}: ResultProps) {

  // const res = await fetch("127.0.0.1:8000/food/chicken");
  // const data = await res.json();
  // console.log(data.dumps(data));

  //TODO: insert functionality here for Directions and OrderNow clicks such as map and opening website for store
  function onDirectionsClicked() {
    console.log(`Directions button clicked for storeName:${result.storeName} with price:${result.price}`);
  }
  function onOrderNowClicked() {
    console.log(`Order now button clicked for storeName:${result.storeName} with price:${result.price}`);
  }

  if (result.distance && result.distance === 0) {result.distance = undefined;}

  return (
    <div className={styles.result + " " + className}>
      <h3 className={styles.resultStoreName}>{result.storeName}</h3>
      <p
        className={styles.resultDistance}
        style={result.distance ? {} : {opacity:0}}
      >
        {result.distance ? result.distance + " miles" : "NULL"}
      </p>
      {result.price && <h2 className={styles.resultPrice}>${result.price}</h2>}
      <button //Directions
        className={styles.resultRoundButton}
        style={{backgroundColor:"darkgray"}}
        onClick={onDirectionsClicked}>Directions
      </button>
      <button //Order Now
        className={styles.resultRoundButton}
        style={{right:15, backgroundColor:"var(--primary-color)"}}
        onClick={onOrderNowClicked}>Order Now
      </button>
    </div>
  );
}
