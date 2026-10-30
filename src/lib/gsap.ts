import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

// Register plugins once centrally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);
}

export { gsap, ScrollTrigger, Draggable, useGSAP };

