import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>🎮 Tienda de Videojuegos</h2>
            </div>

            <div className="navbar-links">
                <Link to="/">📚 Videojuegos</Link>
                <Link to="/nuevo">➕ Nuevo videojuego</Link>
            </div>
        </nav>
    );
}

export default Navbar;