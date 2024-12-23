import React,{useState} from 'react'

import './App.css';
import About from './components/About';
// import Info from './components/Info';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
// import AboutUs from './components/AboutUs';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const[mode, setMode] = useState('light');
  const[alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout( ()=>{
      setAlert(null);
    },1500);

  }

  const toggleMode = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark Mode enabled", "success");
      document.title = 'Text Utils - Dark Mode';
      
      // setInterval(() => {
      //   document.title = " Text Utils is Amazing";
      // }, 2000);

      // setInterval(() => {
      //   document.title = "Install TextUtils Now";

      // }, 1500);

    }else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode enabled", "success");
      document.title = 'Text Utils - Light Mode';

    }
  }

  return (
    <>
    <Router>
      <Navbar title="Text Utils" mode={mode} aboutus="About Us" toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">

      <Routes>
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="/" element={<TextForm mode={mode} showAlert={showAlert} heading="Enter text to analyze" />} />
          </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
