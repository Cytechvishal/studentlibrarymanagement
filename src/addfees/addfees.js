
import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { database } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";


const AddFees = () => {
    const [genId, setGenId] = useState('')
  const [formdata, setFormdata] = useState({
    fullName: '',
    whatsapp: '',
    address: '',
    joindate:'',
    amount:'',
    month:'',
    todayDate: '',
    // adhar: null // Changed from '' to null
  });

  const db = collection(database, 'studentData')
  const dbf = collection(database, 'StudentFees');
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setFormdata({
        ...formdata,
        [name]: value
      });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual validation for file input
  

    // const q = query(db, where('genId', '==', formdata.genId));
    // const querySnapshot = await getDocs(q);

    // if (!querySnapshot.empty) {
    //   toast.error("Student ID already exists. Please use a different ID.");
    //   return;
    // }

    // const n = query(db, where('whatsapp', '==', formdata.whatsapp));
    // const querynumber = await getDocs(n);
    // if (!querynumber.empty) {
    //   toast.error("Number already exists. Please use a different Number!");
    //   return;
    // }

    await addDoc(dbf, {
      genId:genId,
      fullName: formdata.fullName,
      whatsapp: formdata.whatsapp,
      address: formdata.address,
      joindate: formdata.joindate,
      amount:formdata.amount,
      month:formdata.month,
      todayDate:formdata.todayDate
      
    })
      .then(() => {
        toast.success("Student Id " + genId + " Fees Add Successfully!");

        // Clear the form after submission
        setGenId('')
        setFormdata({
          
          fullName: '',
          whatsapp: '',
          address: '',
          joindate: '',
          amount:'',
          month:'',
          todayDate:''
          
        });
      })
      .catch(() => {
        toast.error("Data Not Sent!");
      });
  };

  const handleFetch =async()=>{
    const q = query(db, where('genId', '==', genId));
    const fetchData = await getDocs(q);
    if(!fetchData.empty){
      const data = fetchData.docs[0].data();
      console.log(data)
      setFormdata({
        ...formdata,
        fullName:data.fullName,
        whatsapp:data.whatsapp,
        address:data.address,
        joindate:data.joindate
      })
    }else {
      toast.error("Student Id Not Fetch, Check Id !" )
      console.log(" not fetch data !")
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col className="formcol" md={5}>
          <h2>Add Student Fees</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStudentId">
              <Form.Label>Student Id</Form.Label>
              <Button onClick={handleFetch}>Fetch</Button>
              <Form.Control
                type="text"
                placeholder="Enter student ID"
                name="genId"
                value={genId}
                onChange={(e)=> setGenId(e.target.value.toUpperCase())}
                
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

            <Form.Group controlId="formamount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Fees"
                name="amount"
                value={formdata.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFeesMonth">
              <Form.Label>Due Month</Form.Label>
              <Form.Control
                type="month"
                placeholder="Enter Fees Month"
                name="month"
                value={formdata.month}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formtodayDate">
              <Form.Label>Today Date</Form.Label>
              <Form.Control
                type="date"
                name="todayDate"
                value={formdata.todayDate}
                onChange={handleChange}
                required
              />
            </Form.Group>




            <br />
            <Button className="sbt" variant="primary" type="submit">
              Submit Fees
            </Button>
          </Form>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default AddFees;

