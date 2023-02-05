import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase'
import styles from "./Home.module.css";
import "./ManageStudent.css";
import InputControl from "../InputControl/InputControl";

import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri"

function ManageStudent() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [mode, setMode] = useState("");
  const [editingStudent, setEditingStudent] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setStudents(list);
        console.log(list);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData()
  }, []);

  const handleView = student => {
    setSelectedStudent(student);
    setMode("view");
  };

  const handleEdit = student => {
    setSelectedStudent(student);
    setEditingStudent({...student});
    setMode("edit");
  };

  const handleChange = (e) => {
    setEditingStudent({...editingStudent, [e.target.name]: e.target.value});
  };

  
      
  

const handleSave = async (student) => {
    try {
      const documentRef =  doc(db, "students" ,student );
         await updateDoc(documentRef,{
        firstName: editingStudent.firstName,
        middleName: editingStudent.middleName,
        lastName: editingStudent.lastName,
        classNumber: editingStudent.classNumber,
        division: editingStudent.division,
        rollNumber: editingStudent.rollNumber,
        addressLine1: editingStudent.addressLine1,
        addressLine2: editingStudent.addressLine2,
        landmark: editingStudent.landmark,
        city:editingStudent.city,
        pincode :editingStudent.pincode

      });
      console.log("Document written with ID: ", documentRef.id);
      setStudents(students.map(student => student.id === editingStudent.id ? editingStudent : student));
      setMode("view");
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        setStudents(students.filter((s) => s.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  return (
    <div className={styles.innerBox} >
      <table id="students">
        <thead>
          <tr>
            <th> Name</th>
            <th>Class</th>
            <th>Roll Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.firstName} {student.middleName} {student.lastName}</td>
              <td>{student.classNumber}-{student.division}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button style={{ marginRight: "10px" , color: "#6a14a3" }} onClick={() => handleView(student)}><AiOutlineEye /></button>
                <button style={{ marginRight: "10px" , color: "#6a14a3" }} onClick={() => handleEdit(student)}><BsPencil /></button>
                <button style={{ marginRight: "10px" ,color: "#6a14a3"}} onClick={() => handleDelete(student.id)}><RiDeleteBinLine /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mode === "view" && (
        <div className={styles.innerBox}>
          <h2 style={{textDecoration:"underline" , color:"purple"}}>Student Details</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ marginRight: "15px" }}><b>First Name: </b> {selectedStudent.firstName}</p>
            <p style={{ marginRight: "15px" }}><b>Middle Name:</b> {selectedStudent.middleName}</p>
            <p style={{ marginRight: "15px" }}><b>Last Name:</b> {selectedStudent.lastName}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ marginRight: "15px" }}><b>Class:</b> {selectedStudent.classNumber}</p>
            <p style={{ marginRight: "10px" }}><b>Division:</b> {selectedStudent.division}</p>
            <p style={{ marginRight: "15px" }}><b>Roll Number:</b> {selectedStudent.rollNumber}</p>
          </div>
          <p><b>Address Line 1:</b> {selectedStudent.addressLine1}</p>
          <p><b>Address Line 2:</b> {selectedStudent.addressLine2}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ marginRight: "15px" }}><b>Landmark:</b> {selectedStudent.landmark}</p>
            <p style={{ marginRight: "15px" }}><b>City:</b> {selectedStudent.city}</p>
            <p style={{ marginRight: "15px" }}><b>Pincode:</b> {selectedStudent.pincode}</p>
          </div>
        </div>
      )}
      {mode === "edit" && (
  <div className={styles.innerBox}>
    <h2 style={{textDecoration:"underline" , color:"purple"}}>Edit Student Details</h2>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p style={{ marginRight: "15px" }}><b>First Name: </b> 
        <InputControl type="text" name="firstName" value={editingStudent.firstName} onChange={handleChange} />
      </p>
      <p style={{ marginRight: "15px" }}><b>Middle Name:</b> 
        <InputControl type="text" name="middleName" value={editingStudent.middleName} onChange={handleChange} />
      </p>
      <p style={{ marginRight: "15px" }}><b>Last Name:</b> 
        <InputControl type="text" name="lastName" value={editingStudent.lastName} onChange={handleChange} />
      </p>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p style={{ marginRight: "15px" }}><b>Landmark: </b> 
        <InputControl type="text" name="firstName" value={editingStudent.landmark} onChange={handleChange} />
      </p>
      <p style={{ marginRight: "15px" }}><b>City:</b> 
        <InputControl type="text" name="middleName" value={editingStudent.city} onChange={handleChange} />
      </p>
      <p style={{ marginRight: "15px" }}><b>Pincode:</b> 
        <InputControl type="text" name="lastName" value={editingStudent.pincode} onChange={handleChange}  pattern='[0-9]{6}'maxLength='6' />
      </p>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label for='addressLine1'> </label>
                        <textarea
                            style={{ width: "250px", height: "35px", textAlign: "center", display: "block" }}
                            name='addressLine1'
                            onChange={handleChange}
                            value={editingStudent.addressLine1}
                            placeholder="Address Line1"
                            required
                        />
                    </div>
                    <div>
                        <label for='addressLine2'> </label>
                        <textarea
                            style={{ width: "250px", height: "35px", textAlign: "center", display: "block" }}
                            name='addressLine2'
                            onChange={handleChange}
                            value={editingStudent.addressLine2}
                            placeholder="Address Line2"

                        />
                    </div>
                </div>
    
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p style={{ marginRight: "15px" }}><b>Class:</b> 
        <InputControl type="text" name="classNumber" value={editingStudent.classNumber} onChange={handleChange} />
      </p>
      <p style={{ marginRight: "10px" }}><b>Division:</b> 
        <InputControl type="text" name="division" value={editingStudent.division} onChange={handleChange} />
      </p>
      <p style={{ marginRight: "10px" }}><b>Roll Number:</b> 
        <InputControl type="text" name="rollNumber" value={editingStudent.rollNumber} onChange={handleChange} />
      </p>
    </div>
    <button className={styles.AddButton} onClick={handleSave}>Save</button>
    </div>

    
    
      )}
    </div>
  );
}

export default ManageStudent;
