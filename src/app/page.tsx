"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import styles from "./page.module.css";

//components
import LoginPopup from "@/_components/loginPopup";
import { TelemetryPlugin } from "next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin";
  const foodItem = [
    {
      name: "",
      data: [],
      price: 0,
    },
  ];

export default function Home() {

  const [results, setResults] = useState<Result[]>([]);
  const [search, setSearch] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [nutritionData, setNutritionData] = useState<FoodItemType>({name:"", data:"", price:0});

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
          <button onClick={() => console.log("nutrition from use state: ",nutritionData)}> click me </button>
            <SearchBar onSearchTextEntered={handleSearch} />
        </div>
      </div>

      {/* ----------RESULTS SECTION---------- */}
      <div className={styles.resultsSection}>
        <ResultContainer results={results} search={search} setFoodDataMethod={setNutritionData}/>
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
  setFoodDataMethodLower?: Dispatch<SetStateAction<FoodItemType>>;
}

type FoodItemType = {
  name: string;
  data: "";
  price: number;
};

type ResultContainerProps = {
  results: Result[];
  search: string;
  setFoodDataMethod?: Dispatch<SetStateAction<FoodItemType>>
};

function ResultContainer({results, search, setFoodDataMethod}: ResultContainerProps) {
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => { search !== "" && setShowHeading(true);}, [search]);

  return (
    <>
      <div className={styles.resultsContainer}>
        <h2 className={styles.searchTerm + " " + (showHeading ? styles.show : "")}>Search Results for: {search}</h2>
        {
          results.map((result, index) => 
            <Result result={result} key={index} className={showHeading ? styles.show : ""} setFoodDataMethodLower={setFoodDataMethod} />
          )
        }
      </div>
    </>
  );
}
function Result({result, className, setFoodDataMethodLower}: ResultProps) {
  const [fetchCalled, setFetchCalled] = useState(false);

  if (!fetchCalled) {
    setFetchCalled(true);
    console.log("run");

    const help = async () => {
      console.log("Help");
      try{
        const res = await fetch("http://127.0.0.1:8000/food/chicken");
        const data = await res.json();
        console.log(data);  
        return await data;
      } catch(e){
        return [];
      }
    };
    let food;

    let data = help().then((data) => {
      if(data === 404){
        console.log("Error");
        return;
      }
      console.log(data[0].food_description);
      food = data[0].food_description;
      let name = data[0].food_name;
      let foo = data[0].food_description;
      foodItem.push({name:name, data: foo, price: 0});
      console.log(foodItem);

      if (setFoodDataMethodLower) {
        const foodDataObj: FoodItemType = {name:data[0].name, data:data[0].food_description, price:0};
        //console.log("food data obj:",foodDataObj);
        setFoodDataMethodLower(foodDataObj); //update with actual search info
      }
    });


    // let food = data[0].food_description;
    // console.log(food);
    // data;
    // console.log(data.food_description);
  }

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
