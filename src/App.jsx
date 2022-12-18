import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  function createNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    };
  }

  function allNewDice() {
    const randomNums = [];
    for (let i = 0; i < 10; i++) {
      randomNums.push(createNewDie());
    }
    return randomNums;
  }

  function holdDie(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice);
      setTenzies(false);
    }

    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld ? die : createNewDie();
      });
    });
  }

  useEffect(() => {
    const allEqual = (dice) =>
      dice.every((die) => die.value === dice[0].value && die.isHeld);
    const result = allEqual(dice);

    if (result) {
      setTenzies(true);
      console.log("tenzies");
    }
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="dice-container">
        {dice.map((die) => (
          <Die key={die.id} die={die} holdDie={holdDie} />
        ))}
      </div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "Restart" : "Roll"}
      </button>
    </main>
  );
}

export default App;
