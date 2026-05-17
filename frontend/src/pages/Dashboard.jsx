function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Dashboard</h1>

            <h2>
                Welcome {user?.name}
            </h2>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>



            {
                user?.role === "admin" && (

                    <div>

                        <h2>Admin Panel</h2>

                        <button>
                            Manage Users
                        </button>

                        <button>
                            Manage Stores
                        </button>

                    </div>
                )
            }



            {
                user?.role === "user" && (

                    <div>

                        <h2>User Panel</h2>

                        <button>
                            View Stores
                        </button>

                        <button>
                            Give Ratings
                        </button>

                    </div>
                )
            }



            {
                user?.role === "owner" && (

                    <div>

                        <h2>Store Owner Panel</h2>

                        <button>
                            View Ratings
                        </button>

                    </div>
                )
            }



            <br /><br />

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default Dashboard;