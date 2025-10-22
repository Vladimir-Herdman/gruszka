import styles from "./result.module.css";
import {useState} from "react"

export type ResultType = {
  storeName: string;
  loc: {lat: number, long: number};
  price?: number;
  distance?: number;
  websiteURL?: string;
};
type ResultProps = {
  result: ResultType;
  showHeadingValue: boolean;
}
let isFavorite:Boolean = false

export default function Result({result, showHeadingValue: className_}: ResultProps) {
   const [favoriteImage, setFavoriteImage] = useState("./favoriteStarUnfilled.png");
  //TODO: insert functionality here for Directions and OrderNow clicks such as map and opening website for store
  function onDirectionsClicked() {
    console.log(`Directions button clicked for storeName:${result.storeName} with price:${result.price}`);
  }
  function onOrderNowClicked() {
    console.log(`Order now button clicked for storeName:${result.storeName} with price:${result.price}`);
  }
  function onFavoriteClicked() {
    console.log(`Added to favorites`);

    if(isFavorite){
      setFavoriteImage("./favoriteStarUnfilled.png");
      isFavorite = false;
    }
    else
    {
      setFavoriteImage("./favoriteStarFilled.png");
      isFavorite = true;
    }    
  }

  if (result.distance && result.distance === 0) {result.distance = undefined;}

  return (
    <div className={styles.result + " " + (className_ ? styles.show : "")}>
      <h3 className={styles.resultStoreName}>{result.storeName}</h3>
      <p
        className={styles.resultDistance}
        style={result.distance ? {} : {opacity:0}}
      >
        {result.distance ? result.distance + " miles" : "NULL"}
      </p>

      {/* Favorites Button */}
      <img src={favoriteImage} className={styles.favoriteImage}  onClick={onFavoriteClicked}/>
      
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
