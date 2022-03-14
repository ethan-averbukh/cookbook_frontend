import React from "react";
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import "./App.css";
import HomePage from "./HomePage";
import Submit from "./Submit";
function App() {
  const [author, setAuthor] = useState([]);

  const handleGETCall = async () => {
    const response = await axios.get("http://localhost:3000/api/authors");
    const apiData = await response.data.data;
    setAuthor(apiData);
  };

  const handlePOSTCall = async (authorInput, cookbookInput) => {
    try {
      const response = await axios.post("http://localhost:3000/api/authors", {
        firstName: authorInput.firstName,
        lastName: authorInput.lastName,
        title: cookbookInput.title,
        yearPublished: cookbookInput.yearPublished,
      });
      handleGETCall();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePUTCall = async (authorInput) => {
    console.log(authorInput);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/authors/${authorInput._id}`,
        {
          firstName: authorInput.firstName,
          lastName: authorInput.lastName,
          cookbooks: [],
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleDELETECall = async (authorInput) => {
     try {
      const response = await axios.delete(`http://localhost:3000/api/authors/remove/${authorInput._id}`)
     } catch (err) {
       console.log(err)
     }
     handleGETCall();
  }


  return (
    <Routes>
      <Route path='/' element={<HomePage GETApiCall={handleGETCall} POSTApiCall={handlePOSTCall} PUTApiCall={handlePUTCall} DELETEApiCall={handleDELETECall} apiData={author}/>}></Route>
      <Route path='/submit' element={<Submit handlePOSTSubmits={handlePOSTCall}/>}></Route>
    </Routes>
  );
}

export default App;
