import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

const ReadStudent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentData, setStudentData] = useState([]);
  const [searchNameorCourse, setSearchNameorCourse] = useState('');
  const navigate = useNavigate()
  const getData = () => {
    Axios.get('https://68067059e81df7060eb726fd.mockapi.io/student')
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete=(id)=>{
    Axios.delete(`https://68067059e81df7060eb726fd.mockapi.io/student/${id}`).then((response)=>getData()).catch((error)=>console.log(error))
  }
  useEffect(() => {
    getData();
  }, []);
  let filteredData = studentData.filter((student) =>student.fullname.toLowerCase().includes(searchNameorCourse) || student.course.toLowerCase().includes(searchNameorCourse));
  let studentsPerPage = 10;

  let totalPages = Math.ceil(filteredData.length / studentsPerPage);
  
  let indexOfLastStudent = currentPage * studentsPerPage;
  let indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  let currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

// let filteredData,totalPages,indexOfLastStudent,indexOfFirstStudent,currentStudents
// const studentsPerPage = 10;

 // Filtered student data based on search term
 useEffect(()=>{
    filteredData = studentData.filter((student) =>student.fullname.toLowerCase().includes(searchNameorCourse) || student.course.toLowerCase().includes(searchNameorCourse));

   totalPages = Math.ceil(filteredData.length / studentsPerPage);
  
  indexOfLastStudent = currentPage * studentsPerPage;
  indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);
 },[searchNameorCourse])
  return (
    <Container fluid='md' style={{ marginTop: '5rem' }}>
      <h2>Student Data</h2>
      {studentData.length > 0 ? (
        <>
        <Form.Group className='mb-3'>
          <Form.Control type='text' placeholder='Search for Full Name or course...' value={searchNameorCourse} onChange={(e)=>setSearchNameorCourse(e.target.value)}/>
        </Form.Group>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length>0?currentStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.fullname}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <svg
                    onClick={() => navigate(`/edit/${student.id}`)}
                    style={{ cursor: 'pointer' }}
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='blue'
                    className='bi bi-pencil-square'
                    viewBox='0 0 16 16'
                  >
                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                    <path
                      fillRule='evenodd'
                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
                    />
                  </svg>
                </td>
                <td>
                  <svg
                    onClick={() => {
                      if (window.confirm('Confirm? You want to delete!')) {
                        handleDelete(student.id);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='red'
                    className='bi bi-trash-fill'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0' />
                  </svg>
                </td>
              </tr>
            )):<tr><td>No Search Result Found !!</td></tr>}
          </tbody>
        </Table>
      <Pagination style={{display:'flex',justifyContent:'center',gap:'0.5rem',alignItems:'center'}}>
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1}/>
        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}/>

        <span>Page <strong>{currentPage}</strong> of {totalPages}</span>

        <Pagination.Next onClick={() =>setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}/>

        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}/>
      </Pagination>
      </>
      ) : (
        <p>No Student Data Available !!</p>
      )}
    </Container>
  );
};

export default ReadStudent;
