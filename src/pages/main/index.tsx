import {
    SplitLayout,
    SplitCol,
    View,
    Group,
    CellButton,
} from "@vkontakte/vkui";
import FactPanel from "../../features/fact";
import NamePanel from "../../features/name";
import { useState } from "react";

function MainPage() {
    const [activePanel, setActivePanel] = useState<string>("fact");

    return (
        <SplitLayout className="center">
            <SplitCol maxWidth={560} autoSpaced>
                <Group>
                    <CellButton onClick={() => setActivePanel("fact")}>
                        Go to facts
                    </CellButton>
                    <CellButton onClick={() => setActivePanel("name")}>
                        Go to names
                    </CellButton>
                </Group>
                <View activePanel={activePanel}>
                    <FactPanel id="fact" />
                    <NamePanel id="name" />
                </View>
            </SplitCol>
        </SplitLayout>
    );
}

export default MainPage;
