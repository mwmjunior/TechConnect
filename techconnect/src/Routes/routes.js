import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; 
import Login from '../Pages/Login/login';
import Register from '../Pages/Register/register';
import Home from '../Pages/Home/home';
import Profile from '../Pages/Profile/Profile';
import { LandingPage } from '../Pages/LandingPage/landingPage';
import AuthCallback from '../Components/AuthCallback/authCallback';


const RoutesPages = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage/>
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/profile" // Adiciona a rota para o perfil
          element={
            <PageTransition>
              <Profile /> {/* Renderiza o componente de Perfil */}
            </PageTransition>
          }
        />
        <Route
          path="/auth/callback"
          element={
            <PageTransition>
              <AuthCallback />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }} 
    animate={{ opacity: 1, x: 0 }} 
    exit={{ opacity: 0, x: 50 }} 
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => (
  <BrowserRouter>
    <RoutesPages />
  </BrowserRouter>
);

export default AnimatedRoutes;
