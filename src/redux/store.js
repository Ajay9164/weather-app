import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";

const store = configureStore({
  reducer: { weather: weatherReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
