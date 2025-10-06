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
