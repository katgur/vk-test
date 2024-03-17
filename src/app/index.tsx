import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "@pages/main";
import AppConfig from "./AppConfig";

const queryClient = new QueryClient();

function App() {
    return (
        <AppConfig>
            <QueryClientProvider client={queryClient}>
                <MainPage />
            </QueryClientProvider>
        </AppConfig>
    );
}

export default App;
