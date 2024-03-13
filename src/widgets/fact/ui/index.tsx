import {
    Button,
    Group,
    Header,
    Panel,
    Textarea,
    ScreenSpinner,
    SimpleCell,
} from "@vkontakte/vkui";
import { useEffect, useRef } from "react";
import Error from "../../../features/error";
import useGetFactQuery from "../api/useGetFactQuery";

interface FactPanelProps {
    id: string;
}

function FactPanel({ id }: FactPanelProps) {
    const { isPending, error, data, refetch } = useGetFactQuery();
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
        return <Error error={error.message} />;
    }

    return (
        <Panel id={id}>
            <Group header={<Header mode="secondary">Fact</Header>}>
                <Textarea value={data.fact} getRef={textAreaRef} />
                <SimpleCell>
                    <Button onClick={() => refetch()} type="button">
                        Click here
                    </Button>
                </SimpleCell>
            </Group>
        </Panel>
    );
}

export default FactPanel;
