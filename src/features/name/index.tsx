import {
    Button,
    Group,
    Header,
    Panel,
    Text,
    FormItem,
    FormLayoutGroup,
    Input,
    ScreenSpinner,
    Caption,
} from "@vkontakte/vkui";
import Error from "../../features/error";
import useGetNameInfoQuery from "../../shared/name/api/useGetNameInfoQuery";
import useNameForm from "./lib/useNameForm";
import useNameField from "./lib/useNameField";

interface NamePanelProps {
    id: string;
}

function NamePanel({ id }: NamePanelProps) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        schema,
    } = useNameForm();
    const { result, name, setName, cancel } = useGetNameInfoQuery();
    const nameField = useNameField({
        register,
        defaultValue: name,
        handleChange: (name: string) => {
            if (schema.isValidSync({ name })) {
                setName(name);
            }
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (data.name === name) {
            return;
        }
        cancel();
        setName(data.name);
    });

    const { data, isPending, error } = result;

    if (isPending) {
        return <ScreenSpinner />;
    }

    if (error) {
        return <Error error={error.message} />;
    }

    return (
        <Panel id={id}>
            <Group header={<Header mode="secondary">Name</Header>}>
                <FormLayoutGroup>
                    <form onSubmit={onSubmit}>
                        <FormItem>
                            {errors.name && (
                                <Caption
                                    level="1"
                                    className="error"
                                >{`Invalid input: ${errors.name.message}`}</Caption>
                            )}
                            <Input {...nameField} />
                        </FormItem>
                        <FormItem>
                            {data && (
                                <Text weight="1">{`Age: ${data.age}`}</Text>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="submit">Submit</Button>
                        </FormItem>
                    </form>
                </FormLayoutGroup>
            </Group>
        </Panel>
    );
}

export default NamePanel;
