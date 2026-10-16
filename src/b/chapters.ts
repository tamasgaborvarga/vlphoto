/**
 * A B verzió gerince: öt megszámozott fejezet.
 *
 * A sorszám itt dől el — a fejezetcímek és a navigáció is innen kapja,
 * hogy sose csússzon el egymástól a kettő.
 */
export type Chapter = { id: string; n: number; title: string };

export const chapters: Chapter[] = [
  { id: "munka", n: 1, title: "Válogatott munkák" },
  { id: "iranyok", n: 2, title: "Három irány" },
  { id: "rolam", n: 3, title: "Rólam" },
  { id: "archivum", n: 4, title: "Teljes anyag" },
  { id: "kapcsolat", n: 5, title: "Kapcsolat" },
];

export const chapter = (id: string): Chapter =>
  chapters.find((c) => c.id === id) ?? chapters[0];
