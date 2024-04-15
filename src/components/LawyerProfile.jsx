import React from 'react';
import rohit from './rohit.jpg';
import Navbar from './Navbar';
import Footer from './Footer';
const LawyerProfile = () => {
  const handleBookAppointment = (event) => {
    event.preventDefault();
    // Example: You might send a request to a server to book the appointment
    fetch('https://example.com/bookAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lawyerId: '123', // Example lawyer ID
        userId: '456', // Example user ID
        appointmentTime: '2024-04-11T09:00:00', // Example appointment time
      }),
    })
    .then(response => {
      if (response.ok) {
        // Appointment booked successfully, handle accordingly
        console.log('Appointment booked successfully!');
      } else {
        // Appointment booking failed, handle accordingly
        console.error('Failed to book appointment.');
      }
    })
    .catch(error => {
      // Error occurred during appointment booking, handle accordingly
      console.error('Error booking appointment:', error);
    });
  };

  return (
    <>
    <Navbar/>
    <div>
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-md-4">
            <img src={rohit} className="rounded-circle img-fluid" alt="Profile" />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <h2 className="text-center">John Doe</h2>
            <p className="text-center">Phone: 123-456-7890</p>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <h4>Experience:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec velit augue.</p>
            <h4>Description:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec velit augue.</p>
            <h4>Client Testimonials:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec velit augue.</p>
            <form onSubmit={handleBookAppointment}>
              <button type="submit" className="btn btn-success mt-3">Book Appointment</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="mt-5 p-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3 text-center">
              <img src={rohit} className="rounded-circle img-fluid" alt="Lawyer 1" />
            </div>
            <div className="col-md-3 text-center">
              <img src={rohit} className="rounded-circle img-fluid" alt="Lawyer 2" />
            </div>
            <div className="col-md-3 text-center">
              <img src={rohit} className="rounded-circle img-fluid" alt="Lawyer 3" />
            </div>
          </div>
        </div>
      </footer>
    </div>
    <Footer/>
    </>
  );
}

export default LawyerProfile;
