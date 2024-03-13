import {
    SplitLayout,
    SplitCol,
    View,
    Group,
    CellButton,
} from "@vkontakte/vkui";
import FactPanel from "../../widgets/fact/ui";
import NamePanel from "../../widgets/name/ui";
import { useState } from "react";

function MainPage() {
    const [activePanel, setActivePanel] = useState<string>("fact");

    return (
        <SplitLayout className="center">
            <SplitCol maxWidth={280} autoSpaced>
                <Group>
                    <CellButton onClick={() => setActivePanel("fact")}>
                        Go to facts
                    </CellButton>
                    <CellButton onClick={() => setActivePanel("name")}>
                        Go to names
                    </CellButton>
                </Group>
            </SplitCol>
            <SplitCol maxWidth={560} autoSpaced>
                <View activePanel={activePanel}>
                    <FactPanel id="fact" />
                    <NamePanel id="name" />
                </View>
            </SplitCol>
        </SplitLayout>
    );
}

export default MainPage;
