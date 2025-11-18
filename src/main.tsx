import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "./styles/main.scss";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(<App />);
