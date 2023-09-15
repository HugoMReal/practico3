import React from 'react'

function Usuario(props) {
  return (props.trigger)?(
    <div className="popup">
    <div className="popup-inner">
        <button className="aceptar-btn" onClick={() => props.setTrigger(false)}>Aceptar</button>
        {props.children}
    </div>
    </div>
  ):"";
}

export default Usuario