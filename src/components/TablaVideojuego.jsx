import { useNavigate } from "react-router-dom";
import "./TablaVideojuego.css";

function TablaVideojuegos({ videojuegos, onEliminar }) {

    const navigate = useNavigate();

    function manejarEditar(videojuego) {
        navigate("/editar", {
            state: { juego: videojuego }
        });
    }

    return (
        <div className="tabla-container">
            <table className="tabla-videojuegos">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Lanzamiento</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Progreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {videojuegos.map((juego) => (
                        <tr key={juego.id}>
                            <td>{juego.titulo}</td>
                            <td>{juego.genero}</td>
                            <td>{juego.plataforma}</td>
                            <td>{juego.lanzamiento}</td>
                            <td>${juego.precio.toFixed(2)}</td>
                            <td>{juego.disponible ? "Sí" : "No"}</td>
                            <td>
                                <progress
                                    value={juego.progreso}
                                    max="100"
                                ></progress>

                                <br />

                                {juego.progreso}%
                            </td>

                            <td>
                                <button onClick={() => manejarEditar(juego)}>
                                    Editar
                                </button>

                                <button onClick={() => onEliminar(juego.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaVideojuegos;