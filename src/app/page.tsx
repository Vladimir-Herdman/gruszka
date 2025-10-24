"use client";

import { useEffect, useState, Dispatch, SetStateAction, MouseEventHandler } from "react";
import styles from "./page.module.css";

//components
import LoginPopup from "@/_components/loginPopup";
import { Console } from "console";

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

  
    //default sort by distance
    currentResults.sort((a, b) => (a.distance || 0) - (b.distance || 0));
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

function ResultContainer({ results, search }: ResultContainerProps) {
  const [open, setOpen] = useState(false);
  const [sortingMethod, setActive] = useState("Distance");
  const [sortedResults, setSortedResults] = useState<Result[]>([]);

  const handleOpen: MouseEventHandler = (event) => {
    event.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    const target = event.target as HTMLElement;
    const id = target.id;
    setActive(id);
  };

  useEffect(() => {
    if (results.length === 0) return;

    const sorted = [...results];
    if (sortingMethod === "Distance") {
      sorted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (sortingMethod === "Price") {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    setSortedResults(sorted);
  }, [results, sortingMethod]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("dropdownWrapper");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!search && results.length === 0) return null;

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsContainerHeader}>
        <h2 className={styles.searchTerm}>Search Results for: {search}</h2>

        <div id="dropdownWrapper" className={styles.dropdownWrapper}>
          <button className={styles.dropdownButton} onClick={handleOpen}>
            Sort By ▾
          </button>

          <div className={`${styles.dropdownContent} ${open ? styles.show : ""}`}>
            <button
              id="Distance"
              onClick={handleClick}
              className={`${styles.dropdownOption} ${sortingMethod === "Distance" ? styles.activeButton : ""}`}
            >Distance
              {sortingMethod === "Distance" && <span className={styles.activeDot}></span>}
            </button>

            <button
              id="Price"
              onClick={handleClick}
              className={`${styles.dropdownOption} ${sortingMethod === "Price" ? styles.activeButton : ""}`}
            >Price
              {sortingMethod === "Price" && <span className={styles.activeDot}></span>}
            </button>
          </div>
        </div>
      </div>

      {sortedResults.map((result, index) => (
        <Result key={index} result={result} className={styles.show} />
      ))}
    </div>
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

