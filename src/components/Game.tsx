import { useState } from "react";

export type Player = "X" | "O";

export default function Game({
  className,
  onWin,
}: {
  className?: string;
  onWin: (player: Player) => void;
}) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>();
  const [gameOver, setGameOver] = useState<boolean>(false);

  const WinningTiles = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const HandleReset = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
    setGameOver(false);
  };

  const HandleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const hasWon = WinningTiles.some((combo) =>
      combo.every((i) => newBoard[i] === player)
    );

    if (hasWon) {
      setGameOver(true);
      setWinner(player);
      onWin(player);
      return;
    }

    const isFull = newBoard.every((tile) => tile !== null);

    if (isFull) {
      setGameOver(true);
      return;
    }

    setPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <section
      className={` ${className} w-full flex items-center justify-center flex-col`}
    >
      <div className="mb-8 dark:text-white">
        {gameOver ? (
          <p className="text-3xl">
            {gameOver
              ? winner
                ? `${winner} Won The Game`
                : "It's a draw!"
              : ""}
          </p>
        ) : (
          <p className="text-2xl">{player} Turn</p>
        )}
      </div>
      <div className="grid grid-cols-3 grid-rows-3">
        {board.map((tile, index) => (
          <div
            onClick={() => {
              HandleClick(index);
            }}
            key={index}
            className={`${tile === null ? "" : "pointer-events-none"} ${
              gameOver ? "pointer-events-none" : ""
            } w-[150px] h-[150px] max-md:w-[100px] max-md:h-[100px] dark:text-white dark:border-neutral-700 text-2xl cursor-pointer font-bold flex justify-center items-center border-2`}
          >
            {tile}
          </div>
        ))}
      </div>
      {/* {gameOver && ( */}
      <button
        onClick={() => {
          HandleReset();
        }}
        className="mt-6 px-4 py-2 cursor-pointer rounded-md bg-neutral-600 text-white"
      >
        Play Again
      </button>
      {/* )} */}
    </section>
  );
}
