
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container} from "react-bootstrap";
import { database } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const RegistrationForm = () => {
  const [formdata, setFormdata] = useState({
    genId: '',
    fullName: '',
    whatsapp: '',
    address: '',
    joindate: '',
    hall: '',
    sheet: ''
    // adhar: null // Changed from '' to null
  });

  const db = collection(database, 'studentData');

  // student Id Generate according Hall & Sheet

  useEffect(()=>{
    if(formdata.hall && formdata.sheet){
      setFormdata((prevData)=>({
        ...prevData,
        genId:`${formdata.hall}${formdata.sheet}`
      }))
    }
  }, [formdata.hall, formdata.sheet])

  // Form Control value change 
  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setFormdata({
        ...formdata,
        [name]: value
      });
    
  };

  // Submit Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation for file input
  

    const q = query(db, where('genId', '==', formdata.genId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error("Student ID already exists. Please use a different ID.");
      return;
    }

    const n = query(db, where('whatsapp', '==', formdata.whatsapp));
    const querynumber = await getDocs(n);
    if (!querynumber.empty) {
      toast.error("Number already exists. Please use a different Number!");
      return;
    }

    await addDoc(db, {
      genId: formdata.genId.toUpperCase(),
      fullName: formdata.fullName.toUpperCase(),
      whatsapp: formdata.whatsapp,
      address: formdata.address.toUpperCase(),
      joindate: formdata.joindate,
      hall:formdata.hall,
      sheet:formdata.sheet
      
    })
      .then(() => {
        toast.success("Data Sent Successfully!");

        // Clear the form after submission
        setFormdata({
          genId: '',
          fullName: '',
          whatsapp: '',
          address: '',
          joindate: '',
          hall:'',
          sheet: ''
          

          
        });
      })
      .catch(() => {
        toast.error("Data Not Sent!");
      });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col className="formcol" md={5}>
          <h2>Student Registration Form</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="d-inline-block mr-2" controlId="formSelectHall">
            <Form.Label>Select Hall</Form.Label>
            <Form.Select name="hall" value={formdata.hall} onChange={handleChange} aria-label="Default select example" required>
            <option value="">Select-Hall</option>
              <option value="H1" > H1</option>
              <option value="H2" > H2</option>
              <option  value="H3"> H3</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="d-inline-block" controlId="formSheetNum">
              <Form.Label>Sheet Num</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sheet Number"
                name="sheet"
                value={formdata.sheet}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStudentId">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="student ID"
                name="genId"
                value={formdata.genId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStudentFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="fullName"
                value={formdata.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStudentWhatsApp">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="text"
                maxLength={10}
                minLength={10}
                placeholder="Enter WhatsApp Number"
                name="whatsapp"
                value={formdata.whatsapp}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStudentAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={formdata.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formJoinDate">
              <Form.Label>Join Date</Form.Label>
              <Form.Control
                type="date"
                name="joindate"
                value={formdata.joindate}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <br />
            <Button className="sbt" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
