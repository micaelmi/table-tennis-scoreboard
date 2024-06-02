import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-3xl flex gap-4">
        <img src="icon.svg" alt="Ícone" className="w-10 h-10" />
        Placar de tênis de mesa online
      </h1>
      <ModeToggle />
    </header>
  );
}
