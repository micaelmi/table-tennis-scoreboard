"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function History() {
  const [history, setHistory] = useState<Match[]>([]);
  useEffect(() => {
    const localHistory = localStorage.getItem("history");
    if (localHistory) {
      setHistory(JSON.parse(localHistory));
    }
  }, []);

  function deleteHistory() {
    Swal.fire({
      title: `Apagar o histórico de partidas?`,
      text: `Esta ação não poderá ser desfeita.`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("history");
        setHistory([]);
      }
    });
  }
  return (
    <div className="w-2/3">
      <h2 className="text-xl">Histórico de partidas</h2>
      <div className="my-2 max-h-[60vh] overflow-y-auto">
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead>Data</TableHead>
              <TableHead>Jogadores</TableHead>
              <TableHead>Sets</TableHead>
              <TableHead>Parciais</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length > 0 ? (
              history.map((match) => (
                <TableRow key={match.datetime.toString()}>
                  <TableCell>{format(match.datetime, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="bg-primary/30 p-1 rounded h-8 flex items-center justify-center mb-1">
                      {match.player1.name}
                    </div>
                    <div className="bg-primary/30 p-1 rounded h-8 flex items-center justify-center">
                      {match.player2.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="bg-primary/30 p-1 rounded w-8 h-8 flex items-center justify-center mb-1">
                      {match.player1.games}
                    </div>
                    <div className="bg-primary/30 p-1 rounded w-8 h-8 flex items-center justify-center">
                      {match.player2.games}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 mb-1">
                      {match.player1.points.map((partial) => (
                        <div className="bg-primary/30 p-1 rounded w-8 h-8 flex items-center justify-center">
                          {partial}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {match.player2.points.map((partial) => (
                        <div className="bg-primary/30 p-1 rounded w-8 h-8 flex items-center justify-center">
                          {partial}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Não há nenhuma partida registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        variant={"outline"}
        title="Apagar histórico"
        className="flex gap-2"
        onClick={() => deleteHistory()}
      >
        <Trash2Icon />
        Limpar
      </Button>
    </div>
  );
}
