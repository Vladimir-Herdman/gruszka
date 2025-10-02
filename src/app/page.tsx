import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* ----------TOP BAR---------- */}
      <div className={styles.topBar}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoBase}></div>
          <div className={styles.logoFill}></div>
        </div>

        <ul className={styles.topBarLinks}>
          <li><a href="#">Favorites</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>

      {/* ----------SEARCH SECTION---------- */}
      <div className={styles.searchSection}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search for produce..."
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </div>

      {/* ----------RESULTS SECTION---------- */}
      <div className={styles.resultsSection}>
        <div className={styles.resultsContainer}>
          hello<br/>
          gello<br/>
          jello<br/>
          kello<br/>
          lello<br/>
          mello<br/>
          pello<br/>
          qello<br/>
          rello<br/>
          vello<br/>
          zello<br/>
          bello<br/>
          cello<br/>
        </div>
      </div>

    

    </>
  );
}
