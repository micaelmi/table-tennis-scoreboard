export default function History() {
  const localHistory = localStorage.getItem("history");
  let history: Match[] = [];
  if (localHistory) {
    history = JSON.parse(localHistory);
  }
  return (
    <div>
      <h2>Histórico de partidas</h2>
      {history.map((match) => (
        <div className="flex gap-4">
          <p>{match.datetime.toString()}</p>
          <p>{match.player1.name}</p>
          <p>
            {match.player1.games} -{" "}
            {match.player1.points.map((partial) => partial + " | ")}
          </p>
          <p>{match.player2.name}</p>
          <p>
            {match.player1.games} -{" "}
            {match.player2.points.map((partial) => partial)}
          </p>
        </div>
      ))}
    </div>
  );
}
