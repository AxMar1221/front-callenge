import React, { useState } from "react";
import Component from "./components/Moveable";
// import MoveableC from "./components/Moveable";

// const BGSIZE = ["contain", "cover", "fill", "scale-down", "none"];
// const apiURL = "https://jsonplaceholder.typicode.com/photos?albumId=1";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  const addMoveable = async () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    let gbImages = []
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/photos')
      const data = await resp.json()
      gbImages = data
    } catch (error) {
      console.log(error)
    }
    const imageRandom = gbImages[Math.floor(Math.random() * gbImages.length)].url
    const path = `url(${imageRandom})`

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        backgroundImage: path,
        updateEnd: true
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });

    setMoveableComponents(updatedMoveables);
  };

  const deleteMoveable = () => {
    const newArray = [...moveableComponents];
    newArray.pop();
    setMoveableComponents(newArray);
  };

  const tab = <>&nbsp;&nbsp;</>;

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
      <button type="button" onClick={addMoveable} className="btn">
        Add Moveable
      </button>
      {tab}
      <button type="button" onClick={deleteMoveable} className="btn">
        Delete Moveable
      </button>
      </div>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            setSelected={setSelected}
            isSelected={selected === item.id}
            // image={data[index]}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
