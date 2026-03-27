interface Window {
  gtag: (command: string, ...args: any[]) => void;
  trackEvent: (eventName: string, eventParams?: Record<string, any>) => void;
}
