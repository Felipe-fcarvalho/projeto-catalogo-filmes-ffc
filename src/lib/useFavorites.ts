"use client"

import { useSyncExternalStore } from "react";
import type { Movie } from "./movie";

const KEY = "favoritos";
const EVENT = "favoritos:change";
const EMPTY: Movie[] = [];

let cache: { raw: string | null; value: Movie[] } = { raw: null, value: EMPTY };

function getSnapshot(): Movie[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== cache.raw) {
      cache = { raw, value: raw ? (JSON.parse(raw) as Movie[]) : EMPTY };
    }
    return cache.value;
  } catch {
    return EMPTY;
  }
}

function getServerSnapshot(): Movie[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  }
}

function save(list: Movie[]) { 
  try { 
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT));
  } catch {

  }
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  const toggle = (movie: Movie) => 
    save(
      isFavorite(movie.id)
      ? favorites.filter((m) => m.id !== movie.id)
      : [...favorites, movie]
    );

    return { favorites, isFavorite, toggle };
}
