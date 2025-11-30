"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";

export function WorldMapDemo() {
  return (
    <div className="py-40 bg-white dark:bg-[#030303] w-full transition-colors">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="font-bold text-xl md:text-4xl text-gray-900 dark:text-white mb-2">
          Présence{" "}
          <span className="text-gray-500 dark:text-neutral-400">
            {"Mondiale".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-gray-600 dark:text-neutral-500 max-w-2xl mx-auto py-4">
          Nos solutions digitales rayonnent à travers le monde. Nous accompagnons des clients
          sur tous les continents pour transformer leur vision en réalité numérique.
        </p>
      </div>
      <WorldMap
        lineColor="#A543F1"
        dots={[
          {
            start: {
              lat: 48.8566,
              lng: 2.3522,
            }, // Paris
            end: {
              lat: 40.7128,
              lng: -74.0060,
            }, // New York
          },
          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
          },
          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 1.3521, lng: 103.8198 }, // Singapore
          },
          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
          },
          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: 25.2048, lng: 55.2708 }, // Dubai
          },
        ]}
      />
    </div>
  );
}
