import { useState } from "react";
import "./App.css";
import TablaVideojuegos from "./components/TablaVideojuego";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import data from "./data/videojuegos";
import Noencontrada from "./components/Noencontrada"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [videojuegos, setVideojuegos] = useState(data);

    function guardarVideojuego(videojuego) {
        setVideojuegos([...videojuegos, videojuego]);
    }

    function eliminar(id) {
        const filtrado = videojuegos.filter((juego) => juego.id !== id);
        setVideojuegos(filtrado);
    }

    function editarVideojuego(videojuego) {
        const actualizado = videojuegos.map((juego) => {
            if (juego.id === videojuego.id) {
                return videojuego;
            } else {
                return juego;
            }
        });

        setVideojuegos(actualizado);
    }

    function manejarGuardar(videojuego) {
        const existe = videojuegos.find(
            (juego) => juego.id === videojuego.id
        );

        if (existe) {
            editarVideojuego(videojuego);
        } else {
            guardarVideojuego(videojuego);
        }
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <TablaVideojuegos
                            videojuegos={videojuegos}
                            onEliminar={eliminar}
                        />
                    }
                />

                <Route
                    path="/nuevo"
                    element={
                        <FormularioVideojuego
                            onGuardar={manejarGuardar}
                        />
                    }
                />

                <Route
                    path="/editar"
                    element={
                        <FormularioVideojuego
                            onGuardar={manejarGuardar}
                        />
                    }
                />
                <Route
                    path="*"
                    element={
                        <Noencontrada
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;