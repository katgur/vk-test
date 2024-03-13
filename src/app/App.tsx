import { AppRoot, SplitCol, SplitLayout } from "@vkontakte/vkui";
import FactView from "../widgets/fact/ui";
import '@vkontakte/vkui/dist/vkui.css';

function App() {
    return (
        <AppRoot>
            <SplitLayout className="center">
                <SplitCol maxWidth={560} autoSpaced>
                    <FactView />
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
}

export default App;
