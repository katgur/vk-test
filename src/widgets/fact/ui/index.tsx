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
    ScreenSpinner,
} from "@vkontakte/vkui";
import { useEffect, useRef } from "react";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import Error from "../../../features/error";

function FactView() {
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ["fact"],
        queryFn: api.getFact,
        refetchOnWindowFocus: false,
        retry: false,
    });
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!data) {
            return;
        }

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
        setCursorAt(getFirstWordEnd(data.fact));
    }, [data]);

    if (isPending) {
        return <ScreenSpinner />;
    }

    if (error) {
        return <Error error={error.message} />
    }

    return (
        <View activePanel="fact">
            <Panel id="fact">
                <Group header={<Header mode="secondary">Fact</Header>}>
                    {error && <Text>{`Error: ${error}`}</Text>}
                    <FormLayoutGroup>
                        <FormItem>
                            <Textarea value={data.fact} getRef={textAreaRef} />
                        </FormItem>
                        <FormItem>
                            <Button onClick={() => refetch()} type="submit">
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
