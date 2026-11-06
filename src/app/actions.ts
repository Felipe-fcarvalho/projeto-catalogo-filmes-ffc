"use server";

import { redirect } from "next/navigation";
import { getRandomMovieId } from "../lib/tmdb";

export async function sortearFilme(formData: FormData){
  const raw = Number(formData.get("genero"));
  const genero = Number.isInteger(raw) && raw > 0 ? raw : undefined;

  const id = await getRandomMovieId(genero);
  redirect(id ? `/filme/${id}` : "/");
}