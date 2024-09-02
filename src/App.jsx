import "./App.css";
import Checkout from "./components/Checkout";
import PagoTarjeta from "./components/PagoTarjeta";
import Navbar from './components/Navbar.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleForm from "./components/SimpleForm";
import Successfully from "./components/Successfully";
import  ContextInputProvider  from "./context/ContextInput"
import CheckoutForm2 from "./components/CheckoutForm2";
function App() {
  return (
    <Router>
      <ContextInputProvider>
        <Navbar></Navbar>
        {/* <CheckoutForm2></CheckoutForm2> */}
    <Routes>

    
    <Route path="/" element={<Checkout />} />
    <Route path="/pago-tarjeta" element={<PagoTarjeta />} />
    <Route path="/successfully" element={<Successfully />} />
   </Routes>
   </ContextInputProvider>
    </Router>
  );
}

export default App;
