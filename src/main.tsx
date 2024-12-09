import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { persistor, store } from "./redux/store.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider attribute="class" defaultTheme="system">
      <PersistGate persistor={persistor} loading={null}>
        <StrictMode>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
              <Toaster visibleToasts={5} position="top-right" richColors />
            </QueryClientProvider>
          </BrowserRouter>
        </StrictMode>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
