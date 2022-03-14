import React, { useState } from "react";
import { useNavigate } from "react-router";

const Submit = ({ handlePOSTSubmits }) => {
 
  const [author, setAuthor] = useState({firstName: "", lastName: ""});
  const [cookbook, setCookbook] = useState({title:"", yearPublished: 2022});

  const handleChange = event => {
    event.persist()
    if(event.target.id === 'author'){
      setAuthor(prevAuthor => {
        const editedAuthor = {...prevAuthor, 
          [event.target.name]: event.target.value}
          
        return editedAuthor
      })  
    }
    else if(event.target.id === 'cookbook') {
      setCookbook(prevCookbook => {
        const editedCookbook = {...prevCookbook,
        [event.target.name]: event.target.value}
        return editedCookbook
      })
    }
  }

  let navigate = useNavigate();
  const handleSubmit = (e) => {
      e.preventDefault();
    if(e.target.value === 'Submit Author'){
      handlePOSTSubmits(author, cookbook);
      navigate('/')
    } else {
      handlePOSTSubmits({}, cookbook);
      navigate('/')
    }
  };

  return (
    <div >
      <form className="request-form">
        <div className="field">
          <div className="input-div">
            <label htmlFor="author">First Name:</label>
            <input
              type="text"
              id="author"
              name="firstName"
              placeholder="Enter Author First Name"
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="author">Last Name:</label>
            <input
              type="text"
              id="author"
              name="lastName"
              placeholder="Enter Author Last Name"
              onChange
              ={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="input-div">
            <label htmlFor="cookbook">Cookbook Title:</label>
            <input
              type="text"
              id="cookbook"
              name="title"
              placeholder="Enter Cookbook title"
              onChange={handleChange}
            />
          </div>
          <div className="input-div">
            <label htmlFor="cookbook">Cookbook Year Published:</label>
            <input
              type="number"
              id="cookbook"
              name="yearPublished"
              placeholder="Enter Cookbook year published"
              onChange={handleChange}
            />
          </div>
        </div>
        <input type="submit" value= "Submit Cookbook" onClick={handleSubmit}/>
        <input type="submit" value = "Submit Author" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Submit;
