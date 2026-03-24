"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store/store";
type StorProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StorProviderProps) {
  return <Provider store={store}><PersistGate loading={null} persistor={persistor}>{children} </PersistGate></Provider>;
}
