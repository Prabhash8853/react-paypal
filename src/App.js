import React from "react";
import PaypalButton from "./PaypalButton";

function App() {
  const product = {
    price: 777.77,
    name: "comfy chair",
    description: "fancy chair, like new"
  };

  return (
    <div className="App">
      <PaypalButton product={product} />
    </div>
  );
}

export default App;
