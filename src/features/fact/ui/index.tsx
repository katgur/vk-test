import {
    Button,
    Group,
    Header,
    Panel,
    Textarea,
    ScreenSpinner,
    FormItem,
    FormLayoutGroup,
} from "@vkontakte/vkui";
import Error from "@shared/error";
import useGetFactQuery from "../api/useGetFactQuery";
import useCursorAfterFirstWord from "../lib/useCursorAfterFirstWord";

interface FactPanelProps {
    id: string;
}

function FactPanel({ id }: FactPanelProps) {
    const { isPending, error, data, refetch } = useGetFactQuery();
    const textareaRef = useCursorAfterFirstWord(data?.fact);

    if (isPending) {
        return <ScreenSpinner />;
    }

    if (error) {
        return <Error error={error.message} />;
    }

    return (
        <Panel id={id}>
            <Group header={<Header mode="secondary">Fact</Header>}>
                <FormLayoutGroup>
                    <FormItem>
                        <Textarea
                            key={data.fact.slice(0, 32)}
                            maxHeight={300}
                            defaultValue={data.fact}
                            getRef={textareaRef}
                        />
                    </FormItem>
                    <FormItem>
                        <Button onClick={() => refetch()} type="button">
                            Click here
                        </Button>
                    </FormItem>
                </FormLayoutGroup>
            </Group>
        </Panel>
    );
}

export default FactPanel;
