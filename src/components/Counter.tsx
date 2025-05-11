type Props = {
  xWins: number;
  oWins: number;
};

export default function Counter({ xWins, oWins }: Props) {
  return (
    <div className="flex gap-4 dark:text-white p-4">
      <p className="font-bold">X wins: {xWins}</p>
      <p className="font-bold">O wins: {oWins}</p>
    </div>
  );
}
