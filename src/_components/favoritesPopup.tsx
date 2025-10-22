import { useState, useEffect, Dispatch, SetStateAction } from "react";
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
    };

function favoritesPopup({setShowFavoritesPopup}: FavoritesPopupProps) {
  const handleEscape = () => {setShowFavoritesPopup(false);}

  return (
    <div className={styles.favoriteContainer}>
      <div className={styles.scrollingList}>
        {/* TODO: ADD FAVORITE BUTTON TO RESULT ITEMS */}
          {/* MAYBE MAKE A NEW COMPONENT WHICH IS A BUTTON THAT ADDS TO THE FAVORITES THING */}
        {/* TODO: MAKE RESULTS APPEAR IN FAVORITES POPUP WHEN CLICKING FAVORITE BUTTON */}
        {<Result result={tempResult} key={0} showHeadingValue={true} />}
        {<Result result={tempResult} key={1} showHeadingValue={true} />}
        {<Result result={tempResult} key={2} showHeadingValue={true} />}
        {<Result result={tempResult} key={3} showHeadingValue={true} />}
        {<Result result={tempResult} key={4} showHeadingValue={true} />}
        {<Result result={tempResult} key={5} showHeadingValue={true} />}
        {<Result result={tempResult} key={6} showHeadingValue={true} />}
        {<Result result={tempResult} key={7} showHeadingValue={true} />}
        {<Result result={tempResult} key={8} showHeadingValue={true} />}
      </div>
      <div className={loginStyles.exitButton} onClick={handleEscape}></div>
    </div>
  );
}

export default favoritesPopup