import { Camera, Heart, Snowflake, Trees } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
};

/**
 * A megrendelő által megadott négy szolgáltatási kategória.
 * Leírás, ár, időtartam és csomag szándékosan NINCS — ilyen adatot nem kaptunk,
 * és nem találunk ki. Amint Lilla megadja, ide kerülhet egy `description` mező.
 */
export const services: Service[] = [
  { id: "portre", title: "Portréfotózás", icon: Camera },
  { id: "paros", title: "Jegyes és páros fotózás", icon: Heart },
  { id: "szezonalis", title: "Karácsonyi és szezonális fotózás", icon: Snowflake },
  { id: "kreativ", title: "Kreatív szabadtéri fotózás", icon: Trees },
];
