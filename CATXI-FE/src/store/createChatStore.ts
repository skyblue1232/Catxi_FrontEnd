import { create } from "zustand";

interface Answers {
  start: "in" | "out";
  end: "in" | "out";
  startPoint: string;
  endPoint: string;
  time: string;
  isToday: "today" | "tomorrow";
  size: number;
}

interface createChatStore {
  answers: Answers;
  updateAnswer: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  clearAnswer: () => void;
}

export const useChatStore = create<createChatStore>((set) => ({
  answers: {
    start: "out",
    end: "out",
    startPoint: "",
    endPoint: "",
    time: "",
    isToday: "today",
    size: 0,
  },
  updateAnswer: (key, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [key]: value,
      },
    })),
  clearAnswer: () =>
    set(() => ({
      answers: {
        start: "out",
        end: "out",
        startPoint: "",
        endPoint: "",
        time: "",
        isToday: "today",
        size: 0,
      },
    })),
}));
