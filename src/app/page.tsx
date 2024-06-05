"use client";
import CreateMatch from "@/modules/scoreboard/create-match";
import History from "@/modules/scoreboard/history";
import Image from "next/image";

export default function Home() {
  return (
    <section className="py-6">
      <CreateMatch />
      <div className="w-full flex gap-4">
        <Image
          src="patola.svg"
          alt="Mascote"
          width={295}
          height={291}
          className="w-1/3"
        />

        <History />
      </div>
    </section>
  );
}
