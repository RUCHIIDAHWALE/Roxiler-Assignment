import React, { useState } from "react";
import axios from "axios";

import "./StoreCard.css";

const StoreCard = ({ store }) => {

  const [rating, setRating] = useState(0);

  const user =
    JSON.parse(localStorage.getItem("user"));

  const submitRating = async (value) => {

    try {

      setRating(value);

      await axios.post(

        "http://localhost:5000/api/ratings/add",

        {
          userId: user.id,
          storeId: store._id,
          value,
        }

      );

      alert("Rating Submitted Successfully");

    }
    catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="store-card">

      <img
        src={store.image}
        alt={store.name}
        className="store-image"
      />

      <div className="store-content">

        <h2>
          {store.name}
        </h2>

        <p className="store-address">
          {store.address}
        </p>

        <div className="rating-section">

          {[1,2,3,4,5].map((star)=>(

            <span
              key={star}
              className={
                rating >= star
                  ? "star active"
                  : "star"
              }
              onClick={()=>submitRating(star)}
            >
              ★
            </span>

          ))}

        </div>

        <a
          href={`https://www.google.com/search?q=${store.name}`}
          target="_blank"
          rel="noreferrer"
        >

          <button className="visit-btn">
            Explore Store
          </button>

        </a>

      </div>

    </div>

  );
};

export default StoreCard;