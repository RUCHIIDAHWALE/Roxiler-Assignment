import { useEffect, useState } from "react";
import axios from "axios";

function Stores() {

    const [stores, setStores] = useState([]);
    const [rating, setRating] = useState("");

    useEffect(() => {

        fetchStores();

    }, []);

    const fetchStores = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/stores"
            );

            setStores(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const submitRating = async (storeId) => {

        try {

            await axios.post(
                "http://localhost:5000/add-rating",
                {
                    user_id: 1,
                    store_id: storeId,
                    rating: rating
                }
            );

            alert("Rating Added Successfully");

            fetchStores();

        } catch(error) {

            console.log(error);
        }
    };

    return (

        <div className="container">

            {/* TOPBAR */}

            <div className="topbar">

                <div className="logo">
                    ⭐ Roxiler Rating
                </div>

                <div className="user">
                    👤 User
                </div>

            </div>

            {/* HEADER */}

            <div className="header">

                <div className="header-left">

                    <h1>Store Reviews</h1>

                    <p>
                        Rate and review stores easily
                    </p>

                </div>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search stores..."
                    />

                </div>

            </div>

            {/* STORE GRID */}

            <div className="store-grid">

                {
                    stores.map((store) => (

                        <div
                            key={store.id}
                            className="store-card"
                        >

                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                                alt="store"
                                className="store-image"
                            />

                            <div className="store-content">

                                <h2 className="store-name">
                                    {store.name}
                                </h2>

                                <p className="store-info">
                                    ✉️ {store.email}
                                </p>

                                <p className="store-info">
                                    📍 {store.address}
                                </p>

                                <div className="rating-box">

                                    <span className="star">
                                        ⭐
                                    </span>

                                    <div className="rating-number">

                                        {
                                            Number(
                                                store.average_rating
                                            ).toFixed(1)
                                        }

                                    </div>

                                </div>

                                <input
                                    type="number"
                                    placeholder="Rate 1 to 5"
                                    className="rating-input"
                                    onChange={(e) =>
                                        setRating(e.target.value)
                                    }
                                />

                                <button
                                    className="submit-btn"
                                    onClick={() =>
                                        submitRating(store.id)
                                    }
                                >
                                    Submit Rating
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Stores;