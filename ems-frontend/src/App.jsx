import './App.css'
import Header from './component/Header'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './component/EmployeeComponent'
import LoginComponent from "./component/LoginComponent.jsx";
import SignupComponent from "./component/SignupComponent.jsx";
import CreateAdminComponent from "./component/CreateAdminComponent.jsx";
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function App() {

  // 🔥 GLOBAL SEARCH STATE
  const [search, setSearch] = useState("");

  return (
      <>
        <Toaster position="top-right" reverseOrder={false} />

        <BrowserRouter>

          {/* 🔥 PASS SEARCH HANDLER TO HEADER */}
          <Header onSearch={setSearch} />

          <Routes>

            <Route path='/login' element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />

            {/* 🔥 PASS SEARCH TO EMPLOYEE LIST */}
            <Route
                path='/'
                element={<ListEmployeeComponent search={search} />}
            />

            <Route path='/create-admin' element={<CreateAdminComponent />} />
            <Route path='/emplist' element={<ListEmployeeComponent search={search} />} />

            <Route path='/add-employee' element={<EmployeeComponent />} />
            <Route path='/update-employee/:id' element={<EmployeeComponent />} />

          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App