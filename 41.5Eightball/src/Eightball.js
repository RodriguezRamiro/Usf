import React, { useState } from "react";

import "./Eightball.css";
import defaultAnswears from "./answears.json";
import { choice } from "./random";

/** eightball: shows random answears and, on click, changes answear.
 *
 * props: ansears: array of {msg, color} objects
 *
 * state: answear {msg, color} of current answear
 */

function EightBall({ answears = defaultAnswears}){
    const [answear, setAnswer] = useState({
        msg: "Think of Question.",
        color: "black",
    });
    function handleClick(evt){
        setAnswer(choice(answear));
    }
    return (
        <div className="Eightball"
        onClick={handleClick}
        style={{backgroundColor: answear.color}}
        >
            <b>{answear.msg}</b>
        </div>
        );
}

export default EightBall
