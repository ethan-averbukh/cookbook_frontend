import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import Submit from "./Submit.js";
function App() {
  const [author, setAuthor] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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
  const authorData = author.map((item, index) => {
    const cookbook = item.cookbooks.map((item, index) => {
      return (
        <div key={index}>
          <div>{item.title}</div>
          <div>{item.yearPublished}</div>
        </div>
      );
    });
    return (
      <div className="authors" key={index}>
        <section className="authors-name">
        <div className="authors-first">{item.firstName}</div>
        <div className="authors-last">{item.lastName}</div>
        </section>
        <section className="authors-cookbook">
          {cookbook}
        </section>
        <button onClick={() => handlePUTCall(item)}>Edit</button>
        <button onClick={()=> handleDELETECall(item)}>Delete Author</button>
      </div>
    );
  });

  return (
    <div className="App">
      <button className="author-btn" onClick={handleGETCall}>
        Request Authors List
      </button>
      <Submit handlePOSTSubmits={handlePOSTCall}></Submit>
      <div className="authors-container">{authorData}</div>
    </div>
  );
}

export default App;
