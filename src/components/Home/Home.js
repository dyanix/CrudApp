import React, { useState } from "react";
import AddStudent from "./AddStudent";
import ManageStudent from "./ManageStudent";
import Logout from "./Logout";
import styles from "./Home.module.css";
import { VscOrganization } from "react-icons/vsc";
import { VscListUnordered } from "react-icons/vsc";

function Home() {
  const [currentPage, setCurrentPage] = useState("Add Student");

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div style={{ display: "flex" }}>
          <div >
            <div
              style={{

                padding: "10px",
                borderRadius: "1em",
                backgroundColor: currentPage === "Add Student" ? " #9900ff" : "",
                color: currentPage === "Add Student" ? "white" : "black",
              }}
            >
              <p
                onClick={() => setCurrentPage("Add Student")}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <VscOrganization />  Add Student
              </p>
            </div>
            <div
              style={{
                padding: "10px",
                borderRadius: "1em",
                backgroundColor: currentPage === "Manage Students" ? " #9900ff" : "",
                color: currentPage === "Manage Students" ? "white" : "black",
              }}
            >
              <p
                onClick={() => setCurrentPage("Manage Students")}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                <VscListUnordered /> Manage Students
              </p>
            </div>
            <p style={{ width: "100%", padding: "20px" }}><Logout /></p>
          </div>
          <div style={{ width: "80%", padding: "20px" }}>
            {currentPage === "Add Student" ? (
              <AddStudent />
            ) : (
              <ManageStudent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
