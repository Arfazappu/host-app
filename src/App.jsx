import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../supabase';

const Login = React.lazy(() => import('loginApp/Login'));
const TaskDashboard = React.lazy(() => import('taskApp/TaskDashboard'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isLoggedIn === null) return <p>Checking session...</p>;

  return (
    <BrowserRouter basename="/host-app/">
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        <Route path="/login" element={<React.Suspense fallback="Loading..."><Login /></React.Suspense>} />
        <Route path="/dashboard" element={
          isLoggedIn ? (
            <React.Suspense fallback="Loading..."><TaskDashboard /></React.Suspense>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
