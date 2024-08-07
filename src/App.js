import logo from "./logo.svg";
import "./App.css";
import Home from "./HomePage/Home/Home";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./Components/Login/Authen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";
import Booking from "./HomePage/Booking/Booking";
import Service from "./HomePage/Service/Service";
import Blog from "./HomePage/Blog/Blog";
import About from "./HomePage/About/About";
import ProfileCustomer from "./Customer/Profile/ProfileCust";
import ManageDoctor from "./Admin/ManageDoctor/ManageDoctor";
import ManageAppointment from "./Admin/ManageAppointment/ManageAppointment";
import AddDoctor from "./Admin/ManageDoctor/AddDoctor";
import RegisterPet from "./Customer/Profile/RegisterPet";
import CustomerPet from "./Customer/Profile/CustomerPet";
import AddPet from "./Customer/Profile/AddPet";
import UpdateDoctor from "./Admin/ManageDoctor/UpdateDoctor";
import CustomerBooking from "./Customer/Profile/CustomerBooking";
import ManageSchedule from "./Admin/ManageSchedule/ManageSchedule";
import AddSchedule from "./Admin/ManageSchedule/AddSchedule";
import ManageCustomer from "./Admin/ManageCustomer/ManageCustomer";
import UpdateCustomer from "./Admin/ManageCustomer/UpdateCustomer";
import AddCustomer from "./Admin/ManageCustomer/AddCustomer";
import ManageService from "./Admin/ManageService/ManageService";
import UpdateService from "./Admin/ManageService/UpdateService";
import AddService from "./Admin/ManageService/AddService";
import ManagePet from "./Admin/ManagePet/ManagePet";
import CreateAppointment from "./Admin/ManageAppointment/CreateAppointment";
import DoctorSchedule from "./Doctor/ManageSchedule/DoctorSchedule";
import AddNewPet from "./Admin/ManagePet/AddNewPet";
import UpdatePet from "./Customer/Profile/UpdatePet";
import CreateBillPage from "./HomePage/Booking/CreateBillPage";
import ProfileDoctor from "./Doctor/ManageSchedule/ProfileDoctor";
import DoctorService from "./Doctor/ManageSchedule/DoctorService";
import UpdateServiceDoctor from "./Doctor/ManageSchedule/UpdateServiceDoctor";
import PetMedical from "./Doctor/ManageSchedule/PetMedical";
import ManagePetMedical from "./Doctor/ManageSchedule/ManagePetMedical";
import UpdateMedical from "./Doctor/ManageSchedule/UpdateMedical.js";

function App() {
  return (
    <div className="App" id="wrapper">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/booking" element={<Booking />} />
            <Route exact path="/service" element={<Service />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/profile-customer"
              element={<ProfileCustomer />}
            />
            <Route exact path="/manage-doctor" element={<ManageDoctor />} />
            <Route
              exact
              path="/manage-appointment"
              element={<ManageAppointment />}
            />
            <Route
              exact
              path="/create-appointment"
              element={<CreateAppointment />}
            />
            <Route exact path="/register-pet" element={<RegisterPet />} />
            <Route exact path="/add-doctor" element={<AddDoctor />} />
            <Route exact path="/customer-pet" element={<CustomerPet />} />
            <Route exact path="/customer-new-pet" element={<AddPet />} />
            <Route exact path="/update-doctor/:id" element={<UpdateDoctor />} />
            <Route
              exact
              path="/customer-appointment"
              element={<CustomerBooking />}
            />
            <Route exact path="/manage-schedule" element={<ManageSchedule />} />
            <Route exact path="/add-schedule" element={<AddSchedule />} />
            <Route exact path="/manage-customer" element={<ManageCustomer />} />
            <Route
              exact
              path="/update-customer/:id"
              element={<UpdateCustomer />}
            />
            <Route exact path="/add-customer" element={<AddCustomer />} />
            <Route exact path="/manage-service" element={<ManageService />} />
            <Route
              exact
              path="/update-service/:id"
              element={<UpdateService />}
            />

            <Route exact path="/add-service" element={<AddService />} />
            <Route exact path="/manage-pet" element={<ManagePet />} />
            <Route exact path="/add-pet" element={<AddNewPet />} />
            <Route
              exact
              path="update-pet-cust/:petId"
              element={<UpdatePet />}
            />
            <Route exact path="/doctor-schedule" element={<DoctorSchedule />} />
            <Route exact path="/create-bill" element={<CreateBillPage />} />
            <Route exact path="/profile-doctor" element={<ProfileDoctor />} />
            <Route
              exact
              path="/doctor-medical/:petId"
              element={<PetMedical />}
            />
            <Route exact path="/doctor-service" element={<DoctorService />} />
            <Route
              exact
              path="/doctor-update-medical/:petId"
              element={<UpdateMedical />}
            />
            <Route
              exact
              path="/doctor-pet-medical"
              element={<ManagePetMedical />}
            />
            <Route
              exact
              path="/doctor-add-service"
              element={<UpdateServiceDoctor />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
