"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
            <TableHead>Jogador</TableHead>
            <TableHead>Sets</TableHead>
            <TableHead>Parciais</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((match) => (
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
