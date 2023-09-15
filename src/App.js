import './App.css'
import { useState, useEffect } from 'react';
import papel from './assets/img/papel.png';
import piedra from './assets/img/piedra.png';
import tijera from './assets/img/tijera.png';
import Usuario from './componentes/Usuario';
import H1 from './componentes/StyleH1';
import H4 from './componentes/StyleH4';
import { DefaultButton } from './componentes/StyleButton';

const opciones = [
  { id: 0, nombre: "Piedra", icono: <img src={piedra} alt="Piedra" width={100} ></img>, gana: [2] },
  { id: 1, nombre: "Papel", icono: <img src={papel} alt="Papel" width={100}></img>, gana: [0] },
  { id: 2, nombre: "Tijera", icono: <img src={tijera} alt="Tijera" width={100}></img>, gana: [1] },
];


const getResultado = (jugador, pc) => {
  if (jugador === pc) {
    return 0;
  }
  if (opciones[jugador].gana.includes(pc)) {
    return 1;
  }
  return 2;
};

function App() {
  const [nombre, setNombre] = useState("");
  const [jugador, setJugador] = useState(null);
  const [pc, setPc] = useState(null);
  const [mensajeJugador, setMensajeJugador] = useState(null);
  const [mensajePc, setMensajePc] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [contadorPc, setContadorPc] = useState(0);
  const [contadorJugador, setContadorJugador] = useState(0);
  const [timePopup, setTimePopup] = useState(false);

  useEffect(() => {
    if (jugador !== null) {
      setMensajeJugador(`Elejiste ${opciones[jugador].nombre}`);
    }
  }, [jugador]);

  useEffect(() => {
    if (pc !== null) {
      setMensajePc(`La Pc eligió ${opciones[pc].nombre}`);
    }
  }, [pc]);

  useEffect(() => {
    setTimeout(() => {
      setTimePopup(true);
    }, 500);
  }, [])

  const handlePlay = (jugador) => {
    setJugador(jugador);
    setDisabled(true);
    const aleatorio = Math.floor(Math.random() * 3);

    setTimeout(() => {
      setPc(aleatorio);
    },
      1000);

    setTimeout(() => {
      setResultado(getResultado(jugador, aleatorio));
    }, 2000);

    clearTimeout();
  };

  useEffect(() => {
    debugger
    switch (resultado) {
      case 1:
        setContadorJugador(contadorJugador + 1);
        break;
      case 2:
        setContadorPc(contadorPc + 1);
        break;
      default:
        break;
    }
  }, [resultado])

  useEffect(() => {
    if (contadorJugador === 3) {
      alert("Ganaste");
    }
    else if (contadorPc === 3) {
      alert("Perdiste")
    }
  }, [contadorJugador, contadorPc])

  const reset = () => {
    setJugador(null);
    setPc(null);
    setMensajeJugador(null);
    setMensajePc(null);
    setResultado(null);
    setDisabled(false);
  }

  const nuevoJuego = () => {
    setJugador(null);
    setPc(null);
    setMensajeJugador(null);
    setMensajePc(null);
    setResultado(null);
    setDisabled(false);
    setNombre(null);
    setTimePopup(true);
    setContadorJugador(0);
    setContadorPc(0);
  }

  return (
    <div className='juego'>

      <H1> PIEDRA, PAPEL O TIJERAS </H1>

      <H4>Nombre del jugador</H4>
      {nombre !== '' && <H4>{nombre}</H4>}

      <Usuario trigger={timePopup} setTrigger={setTimePopup}>
        <label>
          <H4>Nombre: <input value={nombre} onChange={e => setNombre(e.target.value)} /></H4>
        </label>
      </Usuario>

      <H4> Elija su jugada, el primero en llegar a 3 victorias es el ganador</H4>

      {opciones.map((opcion) => (
        <button key={opcion.id} disabled={disabled} onClick={() => handlePlay(opcion.id)} title={opcion.nombre}
        > {opcion.icono}</button>
      ))}

      {jugador !== null && (<H4>{mensajeJugador}</H4>)}

      {pc !== null && (<H4>{mensajePc}</H4>)}

      {resultado === 0 && <H4>Empate</H4>}
      {resultado === 1 && <H4>Ganaste la ronda</H4>}
      {resultado === 2 && <H4>Perdiste la ronda</H4>}

      <table style={{ margin: "0 auto" }}>
        <tbody>
          <tr>
            <th id="resultado"><H4>RESULTADO</H4></th>
          </tr>
          <tr>
            <td><H4>Jugador</H4></td>
            <td id="contadorjugador"><H4>{contadorJugador}</H4></td>
          </tr>
          <tr>
            <td><H4>PC</H4></td>
            <td id="contadorpc"><H4>{contadorPc}</H4></td>
          </tr>
        </tbody>
      </table>

      {contadorPc < 3 && contadorJugador < 3 && <DefaultButton onClick={reset}>Nueva ronda</DefaultButton>}
      <br></br>
      <br></br>
      <DefaultButton onClick={nuevoJuego}>Nuevo juego</DefaultButton>
    </div>

  );
}

export default App;
