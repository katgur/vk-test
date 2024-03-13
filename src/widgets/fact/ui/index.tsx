import {
    Button,
    Group,
    Header,
    Panel,
    Textarea,
    View,
    Text,
    FormItem,
    FormLayoutGroup,
} from "@vkontakte/vkui";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/fact";

function FactView() {
    const [fact, setFact] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const setCursorAt = (pos: number) => {
            const textArea = textAreaRef.current;
            if (!textArea) {
                return;
            }
            textArea.focus();
            textArea.selectionEnd = pos;
        };

        const getFirstWordEnd = (text: string) => {
            return text.split(" ")[0].length;
        };
        setCursorAt(getFirstWordEnd(fact));
    }, [fact]);

    const onClick = useCallback(() => {
        setError(null);
        api.getFact()
            .then((response) => {
                setFact(response.fact);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    return (
        <View activePanel="fact">
            <Panel id="fact">
                <Group header={<Header mode="secondary">Fact</Header>}>
                    {error && <Text>{`Error: ${error}`}</Text>}
                    <FormLayoutGroup>
                        <FormItem>
                            <Textarea value={fact} getRef={textAreaRef} />
                        </FormItem>
                        <FormItem>
                            <Button onClick={onClick} type="submit">
                                Click here
                            </Button>
                        </FormItem>
                    </FormLayoutGroup>
                </Group>
            </Panel>
        </View>
    );
}

export default FactView;
