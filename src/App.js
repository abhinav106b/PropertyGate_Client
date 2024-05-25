import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/register';
import SignIn from './components/signin';
import Home from './components/home';
import Error from './components/errorPage';
import PropertyForm from './components/propertyForm';
import ViewSellerProperty from './components/sellerProperty';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<SignIn />} />
        <Route path='/propertyForm' element={<PropertyForm />} />
        <Route path='/viewSeller' element={<ViewSellerProperty />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
