import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import "./UserRegister.css"
import {Modal,Button} from "react-bootstrap"
import axios from 'axios'
import backendServer from "../../webConfig";
import { useNavigate } from 'react-router-dom';
import LandingNavbar from "../LandingNavbar/LandingNavbar";

function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [otp, setOtp] = useState("");
  const [backendotp, setBackendOtp] = useState("");
  const[patient, setPatient] = useState({});
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const[validationText, setValidation] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let navigate = useNavigate();


  const loginSubmit = (e) => {
    e.preventDefault()
    let data={
      firstName:firstName,
      lastName:lastName,
      email:email,
      dob:dateOfBirth,
      middleName:middleName,
      gender:gender,
      password:password,
      lastName:lastName,
      address:{
          street:street,
          apt:apartmentNumber,
          city:city,
          state:state,
          zipcode:parseInt(zipCode)

      }
    }
    console.log("DATA",data)

    axios.get(`${backendServer}/getBackendOtp?email=`+data.email).then((response) => {
      console.log('Got response data', response.data);
      handleShow();
      console.log(response.data)
      console.log(response.status)
      console.log("Response", response);
      // console.log(response.data.code)
      setBackendOtp(response.data);
      
      // navigate('/adminDashboard');
  }).catch((error)=>{
    alert(error.response.data)
  });

  };

  const handleOtp = (e) =>{
    e.preventDefault();




    if(otp == backendotp){

      let data={
        firstName:firstName,
        lastName:lastName,
        email:email,
        dob:dateOfBirth,
        middleName:middleName,
        gender:gender,
        password:password,
        lastName:lastName,
        address:{
            street:street,
            apt:apartmentNumber,
            city:city,
            state:state,
            zipcode:parseInt(zipCode)
  
        }
      }


      axios.post(`${backendServer}/signup`, data).then((response) => {
        console.log('Got response data', response.data);
        // handleShow();
        console.log(response.status)
        console.log("Response", response);
        // setBackendOtp(response.data.code);
        setPatient(response.data.patient);
        // navigate('/adminDashboard');
        if(response.data.patient.adminBoolean == true){
          console.log("Navigate to admin page!");
          console.log(response.data.patient)
          localStorage.setItem('patientDetails',JSON.stringify(response.data.patient))
          navigate('/adminDashboard')
          
      }else{
        console.log("Navigate to patient dashboard");
        localStorage.setItem('patientDetails',JSON.stringify(response.data.patient))
        navigate('/patientDashboard')
      }

    }).catch((error)=>{
      console.log(error)
    });

    //   if(patient.adminBoolean == true){
    //       console.log("Navigate to admin page!");
    //       localStorage.setItem('patientDetails',JSON.stringify(patient))
    //       navigate('/adminDashboard')
          
    //   }else{
    //     console.log("Navigate to patient dashboard");
    //     navigate('/patientDashboard')
    //   }

    }else{
      setValidation("Wrong Otp!");
    }


  }



  const states=[
     "Alabama",
     "Alaska",
     "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Federated States Of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
     "Wyoming"
]

  return (
    <div className="App">
      <LandingNavbar/>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" style={{borderStyle:"solid",marginTop:"6%"}}>
            <center><h4>USER REGISTRATION</h4></center>
            <br/>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
              <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="First Name"
                  name="First Name"
                  required
                  placeholder="Enter First Name"
                  
                  onChange={(event) => setFirstName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Middle Name"
                  name="Middle Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Middle Name"
                  required
                  onChange={(event) => setMiddleName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                 <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Last Name"
                  name="Last Name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Last Name"
                  required
                  onChange={(event) => setLastName(event.target.value)}
                />
                </div>
                 <br/>
                
                 <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                </div>
                 <br/>
              
              <div className="form-group">
                <label>Create Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                </div>
                <br/>

                <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date" id="txtDate"
                  className="form-control"
                  
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
                </div>
                 <br/>

                 <div className="form-group">
                 <label>Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="StreetAddress"
                  name="Street Address"
                  aria-describedby="emailHelp"
                  placeholder="Enter Street Address"
                  required
                  onChange={(event) => setStreet(event.target.value)}
                />
                </div>
                <br/>

                <label>Apartment Number</label>
                <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="ApartmentNumber"
                  name="Apartment Number"
                  aria-describedby="emailHelp"
                  placeholder="Number"
                  required
                  onChange={(event) => setApartmentNumber(event.target.value)}
                />
                </div>

                <br/>


                <label>City</label>
                <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="City"
                  aria-describedby="emailHelp"
                  placeholder="Number"
                  onChange={(event) => setCity(event.target.value)}
                />
                </div>

                <br/>
                

                <label>State</label>
                <Autocomplete
                                        className='searchContainer'
                                        id='combo-box-demo'
                                        options={states}
                                        getOptionLabel={(option) => option}
                                        style={{ width: "relative" }}
                                        renderInput={(params) => (
                                            <TextField
                                                style={{marginTop:"7px"}}
                                                {...params}
                                                required
                                                variant='outlined'
                                                InputLabelProps={{ style: { padding: '0px 0px', color: '#555555', fontSize: 10.5 } }}
                                            />
                                        )}
                                        onChange={(event, newValue) => {
                                          setState(newValue);
                                          
                                        }}
                                    />
                <br/>


                <label>Zip Code</label>
                <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="Zip Code"
                  aria-describedby="emailHelp"
                  placeholder="Enter Zip Code"
                  onChange={(event) => setZipCode(event.target.value)}
                />
                </div>

                <br/>


                <div className="form-group">
                 <label for="show">Gender<br/></label><br/>
                 <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="male"
              name="gender"
              type="radio"
              value="m"
              value="Male"
              onChange={(event) => {
                setGender(event.target.value);
              }}
            />
              &nbsp; Male
              <br/>
              <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="male"
              name="gender"
              type="radio"
              value="Female"
              // checked={this.state.gender === "male"}
              onChange={(event) => {
                setGender(event.target.value);
                
              }}
            />
              &nbsp; Female
              <br/>
              <input
              // onChange={e => console.log(e.currentTarget.value)}
              id="other"
              name="gender"
              type="radio"
              value="Other"
              // checked={this.state.gender === "male"}
              onChange={(event) => {
                setGender(event.target.value);
                
              }}
            />
              &nbsp; Other

              
              </div>
              <div className="form-group form-check">
              
              <center><button type="submit" className="btn btn-primary" style={{backgroundColor:"#7C0200"}}>
                Register
              </button></center>
              
              </div>
            </form>
          </div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Verification Code</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
              <div className="form-group">
                 <label>Verify OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="OTP"
                  aria-describedby="emailHelp"
                  placeholder="Enter OTP"
                  onChange={(event) => setOtp(event.target.value)}
                />
                </div>
                 <br/>
                 {validationText}
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="primary" onClick={(event)=>{
                  handleOtp(event);
                }}>
                  Verify
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>
    </div>
  );
}
export default App;
