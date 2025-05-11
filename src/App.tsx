import { useState } from "react";

import Counter from "./components/Counter";
import Game from "./components/Game";
import type { Player } from "./components/Game";

import "./global.css";
import ThemeButton from "./components/ThemeButton";

function App() {
  const [xWins, setXWins] = useState<number>(0);
  const [oWins, setOWins] = useState<number>(0);

  const handleWin = (player: Player) => {
    if (player === "X") setXWins(xWins + 1);
    else setOWins(oWins + 1);
  };

  return (
    <section className="w-full min-h-dvh   dark:bg-neutral-950">
      <div className="flex justify-between p-4">
        <Counter xWins={xWins} oWins={oWins} />
        <ThemeButton />
      </div>
      <Game onWin={handleWin} className="mt-4" />
    </section>
  );
}

export default App;
