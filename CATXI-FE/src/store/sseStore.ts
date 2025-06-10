import { create } from 'zustand';
import type { SseEvent } from '../types/sse/sseTypes';

interface SseStore {
  events: SseEvent[];
  addEvent: (event: SseEvent) => void;
  clearEvents: () => void;
}

export const useSseStore = create<SseStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  clearEvents: () => set({ events: [] }),
}));
