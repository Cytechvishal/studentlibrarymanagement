import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { database } from '../firebase/firebase';


const FeesList = () => {
  const [month, setMonth] = useState('');
  const [hall, setHall]= useState('');
  const [feesList, setFeesList] = useState([]);

  const fetchFeesData = async () => {
    const studentCollection = collection(database, 'studentData');
    const feesCollection = collection(database, 'StudentFees');

    // Fetch all student data
    const  studentQuery = query(studentCollection, where('hall', '==', hall))
    const studentsSnapshot = await getDocs(studentQuery);
    const studentsData = studentsSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data()
      acc[data.genId] = doc.data();
      return acc;
    }, {});
    console.log('student Data:', studentsData); // Debugging line
    // Fetch fees data for the specified month
    const feesQuery = query(feesCollection, where('month', '==', month));
    const feesSnapshot = await getDocs(feesQuery);
    const feesData = feesSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      acc[data.genId] = data; // Assuming genId is a unique identifier for students
      return acc;
    }, {});
    console.log('Fees Data:', feesData); // Debugging line
    // Combine data
    const combinedData = Object.keys(studentsData).map( studentId => {
      const student = studentsData[studentId];
      const fee = feesData[studentId];
      console.log('Student ID:', studentId);
      console.log('Student Data:', student);
      console.log('Fee Data:', fee);
      return {
        
        ...student,

        amount: fee ? fee.amount : 'N/A',
        month: fee ? fee.month : 'N/A',
        todayDate: fee ? fee.todayDate : 'N/A',
        status: fee ? 'Paid' : 'Pending' // Mark as 'Pending' if no fee data exists
      };
    });

    console.log('Combined Data:', combinedData); // Debugging line
    combinedData.sort((a,b)=>{
      return Number(a.sheet) - Number(b.sheet)
    })
    console.log(combinedData)
    setFeesList(combinedData);
  };

  return (
    <Container className='hello mt-4'>
      <div inline>
        <h2>Student Fees List</h2>
        <Form inline>
        <Form.Group className="d-inline-block mr-2" controlId="formSelectHall">
            
            <Form.Select name="hall" value={hall} onChange={(e)=> setHall(e.target.value)} aria-label="Default select example" required>
            <option value="">Select-Hall</option>
              <option value="H1" > H1</option>
              <option value="H2" > H2</option>
              <option  value="H3"> H3</option>
            </Form.Select>
            </Form.Group>
          <Form.Group className='d-inline-block mr-2'>
            <Form.Control
              type='month'
              placeholder='Enter Deposit Month'
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </Form.Group>
          <Button onClick={fetchFeesData}>
            Search
          </Button>
        </Form>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Number</td>
            <td>Join Date</td>
            <td>Amount</td>
            <td>Deposit Month</td>
            <td>Deposit Date</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {feesList.length > 0 ? (
            feesList.map((fee) => (
              <tr key={fee.genId}>
                <td>{fee.genId}</td>
                <td>{fee.fullName}</td>
                <td>{fee.whatsapp}</td>
                <td>{fee.joindate}</td>
                <td>{fee.amount}</td>
                <td>{fee.month}</td>
                <td>{fee.todayDate}</td>
                <td>{fee.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default FeesList;