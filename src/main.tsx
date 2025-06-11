import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { AppRouter } from "./routes/index.tsx";
import { store } from "./store/index.ts";
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
      <Toaster position="top-center" />
    </Provider>
  </StrictMode>
);
