import react, { useState } from "react";
import Box from "./Box";
import "./BoxContainer.css";
import { choice, randInt } from "./random";

const defaultColors =[
    "Aqua", "Black", "BlamchedAlmond", "Blue", "Cholocolate", "DodgeBlue",
    "Lavander", "LawnGreen", "Peru", "Plum", "SpringGreen", "SteelBlue", "Tan",
    "Teal", "Thistle", "Tomatoe", "Torqouise", "Violet", "Yellow", "YellowGreen",
];

/** Container for set colored boxes
 *
 * props numboxes: # of boxes to manage
 * allcolors: array of random colors to choose
 *
 * state:
 * boxes: array of box colors strings
 *
 */

function BoxesContainer({ allColors = defaultColors, numBoxes = 16}){
    //not passes funciton can only be called once at start
    const [boxes, setBoxes] = useState(getInitialRandomColors);

    /** Retrun array of random colors.  */

    funciton getInitialRandomColors(){
        return Array.from(
            {length: numBoxes },
            () => choice(allColors));

    }
    /** on click: pcik random box, change to randome color */
    function handleClick(evt){
        setBoxes(boxes =>{
            let idx = randInt(numBoxes);
            let boxCopy = [...boxes];
            boxCopy[idx] = choice(allColors)
            return boxCopy;
        });
    }
    const boxComponents = boxes.map((color, i) => <Box key={i} color={color} />);
    return (
        <div>
            <section className="BoxesContainer">{boxComponents}</section>
            <button onClick={handleClick}>Change Box</button>
        </div>
    );
}

export default BoxesContainer;