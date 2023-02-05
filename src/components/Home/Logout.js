import React from "react";
import styles from './Logout.module.css';
import { VscArrowRight } from "react-icons/vsc";


const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <button  className={styles.logoutButton} onClick={handleLogout}><VscArrowRight/> Logout</button>
    </div>
  );
};

export default Logout;
