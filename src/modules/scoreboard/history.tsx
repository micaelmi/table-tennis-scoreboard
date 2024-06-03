"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";

export default function History() {
  const localHistory = localStorage.getItem("history");
  let history: Match[] = [];
  if (localHistory) {
    history = JSON.parse(localHistory);
  }
  return (
    <div className="mt-8">
      <h2 className="text-xl">Histórico de partidas</h2>
      <Table className="border my-2">
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead>Data</TableHead>
            <TableHead>Jogador 1</TableHead>
            <TableHead>Jogador 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((match) => (
            <TableRow>
              <TableCell>{format(match.datetime, "dd/MM/yyyy")}</TableCell>
              <TableCell>
                {match.player1.name} - {match.player1.games}
                {" ( "}
                {match.player1.points.map((partial) => partial + " ")})
              </TableCell>
              <TableCell>
                {match.player2.name} - {match.player2.games}
                {" ( "}
                {match.player2.points.map((partial) => partial + " ")})
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant={"outline"}
        title="Apagar histórico"
        className="flex gap-2"
      >
        <Trash2Icon />
        Limpar
      </Button>
    </div>
  );
}
