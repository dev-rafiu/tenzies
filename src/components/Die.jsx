import React from "react";

function Die({ die, holdDie }) {
  const styles = {
    backgroundColor: die.isHeld ? "#59E391" : "#fff",
  };

  return (
    <button style={styles} className="die" onClick={() => holdDie(die.id)}>
      {die.value}
    </button>
  );
}

export default Die;
