import { Link } from "react-router-dom";
import '../css/Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Home</h1>
            <Link to={'/list'} className="home-link">Post List</Link>
        </div>
    );
}

export default Home;