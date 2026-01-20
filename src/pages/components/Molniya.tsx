import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function LightningBackground() {
  const init = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="lightning"
      init={init}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: "#070b16",
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 45,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#7df9ff", "#4cc9f0", "#4361ee"],
          },
          opacity: {
            value: 0.9,
          },
          size: {
            value: 1.2,
          },
          move: {
            enable: true,
            speed: 1.5,
            random: true,
            straight: false,
            outModes: "out",
          },
          links: {
            enable: true,
            distance: 140,
            color: "#7df9ff",
            opacity: 0.7,
            width: 2,
            blink: true,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 120,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
