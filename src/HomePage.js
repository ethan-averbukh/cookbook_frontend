import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({
  GETApiCall,
  POSTApiCall,
  PUTApiCall,
  DELETEApiCall,
  apiData,
}) => {
  const authorData = apiData.map((item, index) => {
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
        <section className="authors-cookbook">{cookbook}</section>
        <button onClick={() => PUTApiCall(item)}>Edit</button>
        <button onClick={() => DELETEApiCall(item)}>Delete Author</button>
      </div>
    );
  });

  return (
    <div className="home-btns">
      <button className="author-btn" onClick={GETApiCall}>
        Request Authors List
      </button>
      <Link to="/submit" className="author-form-link">
        <button className="author-form-btn">Submit Author Cookbook</button>
      </Link>
      <div className="authors-container">{authorData}</div>
    </div>
  );
};

export default HomePage;
