"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Score() {
  const [match, setMatch] = useState<Match>({
    games: 0,
    player1: {
      name: "Jogador 1",
      games: 0,
      points: [0],
    },
    player2: {
      name: "Jogador 2",
      games: 0,
      points: [0],
    },
    firstService: 1,
    datetime: new Date(),
  });
  useEffect(() => {
    const localMatch = localStorage.getItem("match");
    if (localMatch) {
      setMatch(JSON.parse(localMatch));
    }
    console.log(match.firstService === 1 ? "true" : "false");
    setPlayer1Service(match.firstService === 1 ? true : false);
  }, []);

  const [player1Service, setPlayer1Service] = useState(
    match.firstService === 1 ? true : false
  );
  const [pointsPlayer1, setPointsPlayer1] = useState(0);
  const [pointsPlayer2, setPointsPlayer2] = useState(0);
  const [gamesPlayer1, setGamesPlayer1] = useState(match.player1.games);
  const [gamesPlayer2, setGamesPlayer2] = useState(match.player2.games);

  const router = useRouter();

  function changePoint(action: string, player: number) {
    if (action === "+") {
      if (player === 1) {
        setPointsPlayer1((prevPoints) => {
          const newPoints = prevPoints + 1;
          changeService(newPoints, pointsPlayer2);
          checkEndOfGame(newPoints, pointsPlayer2);
          return newPoints;
        });
      } else {
        setPointsPlayer2((prevPoints) => {
          const newPoints = prevPoints + 1;
          changeService(pointsPlayer1, newPoints);
          checkEndOfGame(pointsPlayer1, newPoints);
          return newPoints;
        });
      }
    } else {
      if (player === 1) {
        setPointsPlayer1((prevPoints) => {
          const newPoints = prevPoints > 0 ? prevPoints - 1 : 0;
          changeService(newPoints, pointsPlayer2);
          checkEndOfGame(newPoints, pointsPlayer2);
          return newPoints;
        });
      } else {
        setPointsPlayer2((prevPoints) => {
          const newPoints = prevPoints > 0 ? prevPoints - 1 : 0;
          changeService(pointsPlayer1, newPoints);
          checkEndOfGame(pointsPlayer1, newPoints);
          return newPoints;
        });
      }
    }
  }

  function changeService(pointsPlayer1: number, pointsPlayer2: number) {
    const total = pointsPlayer1 + pointsPlayer2;
    if (total < 20) {
      if (total > 1 && total % 2 === 0) {
        setPlayer1Service(!player1Service);
      }
    } else {
      setPlayer1Service(!player1Service);
    }
  }

  function checkEndOfGame(pointsPlayer1: number, pointsPlayer2: number) {
    if (pointsPlayer1 > 10 && pointsPlayer1 > pointsPlayer2 + 1) {
      Swal.fire({
        title: `Vitória de ${match.player1.name}!`,
        text: `Confirme o resultado: ${pointsPlayer1} x ${pointsPlayer2}`,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          match.player1.games++;
          match.player1.points.push(pointsPlayer1);
          match.player2.points.push(pointsPlayer2);
          match.datetime = new Date();
          console.log("(1) MATCH");
          console.log(match);
          localStorage.setItem("match", JSON.stringify(match));
          setGamesPlayer1((prevPoints) => {
            const gamesCount = prevPoints + 1;
            checkEndOfMatch(gamesCount, gamesPlayer2);
            return gamesCount;
          });
          setPointsPlayer1(0);
          setPointsPlayer2(0);
          setPlayer1Service(match.firstService === 1 ? true : false);
        }
      });
    }
    if (pointsPlayer2 > 10 && pointsPlayer2 > pointsPlayer1 + 1) {
      Swal.fire({
        title: `Vitória de ${match.player2.name}!`,
        text: `Confirme o resultado: ${pointsPlayer2} x ${pointsPlayer1}`,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          match.player2.games++;
          match.player2.points.push(pointsPlayer2);
          match.player1.points.push(pointsPlayer1);
          match.datetime = new Date();
          console.log("(2) MATCH");
          console.log(match);
          localStorage.setItem("match", JSON.stringify(match));
          setGamesPlayer2((prevPoints) => {
            const gamesCount = prevPoints + 1;
            checkEndOfMatch(gamesPlayer1, gamesCount);
            return gamesCount;
          });
          setPointsPlayer1(0);
          setPointsPlayer2(0);
          setPlayer1Service(match.firstService === 1 ? true : false);
        }
      });
    }
  }

  function checkEndOfMatch(gamesPlayer1: number, gamesPlayer2: number) {
    if (gamesPlayer1 === match.games) {
      Swal.fire({
        title: `Fim de jogo!`,
        text: `Vitória de ${match.player1.name}!`,
        icon: "success",
        confirmButtonText: "Ok, salvar jogo e voltar para o início",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          recordMatch();
        }
      });
    } else if (gamesPlayer2 === match.games) {
      Swal.fire({
        title: `Fim de jogo!`,
        text: `Vitória de ${match.player2.name}!`,
        icon: "success",
        confirmButtonText: "Ok, salvar jogo e voltar para o início",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          recordMatch();
        }
      });
    }
  }

  function recordMatch() {
    const localHistory = localStorage.getItem("history");
    let history: Match[] = [];
    if (localHistory) {
      history = JSON.parse(localHistory);
    }
    history.push(match);
    localStorage.setItem("history", JSON.stringify(history));
    router.back();
  }

  return (
    <>
      {match ? (
        <section className="w-full flex flex-col">
          <div className="w-full flex gap-4 justify-around">
            <PlayerCard
              player={(gamesPlayer1 + gamesPlayer2) % 2 === 0 ? 1 : 2}
            />
            <div className="flex gap-2 flex-col items-center justify-center">
              <p className="text-3xl">Saque</p>
              <div className="py-4 flex gap-6 items-center justify-center">
                <div className="w-16">
                  {player1Service ? (
                    <img src="service.svg" alt="Saque do jogador 1" />
                  ) : (
                    ""
                  )}
                </div>
                <button onClick={() => setPlayer1Service(!player1Service)}>
                  <ArrowRightLeft
                    size={48}
                    className="hover:text-primary transition-colors"
                  />
                </button>
                <div className="w-16">
                  {!player1Service ? (
                    <img src="service-2.svg" alt="Saque do jogador 2" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <p className="text-2xl">Sets</p>
              <p className="text-5xl">
                {(gamesPlayer1 + gamesPlayer2) % 2 === 0
                  ? gamesPlayer1
                  : gamesPlayer2}
                x
                {(gamesPlayer1 + gamesPlayer2) % 2 === 0
                  ? gamesPlayer2
                  : gamesPlayer1}
              </p>
            </div>
            <PlayerCard
              player={(gamesPlayer1 + gamesPlayer2) % 2 === 0 ? 2 : 1}
            />
          </div>
          <div className="mt-8 flex gap-4 self-end">
            <Link href="/">
              <Button variant={"outline"}>Voltar para o início</Button>
            </Link>
          </div>
        </section>
      ) : (
        <p className="w-full h-screen flex items-center justify-center text-3xl font-semibold text-primary">
          Carregando...
        </p>
      )}
    </>
  );
  function PlayerCard({ player }: { player: number }) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-4xl">
          {player === 1 ? match.player1.name : match.player2.name}
        </h3>
        <p
          className={clsx(
            "text-[10rem] py-2 border-2 rounded-lg my-2 w-full text-center",
            { "border-primary": player === 1 },
            { "border-red-500": player === 2 }
          )}
        >
          {player === 1 ? pointsPlayer1 : pointsPlayer2}
        </p>
        <div className="flex gap-4">
          <Button
            className={clsx("text-3xl font-bold px-16 py-6", {
              "bg-red-500 hover:bg-red-600": player === 2,
            })}
            onClick={() => changePoint("+", player)}
          >
            +
          </Button>
          <Button
            className={clsx("text-3xl font-bold px-16 py-6", {
              "bg-red-500 hover:bg-red-600": player === 1,
            })}
            onClick={() => changePoint("-", player)}
          >
            -
          </Button>
        </div>
      </div>
    );
  }
}
