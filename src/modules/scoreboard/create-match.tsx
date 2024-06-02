"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputItem } from "@/components/form-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  player1: z.string().min(2, {
    message: "Digite o nome do jogador 1.",
  }),
  player2: z.string().min(2, {
    message: "Digite o nome do jogador 2.",
  }),
  games: z.string().length(1, { message: "Escolha uma opção" }),
  firstService: z.string().length(1, { message: "Escolha uma opção" }),
});

export default function CreateMatch() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      player1: "",
      player2: "",
      games: "",
      firstService: "",
    },
  });
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const match = {
      games: Number(data.games),
      player1: {
        name: data.player1,
        games: 0,
        points: [],
      },
      player2: {
        name: data.player2,
        games: 0,
        points: [],
      },
      firstService: Number(data.firstService),
      datetime: new Date(),
    };

    localStorage.setItem("match", JSON.stringify(match));

    toast("Sucesso!", {
      description: "O jogo foi criado.",
      action: {
        label: "OK",
        onClick: () => console.log("ok"),
      },
    });
    router.push("match");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo jogo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo jogo</DialogTitle>
          <DialogDescription>Inicie uma nova partida.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <InputItem
              control={form.control}
              name="player1"
              label="Jogador 1"
              placeholder="Digite o nome do jogador 1"
            />
            <InputItem
              control={form.control}
              name="player2"
              label="Jogador 2"
              placeholder="Digite o nome do jogador 2"
            />
            <FormField
              control={form.control}
              name="games"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sets</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione melhor de quantos sets" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">3</SelectItem>
                      <SelectItem value="3">5</SelectItem>
                      <SelectItem value="4">7</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quem começa sacando?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o jogador que começará" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Jogador 1</SelectItem>
                      <SelectItem value="2">Jogador 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Começar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
