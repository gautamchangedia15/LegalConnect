import React,{useState} from 'react'
import Footer from './Footer';
import Navbar from './Navbar';

function BookAppointment() {
    const [selectedCase, setSelectedCase] = useState('');

  // Function to handle change in the selected option
  const handleCaseChange = (event) => {
    setSelectedCase(event.target.value);
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <h1 style={{ fontSize: '20px', textAlign: 'center' }}>Book Appointment</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <form >
            <div class="mb-3">
               <label Labelfor="exampleFormControlInput1" className="form-label">Name</label>
               <input type="text" className="form-control" id="exampleFormControlInput1" />
            </div>
    <div class="mb-3">
              <label Labelfor="exampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
    </div>
    <div class="mb-3">
              <label Labelfor="exampleFormControlInput1" className="form-label">Contact</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" />
    </div>
    <div class="mb-3">
              <label Labelfor="exampleFormControlInput1" className="form-label">City</label>
              <input type="email" className="form-control" id="exampleFormControlInput1"/>
    </div>
    <div class="mb-3">
<label htmlFor="courtCaseType">Select Court Case Type:</label>
      <select id="courtCaseType" value={selectedCase} onChange={handleCaseChange}>
        <option value="">Select a type</option>
        <option value="Civil">Civil Case</option>
        <option value="Criminal">Criminal Case</option>
        <option value="Family">Family Case</option>
        <option value="Property">Property Dispute</option>
        
      </select>

      
      {selectedCase && <p>Selected Court Case Type: {selectedCase}</p>}
</div>
    <div class="mb-3">
  <label Labelfor="exampleFormControlTextarea1" className="form-label">Case Detail</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>

<div class="mb-3">
  <label Labelfor="exampleFormControlTextarea1" className="form-label">Any comments</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<button className="btn btn-success" type="submit">Book Appointment</button>
</form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
</>
  )
}

export default BookAppointment