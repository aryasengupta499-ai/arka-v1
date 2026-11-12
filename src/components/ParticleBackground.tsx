"use client";

import { useEffect } from "react";
import { loadFull } from "tsparticles";
import { Particles } from "react-tsparticles";

export default function ParticleBackground() {
  useEffect(() => {
    loadFull(undefined as any);
  }, []);

  const particlesOptions: any = {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#ffffff", "#22d3ee", "#8b5cf6"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          minimum: 0.1,
        },
      },
      size: {
        value: 1.5,
        random: true,
      },
      links: {
        enable: true,
        distance: 120,
        color: "#ffffff",
        opacity: 0.15,
        width: 0.5,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.4,
          },
        },
        push: {
          particles_nb: 2,
        },
      },
    },
    background: {
      color: "transparent",
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      className="fixed inset-0 z-[-1] w-full h-full pointer-events-none"
    />
  );
}
