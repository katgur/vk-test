import { AppRoot } from "@vkontakte/vkui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "../pages/main";
import "@vkontakte/vkui/dist/vkui.css";

const queryClient = new QueryClient();

function App() {
    return (
        <AppRoot>
            <QueryClientProvider client={queryClient}>
                <MainPage />
            </QueryClientProvider>
        </AppRoot>
    );
}

export default App;
