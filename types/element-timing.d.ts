declare global {
  interface PerformanceElementTiming extends PerformanceEntry {
    renderTime: number;
    loadTime: number;
    identifier: string;
  }
  
  interface Window {
    __elementTimingEntries: Array<{
      identifier: string;
      renderTime: number;
      timestamp: number;
    }>;
    __elementTimingObserver: PerformanceObserver;
    __customTimingMarks: Record<string, number>;
    __recordElementTiming: (identifier: string) => void;
  }
  
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      elementtiming?: string;
    }
    
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
      elementtiming?: string;
    }
  }
}

export {};