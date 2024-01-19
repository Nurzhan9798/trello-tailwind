import { createRoot } from "react-dom/client";
import { App } from "app/App";
import { StoreProvider } from "app/providers/StoreProvider";
const root = createRoot(document.getElementById("root"));

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
