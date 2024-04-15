import React from 'react';
import rohit from './rohit.jpg'
import Navbar from './Navbar';
import Footer from './Footer';
const LawyerProfile = () => {
  const handleChat = () => {
    // Add logic to handle chat functionality
    console.log('Initiating chat...');
  };

  const handleEdit = () => {
    // Add logic to handle edit functionality
    console.log('Editing profile...');
  };

  const handleReview = () => {
    // Add logic to handle review functionality
    console.log('Viewing reviews...');
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={handleEdit}>Edit</button>&nbsp;
        <button className="btn btn-success" onClick={handleChat}>Chat</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img src={rohit} className="rounded-circle img-fluid" alt="Profile" />
          <h2 className="mt-3">John Doe</h2>
          <p>Email: johndoe@example.com</p>
          <p>Speciality: Criminal Defense</p>
        </div>
        <div className="col-md-8">
          <h3>Ongoing Cases</h3>
          <textarea className="form-control mb-3" rows="5" readOnly>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec velit augue.
          </textarea>
          <h3>Past Cases Resolved</h3>
          <textarea className="form-control mb-3" rows="5" readOnly>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec velit augue.
          </textarea>
          <button className="btn btn-success" onClick={handleReview}>View Reviews</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};
export default LawyerProfile;
