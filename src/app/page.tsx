"use client";
import CreateMatch from "@/modules/scoreboard/create-match";
import History from "@/modules/scoreboard/history";

export default function Home() {
  return (
    <section className="py-6">
      <CreateMatch />
      <History />
    </section>
  );
}
