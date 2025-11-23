"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface TimingData {
  fallback: number;
  final: number;
}

interface TimingContextType {
  serverTiming: TimingData;
  clientTiming: TimingData;
  isomorphicTiming: TimingData;
}

const TimingContext = createContext<TimingContextType | undefined>(undefined);

export function TimingProvider({ children }: { children: ReactNode }) {
  const [timing, setTiming] = useState<{
    server: TimingData;
    client: TimingData;
    isomorphic: TimingData;
  }>({
    server: {
      fallback: 0,
      final: 0,
    },
    client: {
      fallback: 0,
      final: 0,
    },
    isomorphic: {
      fallback: 0,
      final: 0,
    },
  });

  useEffect(() => {
    const checkPerformanceMarks = () => {
      try {
        const marks = performance.getEntriesByType("mark");
        const newTiming = { ...timing };

        // Find marks and calculate timing
        const serverFallback = marks.find(
          (m) => m.name === "server-fallback-rendered"
        );
        const serverFinal = marks.find(
          (m) => m.name === "server-final-rendered"
        );
        const clientFallback = marks.find(
          (m) => m.name === "client-fallback-rendered"
        );
        const clientFinal = marks.find(
          (m) => m.name === "client-final-rendered"
        );
        const isomorphicFallback = marks.find(
          (m) => m.name === "isomorphic-fallback-rendered"
        );
        const isomorphicFinal = marks.find(
          (m) => m.name === "isomorphic-final-rendered"
        );

        if (serverFallback && !newTiming.server.fallback) {
          newTiming.server.fallback = serverFallback.startTime;
        }
        if (serverFinal && !newTiming.server.final) {
          newTiming.server.final = serverFinal.startTime;
        }
        if (clientFallback && !newTiming.client.fallback) {
          newTiming.client.fallback = clientFallback.startTime;
        }
        if (clientFinal && !newTiming.client.final) {
          newTiming.client.final = clientFinal.startTime;
        }
        if (isomorphicFallback && !newTiming.isomorphic.fallback) {
          newTiming.isomorphic.fallback = isomorphicFallback.startTime;
        }
        if (isomorphicFinal && !newTiming.isomorphic.final) {
          newTiming.isomorphic.final = isomorphicFinal.startTime;
        }
        console.log("newTiming", newTiming);
        setTiming(newTiming);
      } catch (error) {
        console.log("Performance API not available");
      }
    };

    const interval = setInterval(checkPerformanceMarks, 1000);

    return () => clearInterval(interval);
  }, [timing]);

  return (
    <TimingContext.Provider
      value={{
        serverTiming: timing.server,
        clientTiming: timing.client,
        isomorphicTiming: timing.isomorphic,
      }}
    >
      {children}
    </TimingContext.Provider>
  );
}

export function useTiming() {
  const context = useContext(TimingContext);
  if (context === undefined) {
    throw new Error("useTiming must be used within a TimingProvider");
  }
  return context;
}
