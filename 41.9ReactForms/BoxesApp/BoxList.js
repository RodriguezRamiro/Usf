import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const addBox = (newBox) => setBoxes((boxes) => [...boxes, newBox]);

  const removeBox = (id) => setBoxes(boxes.filter((box, idx) => idx !== id));

  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxes.map((box, idx) => (
        <Box
          key={idx}
          id={idx}
          width={box.width}
          height={box.height}
          backgroundColor={box.backgroundColor}
          removeBox={removeBox}
        />
      ))}
    </div>
  );
}

export default BoxList;
