import { Dispatch, SetStateAction } from "react";
import styles from "./favoritesPopup.module.css";
import loginStyles from "./loginPopup.module.css";

import Result from "@/_components/result";
import { ResultType } from "@/_components/result";

type FavoritesPopupProps = {
  setShowFavoritesPopup: Dispatch<SetStateAction<boolean>>;
};

const tempResult: ResultType = {
  storeName: "Test Store",
  loc: { lat: parseFloat((Math.random() * 90).toFixed(3)), long: parseFloat((Math.random() * 180).toFixed(3)) },
  distance: parseFloat((Math.random() * 14).toFixed(0)),
  price: parseFloat((Math.random() * 20).toFixed(2)),
  isFavorite: false,
};

// Had to do it this way because it wasn't happy with typing
const results = [tempResult]
results.pop();

function populateFavorites()
{
  // Pull down results from database and .push(result) to the results array
}

function favoritesPopup({setShowFavoritesPopup}: FavoritesPopupProps) {
  const handleEscape = () => {
    setShowFavoritesPopup(false);
  }

  return (
    <div className={styles.favoriteContainer}>
      <div className={styles.scrollingList}>
        {results.map(result => <Result result={result} showHeadingValue={true}/>)}
      </div>
      <div className={loginStyles.exitButton + " " + styles.exitButton} onClick={handleEscape}></div>
    </div>
  );
}

export default favoritesPopup
