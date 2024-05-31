import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-3xl">Placar de tênis de mesa online</h1>
      <ModeToggle />
    </header>
  );
}
