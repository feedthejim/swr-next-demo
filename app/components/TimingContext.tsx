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
}

const TimingContext = createContext<TimingContextType | undefined>(undefined);

export function TimingProvider({ children }: { children: ReactNode }) {
  const [timing, setTiming] = useState<{
    server: TimingData;
    client: TimingData;
  }>({
    server: {
      fallback: 0,
      final: 0,
    },
    client: {
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
