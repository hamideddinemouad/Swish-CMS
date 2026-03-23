"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";

type StorProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StorProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
