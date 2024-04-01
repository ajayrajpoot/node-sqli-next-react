 

import React from 'react';

import './App.css';

import Login from './login/page';
import PaymentList from './Dashboard/payment-list/page';
import UserList from './Dashboard/user-list/page';
import FirstPage from './FirstPage/page';
import DashboardPage from './Dashboard/page';
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const NotFound = () => <h2>NotFound</h2>;


function App() {
  
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />

          
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          {/* <Route element={<DashboardPage/>}></Route> */}
         <Route path='/' element={ <DashboardPage/>}>

            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="/user-list" element={ <UserList />}/> 
              <Route path="/payment-list" element={ <PaymentList />}/> 
            </Route>
          </Route>

        </Route> {/* End Protected Routes */} 
              
          <Route path="/404" element={<NotFound />} />
          {/* <Route path="*" element={ <NotFound   /> } />  */}
          <Route path="*" element={<Navigate to="/404" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
