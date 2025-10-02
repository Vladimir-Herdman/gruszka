import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.TopBar}>
          <ul className={styles.TopBar_ul}>
            <span style={{display:'flex', flexDirection:'row'}}>
              <li><a href="news.asp">Hello</a></li>
              <li><a href="news.asp">Gruzska</a></li>
            </span>
            <span style={{display:'flex', flexDirection:'row', marginLeft:'auto'}}>
              <li><a href="contact.asp">Favorites</a></li>
              <li><a href="about.asp">Login</a></li>
            </span>
          </ul>
        </div>
      </main>
    </div>
  );
}
