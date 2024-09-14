import react from "react";
import "./Box.css";

/** individual colored boxes */

function Box({ color }){
    return(
        <div className="Box"
        style={{ backgroundColor: color }} />
        );
}

export default Box;