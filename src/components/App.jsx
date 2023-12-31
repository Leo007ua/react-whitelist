import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'redux/auth/authOperations';
import Loader from './Loader/Loader';

import PublicRoute from '../Guards/PublicRoute';
import PrivateRoute from '../Guards/PrivatRoute';

const Home = lazy(() => import('pages/Home/Home'));
const RegistrationPage = lazy(() =>
  import('pages/Registration/RegistrationPage')
);
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const Contacts = lazy(() => import('pages/Contact/Contacts'));

export default function App() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/registration"
            element={
              <PublicRoute
                component={RegistrationPage}
                redirectTo="/Contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute component={LoginPage} redirectTo="/Contacts" />
            }
          />
          <Route
            path="/contacts"
            element={<PrivateRoute component={Contacts} redirectTo="/login" />}
          />
          <Route
            path="*" // Невідомий маршрут
            element={<Navigate to="/" replace />} />
            
        </Routes>
      </Suspense>
    </Layout>
  );
}
