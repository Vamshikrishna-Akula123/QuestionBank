// import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/home';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AdminAddQuestion } from './components/admin-add-question';
import { StudentLogin } from './components/student-login';
import { StudentRegister } from './components/student-register';

function App() {
  

  return (
    <div className="body-background">
      <div className="bg-shade">
        <h1 className="text-info text-center pt-5 mt-5">Smart Question Bank</h1>


        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/add-question' element={<AdminAddQuestion />} />
            <Route path='/student-login' element={<StudentLogin />} />
            <Route path='/student-register' element={<StudentRegister />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App
