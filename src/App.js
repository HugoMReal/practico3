import './App.css'
import { useState, useEffect } from 'react';
import papel from './assets/img/papel.png';
import piedra from './assets/img/piedra.png';
import tijera from './assets/img/tijera.png';

const opciones = [
  { id: 0, nombre: "Piedra", icono: <img src={piedra}></img>, gana: [2] },
  { id: 1, nombre: "Papel", icono: <img src={papel}></img>, gana: [0] },
  { id: 2, nombre: "Tijera", icono: <img src={tijera}></img>, gana: [1] },
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
  const [jugador, setJugador] = useState(null);
  const [pc, setPc] = useState(null);
  const [mensajeJugador, setMensajeJugador] = useState(null);
  const [mensajePc, setMensajePc] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [contadorPc, setContadorPc] = useState(0);
  const [contadorJugador, setContadorJugador] = useState(0);

  useEffect(() => {
    if (jugador !== null) {
      setMensajeJugador(`Elejiste ${opciones[jugador].icono} - ${opciones[jugador].nombre}`);
    }
  }, [jugador]);

  useEffect(() => {
    if (pc !== null) {
      setMensajePc(`La Pc eligió ${opciones[pc].icono} - ${opciones[pc].nombre}`);
    }
  }, [pc]);

  const handlePlay = (jugador) => {
    setJugador(jugador);
    setDisabled(true);
    const aleatorio = Math.floor(Math.random() * 3);
    //demora el tiempo de respuesta de la PC//
    setTimeout(() => {
      setPc(aleatorio);
    },
      1000);

    setTimeout(() => {
      setResultado(getResultado(jugador, aleatorio));
    }, 2000);

    clearTimeout();
  };

  const reset = () => {
    setJugador(null);
    setPc(null);
    setMensajeJugador(null);
    setMensajePc(null);
    setResultado(null);
    setDisabled(false);
  }

  return (
    <div className='juego'>
      <div className='inicio'>
        <h1> PIEDRA, PAPEL O TIJERAS </h1>
      </div>
      <div className='nombreJugador'>
        <h5>Nombre del jugador</h5>
      </div>
      <div className="Elija">
        <h2> Elija su jugada, el primero en llegar a 3 victorias es el ganador</h2>
      </div>
      <div className='botonesEleccion'>
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            disabled={disabled}
            onClick={() => handlePlay(opcion.id)}
            title={opcion.nombre}
          > {opcion.icono}</button>
        ))}
        {jugador !== null && (
          <p>{mensajeJugador}</p>
        )}
        {pc !== null && (
          <p>{mensajePc}</p>
        )}
        {resultado === 0 && <p>Empate</p>}
        {resultado === 1 && <p>Ganaste la ronda</p>}
        {resultado === 2 && <p>Perdiste la ronda</p>}

        <div className="ganador">
          <table style={{ margin: "0 auto" }}>
            <tbody>
              <tr>
                <th id="resultado">RESULTADO</th>
              </tr>
              <tr>
                <td>Jugador</td>
                <td id="contadorjugador">{setContadorJugador}</td>
              </tr>
              <tr>
                <td>PC</td>
                <td id="contadorpc">{setContadorPc}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={reset}>Nueva ronda</button>
      </div>
    </div>
  );
}

export default App;
