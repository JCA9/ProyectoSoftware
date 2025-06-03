"use client";
import React, { useEffect, useState } from "react";

function Hola() {

    const [prueba, setPrueba] = useState("Hola");


    return (
        <div>
            <h1>Hola</h1>
            <p>{prueba}</p>
            <button onClick={() => setPrueba("Modificado desde el botón")}>
                Modificar Texto
            </button> 
        </div>
    );
}

export default Hola;