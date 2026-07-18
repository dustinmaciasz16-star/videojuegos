import { useState, useEffect } from "react";
import "./FormularioVideojuego.css";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioVideojuego({ onGuardar }) {

    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoRecuperado = location.state?.juego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(false);
    const [progreso, setProgreso] = useState(0);

    useEffect(() => {
        if (videojuegoRecuperado) {
            setTitulo(videojuegoRecuperado.titulo);
            setGenero(videojuegoRecuperado.genero);
            setPlataforma(videojuegoRecuperado.plataforma);
            setLanzamiento(videojuegoRecuperado.lanzamiento);
            setPrecio(videojuegoRecuperado.precio);
            setDisponible(videojuegoRecuperado.disponible);
            setProgreso(videojuegoRecuperado.progreso);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(false);
            setProgreso(0);
        }
    }, [videojuegoRecuperado]);

    function manejarGuardar(e) {
        e.preventDefault();

        const videojuego = {
            id: videojuegoRecuperado
                ? videojuegoRecuperado.id
                : Date.now(),
            titulo,
            genero,
            plataforma,
            lanzamiento,
            precio,
            disponible,
            progreso,
        };

        onGuardar(videojuego);
        navigate("/");
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <form
            className="formulario-videojuego"
            onSubmit={manejarGuardar}
        >

            <label htmlFor="titulo">Título:</label>
            <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ingrese el título del videojuego"
            />

            <label htmlFor="genero">Género:</label>
            <input
                type="text"
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                placeholder="Ingrese el género del videojuego"
            />

            <label htmlFor="plataforma">Plataforma:</label>
            <select
                id="plataforma"
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
            >
                <option value="">Seleccionar una plataforma</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
            </select>

            <label htmlFor="lanzamiento">Lanzamiento:</label>
            <input
                type="date"
                id="lanzamiento"
                value={lanzamiento}
                onChange={(e) => setLanzamiento(e.target.value)}
            />

            <label htmlFor="precio">Precio:</label>
            <input
                type="number"
                id="precio"
                value={precio}
                onChange={(e) =>
                    setPrecio(
                        e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value)
                    )
                }
                placeholder="Ingrese el precio del videojuego"
            />

            <label htmlFor="disponible">Disponible:</label>
            <input
                type="checkbox"
                id="disponible"
                checked={disponible}
                onChange={(e) => setDisponible(e.target.checked)}
            />

            <label htmlFor="progreso">
                Progreso: {progreso}%
            </label>

            <input
                type="range"
                id="progreso"
                min="0"
                max="100"
                step="1"
                value={progreso}
                onChange={(e) => setProgreso(Number(e.target.value))}
            />

            <button type="submit">
                Guardar
            </button>

            <button
                type="button"
                onClick={manejarCancelar}
            >
                Cancelar
            </button>

        </form>
    );
}

export default FormularioVideojuego;