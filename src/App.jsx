import { useState } from "react";
import "./App.css";
import TablaVideojuegos from "./components/TablaVideojuego";
import data from "./data/videojuegos";

function App() {
    const [videojuegos] = useState(data);

    return (
        <div className="app">
            <h1>Tienda de Videojuegos</h1>

            <TablaVideojuegos videojuegos={videojuegos} />
        </div>
    );
}

export default App;