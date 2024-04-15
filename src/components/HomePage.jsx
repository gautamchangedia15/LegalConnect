import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function HomePage() {
  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Legal Services Provider</h1>
        <p className="lead">
          We provide expert legal services tailored to your needs.
        </p>
        <hr className="my-4" />
        <p>
          Whether you need assistance with contracts, litigation, or legal
          advice, we're here to help.
        </p>
        <a className="btn btn-success btn-lg" href="#" role="button">
          Learn more
        </a>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h2>Our Services</h2>
          <p>
            We offer a wide range of legal services, including contract
            drafting, litigation, legal consultation, and more.
          </p>
          <a className="btn btn-success" href="#" role="button">
            View Services
          </a>
        </div>
        <div className="col-md-4">
          <h2>About Us</h2>
          <p>
            Learn more about our team of experienced lawyers and our commitment
            to providing exceptional legal services to our clients.
          </p>
          <a className="btn btn-success" href="#" role="button">
            About Us
          </a>
        </div>
        <div className="col-md-4">
          <h2>Contact Us</h2>
          <p>
            Have a question or need legal assistance? Contact us today to
            speak with one of our knowledgeable attorneys.
          </p>
          <a className="btn btn-success" href="#" role="button">
            Contact Us
          </a>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HomePage;
