import { AppRoot, SplitCol, SplitLayout } from "@vkontakte/vkui";
import FactView from "../widgets/fact/ui";
import "@vkontakte/vkui/dist/vkui.css";
import NameView from "../widgets/name/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <AppRoot>
            <QueryClientProvider client={queryClient}>
                <SplitLayout className="center">
                    <SplitCol maxWidth={560}>
                        <FactView />
                        <NameView />
                    </SplitCol>
                </SplitLayout>
            </QueryClientProvider>
        </AppRoot>
    );
}

export default App;
