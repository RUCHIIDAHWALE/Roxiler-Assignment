import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import StoreCard from "./components/StoreCard";

import "./index.css";

const App = () => {

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchStores();

  }, []);

  const fetchStores = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/stores"
      );

      setStores(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="app">

      <Navbar />

      <div className="hero-section">

        <p className="hero-subtitle">
          PREMIUM FASHION EXPERIENCE
        </p>

        <h1>
          Discover Luxury Fashion Stores
        </h1>

        <p className="hero-text">
          Explore premium collections,
          rate your favorite stores,
          and experience modern luxury shopping.
        </p>

        <input
          type="text"
          placeholder="Search Luxury Stores..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="store-grid">

        {filteredStores.map((store) => (

          <StoreCard
            key={store._id}
            store={store}
          />

        ))}

      </div>

    </div>

  );
};

export default App;