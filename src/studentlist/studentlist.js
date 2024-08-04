
import React, { useState, useEffect } from "react";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { database } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, doc, deleteDoc, updateDoc,  query, where, getDocs} from "firebase/firestore";
import {Row, Col} from "react-bootstrap";


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [genId, setGenId] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [joindate, setJoindate] = useState('');
  const [searchHall, setSearchHall] = useState('');
  const[hall, setHall]= useState('');
  const [sheet, setSheet] = useState('');
  const db = collection(database, 'studentData');
  
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () =>{ setShowModal(false); setEditStudent(null); }
  

  const handleHallSearch =async()=>{
    const q = query(db, where('hall', '==', searchHall));
    const querySnapshot = await getDocs(q);
    console.log(q);
    
    if(!querySnapshot.empty){
      const data = querySnapshot.docs.map(doc=> ({id:doc.id, ...doc.data()}));
      data.sort((a, b) => {
        return Number(a.sheet) - Number(b.sheet);
      });
      setStudents(data);
      console.log(data)
    }else {
      toast.error( searchHall + " hall have not Data !")
      console.log('Data Not Fetch !')
    }
  }

  const handleEdit = (student) => {
    setEditStudent(student);
    setGenId(student.genId);
    setFullName(student.fullName);
    setWhatsapp(student.whatsapp);
    setAddress(student.address);
    setJoindate(student.joindate);
    setHall(student.hall);
    setSheet(student.sheet)
   
    handleShowModal();
  };

  // student Id Generate according Hall & Sheet

  useEffect(()=>{
    if(hall && sheet){
      setGenId(`${hall}${sheet}`)
    }
  }, [hall,sheet])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(database, 'studentData', id));
        setStudents(students.filter(student => student.id !== id));
        toast.success("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student: ", error);
        toast.error("Error deleting student");
      }
    } else {
      toast.info("Student deletion canceled");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const studentRef = doc(database, 'studentData', editStudent ? editStudent.id : genId);
      if (editStudent) {
        await updateDoc(studentRef, {
          fullName,
          whatsapp,
          address,
          joindate,
          hall,
          sheet,
          genId

        
        });
        toast.success("Student updated successfully!");
      } else {
        // Add new student logic if required
      };
      handleCloseModal();
      
    } catch (error) {
      console.error("Error updating student: ", error);
      toast.error("Error updating student");
    }
    
  };



  return (
    <Container className="mt-4">
      

<Row className="align-items-center">
        <Col xs="auto">
          <h2>Student List</h2>
        </Col>
        <Col xs="auto" className="ml-auto">
          <Form inline>
            <Form.Group className="d-inline-block">
              <Form.Select name="searchHall" value={searchHall} onChange={(e)=> setSearchHall(e.target.value)} aria-label="Default select example" required>
                <option value="">Select-Hall</option>
                <option value="H1">H1</option>
                <option value="H2">H2</option>
                <option value="H3">H3</option>
              </Form.Select>
             
            </Form.Group>
            <Button onClick={handleHallSearch}>Search</Button>
          </Form>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>WhatsApp Number</th>
              <th>Address</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td style={{backgroundColor:"yellow"}}>{student.genId}</td>
                <td>{student.fullName}</td>
                <td>{student.whatsapp}</td>
                <td>{student.address}</td>
                <td>{student.joindate}</td>
                
                <td>
                  <Button variant="warning" onClick={() => handleEdit(student)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ): (
            <tr>
            <td colSpan="7" className="text-center">No data available</td>
          </tr>
          )
            }
          </tbody>
        </Table>
      </div>

      <ToastContainer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>

          <Form.Group className="d-inline-block">
          <Form.Label>Select Hall</Form.Label>
              <Form.Select name="hall" value={hall} 
              onChange={(e)=> setHall(e.target.value)} 
              aria-label="Default select example" required>

                <option value="">Select-Hall</option>
                <option value="H1">H1</option>
                <option value="H2">H2</option>
                <option value="H3">H3</option>

              </Form.Select>   
            </Form.Group>
            
            <Form.Group className="d-inline-block" controlId="formSheetNum">
              <Form.Label>Sheet Num</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sheet Number"
                name="sheet"
                value={sheet}
                onChange={(e)=> setSheet(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStudentId">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student ID"
                name="genId"
                value={genId}
                onChange={(e) => setGenId(e.target.value)}
                required
                
              />
            </Form.Group>

            <Form.Group controlId="formStudentName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formJoinDate">
              <Form.Label>Join Date</Form.Label>
              <Form.Control
                type="date"
                name="joindate"
                value={joindate}
                onChange={(e) => setJoindate(e.target.value)}
                required
              />
            </Form.Group>
           
            <br />
            <Button className="sbt" variant="primary" type="submit">
              {editStudent ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>

  );
};

export default StudentList;

