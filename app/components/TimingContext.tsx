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
    if (typeof window === "undefined") {
      return;
    }

    const processStoredEntries = () => {
      if (!window.__elementTimingEntries) {
        console.log("no entries");
        return;
      }
      console.log("entries", window.__elementTimingEntries);
      setTiming((prevTiming) => {
        const newTiming = { ...prevTiming };

        for (const entry of window.__elementTimingEntries) {
          switch (entry.identifier) {
            case "server-fallback":
              if (!newTiming.server.fallback) {
                newTiming.server.fallback = entry.renderTime;
              }
              break;
            case "server-final":
              if (!newTiming.server.final) {
                newTiming.server.final = entry.renderTime;
              }
              break;
            case "client-fallback":
              if (!newTiming.client.fallback) {
                newTiming.client.fallback = entry.renderTime;
              }
              break;
            case "client-final":
              if (!newTiming.client.final) {
                newTiming.client.final = entry.renderTime;
              }
              break;
          }
        }

        return newTiming;
      });
    };

    // Process any entries that were already captured
    processStoredEntries();

    // Set up interval to check for new entries
    const interval = setInterval(processStoredEntries, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
