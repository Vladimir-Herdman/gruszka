import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./loginPopup.module.css"

type LoginPopupProps = {
  setShowLoginPopup: Dispatch<SetStateAction<boolean>>;
};
export default function LoginPopup({setShowLoginPopup}: LoginPopupProps) {
  const handleExit = () => {
    setShowLoginPopup(false);
  }

  useEffect(() => {
    const handleEscapePressed = (e: KeyboardEvent) => {e.key === "Escape" && handleExit();};
    window.addEventListener("keydown", handleEscapePressed);
    return () => {window.removeEventListener("keydown", handleEscapePressed);};
  }, []);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.loginContainer}>
          <div className={styles.exitButton} onClick={handleExit}></div>
          <InputRow title="Email" placeholder="example@email.com"/>
          <InputRow title="Password"/>
          <div className={styles.buttonSection}>
            <button className={styles.button} onClick={() => {console.log("apple")}}>Login</button>
            <button className={styles.button}>Create Account</button>
            <p className={styles.or}>or</p>
            <p style={{textAlign:'center', fontSize:'0.9rem'}}>
              By continuing, you agree to the <u>Terms of Sale</u>, <u>Terms of Service</u>, and <u>Privacy Policy</u>.
            </p>
            <button className={styles.button}><b>Continue with Google</b></button>
          </div>
        </div>
      </div>
    </>
  );
}

type InputBarProps = {
  title: string;
  placeholder?: string;
};
function InputRow({title, placeholder}: InputBarProps) {
  return (
    <div className={styles.inputRow}>
      <p>{title}:</p>
      <input
        type="text"
        placeholder={placeholder || ""}
        className={styles.input}
      />
    </div>
  );
}
