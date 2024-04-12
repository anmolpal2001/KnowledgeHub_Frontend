import React from 'react'
import { useSelector } from 'react-redux';
import StudentLayout from './student/Layout';
import TeacherDashboard from './teacher/Dashboard';
import { Navigate } from 'react-router-dom';

const AuthLayout = ({children}) => {
    const currentUser = useSelector(state => state.auth.currentUser);
  return currentUser ? children : <Navigate to="/" />
}

export default AuthLayout