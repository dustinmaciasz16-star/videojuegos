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
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (videojuegoRecuperado) {
            setTitulo(videojuegoRecuperado.titulo);
            setGenero(videojuegoRecuperado.genero);
            setPlataforma(videojuegoRecuperado.plataforma);
            setLanzamiento(videojuegoRecuperado.lanzamiento);
            setPrecio(videojuegoRecuperado.precio);
            setDisponible(videojuegoRecuperado.disponible);
            setProgreso(videojuegoRecuperado.progreso);
            setSinopsis(videojuegoRecuperado.sinopsis || "");
            setCalificacion(videojuegoRecuperado.calificacion || "");
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(false);
            setProgreso(0);
            setSinopsis("");
            setCalificacion("");
        }
    }, [videojuegoRecuperado]);

    function validarFormulario() {
        const erroresActivos = {};

        if (titulo.trim() === "") {
            erroresActivos.titulo = "El título es obligatorio.";
        }
        if (genero.trim() === "") {
            erroresActivos.genero = "El género es obligatorio.";
        }
        if (plataforma === "") {
            erroresActivos.plataforma = "Seleccione una plataforma.";
        }
        if (precio === "" || precio <= 0) {
            erroresActivos.precio = "Ingrese un precio válido.";
        }
        if (sinopsis.trim().length < 10) {
            erroresActivos.sinopsis =
                "La sinopsis debe tener mínimo 10 caracteres.";
        }
        if (calificacion < 1 || calificacion > 100) {
            erroresActivos.calificacion =
                "La calificación debe estar entre 1 y 100.";
        }

        const hoy = new Date().toISOString().split("T")[0];
        if (lanzamiento > hoy) {
            erroresActivos.lanzamiento =
                "La fecha no puede ser futura.";
        }
        return erroresActivos;
    }

    function manejarGuardar(e) {
        e.preventDefault();
        const erroresActivos = validarFormulario();
        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }
        setErrores({});
        const videojuego = {
            id: videojuegoRecuperado ? videojuegoRecuperado.id: Date.now(),
            titulo,
            genero,
            plataforma,
            lanzamiento,
            precio,
            disponible,
            progreso,
            sinopsis,
            calificacion
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
            {errores.titulo &&
            <span className="error-mensaje">
                {errores.titulo}
            </span>}

            <label htmlFor="genero">Género:</label>
            <input
                type="text"
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                placeholder="Ingrese el género del videojuego"
            />
            {errores.genero &&
            <span className="error-mensaje">
                {errores.genero}
            </span>}

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
            {errores.plataforma &&
            <span className="error-mensaje">
                {errores.plataforma}
            </span>}

            <label htmlFor="lanzamiento">Lanzamiento:</label>
            <input
                type="date"
                id="lanzamiento"
                value={lanzamiento}
                onChange={(e) => setLanzamiento(e.target.value)}
            />
            {errores.lanzamiento &&
            <span className="error-mensaje">
                {errores.lanzamiento}
            </span>}

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
            {errores.precio &&
            <span className="error-mensaje">
                {errores.precio}
            </span>}

            <label htmlFor="sinopsis">
                Sinopsis:
            </label>
            <textarea
                id="sinopsis"
                value={sinopsis}
                onChange={(e)=>setSinopsis(e.target.value)}
                rows="5"
                placeholder="Escriba una breve descripción del videojuego"
            />
            {errores.sinopsis &&
            <span className="error-mensaje">
                {errores.sinopsis}
            </span>}

            <label htmlFor="calificacion">
                Calificación:
            </label>
            <input
                type="number"
                id="calificacion"
                value={calificacion}
                min="1"
                max="100"
                onChange={(e)=>setCalificacion(Number(e.target.value))}
            />
            {errores.calificacion &&
            <span className="error-mensaje">
                {errores.calificacion}
            </span>}

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