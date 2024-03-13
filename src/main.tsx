import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>
);
