import { useState, useEffect } from "react";
import "./App.css";
import TablaVideojuegos from "./components/TablaVideojuego";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import data from "./data/videojuegos";
import Noencontrada from "./components/Noencontrada"
import AlertaNotificacion from "./components/AlertaNotificacion"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [videojuegos, setVideojuegos] = useState(() => {
        const datosGuardados = localStorage.getItem("lista_videojuegos");
        return datosGuardados
            ? JSON.parse(datosGuardados)
            : data;
    });

    useEffect(() => {
        localStorage.setItem(
            "lista_videojuegos",
            JSON.stringify(videojuegos)
        );
    }, [videojuegos]);

    const [mensaje, setMensaje] = useState("");

    function guardarVideojuego(videojuego){
        setVideojuegos([...videojuegos, videojuego]);
        setMensaje("Videojuego agregado correctamente.");
    }

    function eliminar(id) {
        const filtrado = videojuegos.filter((juego) => juego.id !== id);
        setVideojuegos(filtrado);
        setMensaje("Videojuego eliminado correctamente.");
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
        setMensaje("Videojuego editado correctamente.");
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
            {
                mensaje &&
                <AlertaNotificacion
                    mensaje={mensaje}
                    onCerrar={() => setMensaje("")}
                />
            }
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