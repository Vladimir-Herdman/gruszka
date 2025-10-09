import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { registerNewUser, signInExistingUser, signInWithGoogle } from "@/_login/firebase";
import styles from "./loginPopup.module.css"

type LoginPopupProps = {
  setShowLoginPopup: Dispatch<SetStateAction<boolean>>;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};
export default function LoginPopup({setShowLoginPopup, setLoggedIn}: LoginPopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkEmail = (e: string): boolean => {
    return true;
  };

  const handleLogin = async () => {
    const result = await signInExistingUser(email, password);
    if (result) {setLoggedIn(true); setShowLoginPopup(false)};
  };
  const handleCreateAccount = async () => {
    const result = await registerNewUser(email, password);
    if (result) {setLoggedIn(true); setShowLoginPopup(false)};
  };
  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (result) {setLoggedIn(true); setShowLoginPopup(false)};
  };

  const handleEscape = () => {setShowLoginPopup(false);}
  useEffect(() => {
    const handleEscapePressed = (e: KeyboardEvent) => {e.key === "Escape" && handleEscape();};
    window.addEventListener("keydown", handleEscapePressed);

    //return is called when loginPopup leaves DOM in main scope when setShowLoginPopup is set false
    return () => {window.removeEventListener("keydown", handleEscapePressed);};
  }, []); //empty list means call useEffect once when element is first rendered to DOM, so when setShowLoginPopup is set true

  return (
    <>
      <div className={styles.background}>
        <div className={styles.loginContainer}>
          <div className={styles.exitButton} onClick={handleEscape}></div>
          <InputRow title="Email" placeholder="example@email.com" setFunc={setEmail}/>
          <InputRow title="Password" setFunc={setPassword} type="password" />
          <div className={styles.buttonSection}>
            <button className={styles.button} onClick={handleLogin}>Login</button>
            <button className={styles.button} onClick={handleCreateAccount}>Create Account</button>
            <p className={styles.or}>or</p>
            <p style={{textAlign:'center', fontSize:'0.9rem'}}>
              By continuing, you agree to the <u>Terms of Sale</u>, <u>Terms of Service</u>, and <u>Privacy Policy</u>.
            </p>
            <button className={styles.button} onClick={handleGoogleLogin}>
              <svg /*Google logo*/ width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.20468C17.64 8.5665 17.5827 7.95286 17.4764 7.36377H9V10.8451H13.8436C13.635 11.9701 13.0009 12.9233 12.0477 13.5615V15.8197H14.9564C16.6582 14.2529 17.64 11.9456 17.64 9.20468Z" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"></path>
              </svg>
              <b>Continue with Google</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type InputBarProps = {
  title: string;
  placeholder?: string;
  setFunc: Dispatch<SetStateAction<string>>;
  type?: string;
};
function InputRow({title, placeholder, setFunc, type}: InputBarProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputRow}>
      <p>{title}:</p>
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : ("text")}
        placeholder={placeholder || ""}
        className={styles.input}
        onChange={(e) => {setFunc(e.target.value)}} />
      {type === "password" && (
        showPassword
          ? <svg onClick={()=>{setShowPassword(!showPassword)}} className={styles.passwordEye} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28"><path fill="#000" fillRule="evenodd" d="M17.747 15.415c.238-.54.372-1.143.372-1.413 0-2.348-1.824-4.25-4.073-4.25s-4.073 1.902-4.073 4.25 2.037 3.887 4.073 3.887c1.303 0 2.462-.637 3.206-1.63a4.3 4.3 0 0 0 .495-.844m-3.701.349c.51 0 .975-.196 1.332-.518.432-.39.622-.965.622-1.244 0-1.174-.828-2.126-1.954-2.126S12 12.826 12 14c0 .81.92 1.764 2.046 1.764" clipRule="evenodd"/><path fill="#000" fillRule="evenodd" d="M1.092 14.272a.45.45 0 0 1 0-.545q.015-.018.028-.039C4.78 8.343 9.32 5.5 14.014 5.5c4.689 0 9.224 2.836 12.882 8.17a.58.58 0 0 1-.01.676C23.23 19.67 18.698 22.5 14.014 22.5c-4.705 0-9.257-2.857-12.922-8.228m2.847-.92a1.04 1.04 0 0 0 0 1.294c3.135 3.898 6.665 5.729 10.075 5.729s6.94-1.83 10.075-5.728a1.04 1.04 0 0 0 0-1.295c-3.135-3.897-6.665-5.727-10.075-5.727s-6.94 1.83-10.075 5.727" clipRule="evenodd"/></svg>
          : <svg onClick={()=>{setShowPassword(!showPassword)}} className={styles.passwordEye} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2 2 20 20M6.713 6.723C3.665 8.795 2 12 2 12s3.636 7 10 7c2.05 0 3.817-.727 5.271-1.712M11 5.058A9 9 0 0 1 12 5c6.364 0 10 7 10 7s-.692 1.332-2 2.834"/><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 14.236a3 3 0 0 1-4.13-4.348"/></svg>
      )}
    </div>
  );
}
