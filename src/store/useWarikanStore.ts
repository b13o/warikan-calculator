// src/store/useWarikanStore.ts

import { create } from "zustand";
import { Expense } from "../types";

type State = {
  inputMember: string;
  inputExpense: Expense;
  members: string[];
  expenses: Expense[];
};

type Action = {
  updateInputMember: (inputMember: string) => void;
  updateInputExpense: (inputExpense: Expense) => void;
  addMember: () => void;
  addExpense: () => void;
  removeExpense: (description: string) => void;
};

const useWarikanStore = create<State & Action>((set) => ({
  // initial state
  inputMember: "",
  inputExpense: { paidBy: "", description: "", amount: 0 },
  members: [],
  expenses: [],

  // actions
  updateInputMember: (inputMember: string) =>
    set(() => ({ inputMember: inputMember })),
  updateInputExpense: (inputExpense: Expense) =>
    set(() => ({ inputExpense: inputExpense })),

  addMember: () =>
    set((state) => {
      const trimmedMember = state.inputMember.trim();
      const isDuplicateMember = state.members.includes(trimmedMember);
      if (trimmedMember && !isDuplicateMember) {
        return {
          members: [...state.members, trimmedMember],
          inputMember: "",
        };
      }
      return state;
    }),
  addExpense: () =>
    set((state) => {
      const { paidBy, description, amount } = state.inputExpense;
      const trimmedDescription = description.trim();
      const isDuplicateDescription = state.expenses.some(
        (expense) => expense.description === trimmedDescription
      );
      if (paidBy && trimmedDescription && amount && !isDuplicateDescription) {
        return {
          expenses: [
            ...state.expenses,
            { ...state.inputExpense, description: trimmedDescription },
          ],
          inputExpense: { paidBy: "", description: "", amount: 0 },
        };
      }
      return state;
    }),
  removeExpense: (description: string) =>
    set((state) => {
      return {
        expenses: state.expenses.filter(
          (expense) => expense.description !== description
        ),
      };
    }),
}));

export default useWarikanStore;
