import ReactDOM from "react-dom/client";
import App from "./app/index.tsx";
import AppConfig from "./app/AppConfig.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppConfig>
        <App />
    </AppConfig>
);
