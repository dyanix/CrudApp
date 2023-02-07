import React, { useState } from 'react';
import InputControl from "../InputControl/InputControl";
import styles from "./Home.module.css";
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddStudent() {

    const [firstName, setFirstName] = useState(null);
    const [middleName, setMiddleName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [classNumber, setClassNumber] = useState(null);
    const [division, setDivision] = useState(null);
    const [rollNumber, setRollNumber] = useState(null);
    const [addressLine1, setAddressLine1] = useState(null);
    const [addressLine2, setAddressLine2] = useState(null);
    const [landmark, setLandmark] = useState(null);
    const [city, setCity] = useState(null);
    const [pincode, setPincode] = useState(null);


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "middleName") {
            setMiddleName(value);
        }

        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "classNumber") {
            setClassNumber(value);
        }
        if (id === "division") {
            setDivision(value);
        }
        if (id === "rollNumber") {
            setRollNumber(value);
        }
        if (id === "addressLine1") {
            setAddressLine1(value);
        }
        if (id === "addressLine2") {
            setAddressLine2(value);
        }
        if (id === "landmark") {
            setLandmark(value);
        }
        if (id === "city") {
            setCity(value);
        }
        if (id === "pincode") {
            setPincode(value);
        }
    }

   

    const handleSubmit = async (e) => {
        if(!firstName || !middleName || !lastName || !classNumber || !division ||  !rollNumber|| !addressLine1 || !landmark || !city || !pincode){
            toast.error("Please provide value in each input field")
        }
        else{
            
            const studentRef = await addDoc(collection(db, "students"), {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                classNumber: classNumber,
                division: division,
                rollNumber: rollNumber,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                landmark: landmark,
                city: city,
                pincode: pincode,
               
            });
            console.log("Document written with ID: ", studentRef.id);
            toast.success("Student added successfully");
        }
       
        
    }


    return (
        <div >
            <div className={styles.innerBox} >
            <h1 style={{textDecoration:"underline" , color:"purple"}}>Add Student </h1>


                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label for="firstName"> </label>
                        <InputControl type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" required />
                    </div>
                    <div >
                        <label for="middleName"></label>
                        <InputControl type="text" value={middleName} onChange={(e) => handleInputChange(e)} id="middleName" placeholder="Middle Name" required />
                    </div>
                    <div >
                        <label for="lastName"></label>
                        <InputControl type="text" value={lastName} onChange={(e) => handleInputChange(e)} id="lastName" placeholder="Last Name" required />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label for='classNumber'></label>
                        <select style={{ width: "150px", height: "35px" }} id='classNumber' onChange={(e) => handleInputChange(e)} placeholder="classNumber" value={classNumber} required>
                            <option >
                                Select Class
                            </option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                        </select>
                    </div>
                    <div>
                        <label for='division'></label>
                        <select style={{ width: "150px", height: "35px" }} id='division' onChange={(e) => handleInputChange(e)} placeholder="division" value={division} required>
                            <option>
                                Select Division
                            </option>
                            <option value='A'>A</option>
                            <option value='B'>B</option>
                            <option value='C'>C</option>
                            <option value='D'>D</option>
                            <option value='E'>E</option>
                        </select>
                    </div>
                    <div>
                        <label for='rollNumber'></label>
                        <InputControl
                       
                            type='number'
                            id='rollNumber'
                            onChange={(e) => handleInputChange(e)}
                            value={rollNumber}                      
                            pattern='[0-9]{2}'
                            maxLength='2'
                            min="1" 
                           
                            placeholder="Roll Number"
                            required
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label for='addressLine1'> </label>
                        <textarea
                            style={{ width: "250px", height: "35px", textAlign: "center", display: "block" }}
                            id='addressLine1'
                            onChange={(e) => handleInputChange(e)}
                            value={addressLine1}
                            placeholder="Address Line1"
                            required
                        />
                    </div>
                    <div>
                        <label for='addressLine2'> </label>
                        <textarea
                            style={{ width: "250px", height: "35px", textAlign: "center", display: "block" }}
                            id='addressLine2'
                            onChange={(e) => handleInputChange(e)}
                            value={addressLine2}
                            placeholder="Address Line2"

                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label for='landmark'></label>
                        <InputControl
                            type='text'
                            id='landmark'
                            onChange={(e) => handleInputChange(e)}
                            value={landmark}
                            placeholder="Landmark"
                            required
                        />
                    </div>
                    <div>
                        <label for='city'></label>
                        <InputControl
                            type='text'
                            id='city'
                            onChange={(e) => handleInputChange(e)}
                            value={city}
                            placeholder="City"
                            required
                        />
                    </div>
                    <div>
                        <label for='pincode'></label>
                        <InputControl
                            type='number'
                            id='pincode'
                            onChange={(e) => handleInputChange(e)}
                            value={pincode}
                            pattern='[0-9]{6}'
                            maxLength='6'
                            min="100000"
                           
                            placeholder="Pincode"
                            required
                        />
                    </div>
                </div>

                <div >
                    <button className={styles.AddButton} onClick={() => handleSubmit()} type="submit" >Add Student</button>
                </div>
            </div>
        </div>

    );
}

export default AddStudent;