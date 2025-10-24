import styles from "./result.module.css";
import {useState, useEffect, Dispatch, SetStateAction } from "react"

export type MapLocation = {
  lat: number;
  long: number;
};
export type ResultType = {
  storeName: string;
  loc: {lat: number, long: number};
  price: number;
  distance?: number;
  isFavorite: boolean;
};
type ResultProps = {
  result: ResultType;
  showHeadingValue: boolean;
  setLocMethod?: Dispatch<SetStateAction<MapLocation>>
  setMapShown?: Dispatch<SetStateAction<boolean>>
};

export default function Result({result, showHeadingValue: className_, setLocMethod, setMapShown}: ResultProps) {
   const [favoriteImage, setFavoriteImage] = useState("./favoriteStarUnfilled.png");
  
  function onDirectionsClicked() {
    if (result.loc && result.loc.lat && result.loc.long && setMapShown && setLocMethod) {
      const location: MapLocation = {lat: result.loc.lat, long: result.loc.long};
      setLocMethod(location);
      setMapShown(true);
    }
  }
  
  function onOrderNowClicked() {
    console.log(`Order now button clicked for storeName:${result.storeName} with price:${result.price}`);
  }
  
  function onFavoriteClicked() {
    console.log(`Added to favorites`);

    if(result.isFavorite){
      setFavoriteImage("./favoriteStarUnfilled.png");
      result.isFavorite = false;
      // Remove from database
    }
    else
    {
      setFavoriteImage("./favoriteStarFilled.png");
      result.isFavorite = true;
      // Add to database
    }    
  }

  useEffect(() => {
      if(result.isFavorite){
        setFavoriteImage("./favoriteStarFilled.png");
      }
    }, []);

  if (result.distance && result.distance === 0) {result.distance = undefined;}

  return (
    <div className={styles.result + " " + (className_ ? styles.show : "")}>
      <h3 className={styles.resultStoreName}>{result.storeName}</h3>
      
      <div className={styles.buttonContainer}>
        <button
          className={styles.resultRoundButton}
          style={{backgroundColor:"darkgray"}}
          onClick={onDirectionsClicked}>Directions
        </button>
        <button
          className={styles.resultRoundButton}
          style={{backgroundColor:"var(--primary-color)"}}
          onClick={onOrderNowClicked}>Order Now
        </button>
      </div>

      {result.distance && (
        <h2 className={styles.resultDistance}>{result.distance} {result.distance < 2 ? "mile" : "miles"}</h2>
      )}
      <img src={favoriteImage} className={styles.favoriteImage} onClick={onFavoriteClicked}/>
    </div>
  );
}