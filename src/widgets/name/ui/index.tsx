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
} from "@vkontakte/vkui";
import { ChangeEvent, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import Error from "../../../features/error";
import useDebounce from "../../../shared/debounce/useDebounce";
import useGetNameInfoQuery from "../api/useGetNameInfoQuery";

interface FormValues {
    name: string;
}

const schema = yup
    .object({
        name: yup
            .string()
            .required()
            .max(50)
            .matches(/^[a-zA-Z]+$/, "Input must be only letters"),
    })
    .required();

interface NamePanelProps {
    id: string;
}

function NamePanel({ id }: NamePanelProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const queryClient = useQueryClient();
    const { result, name, setName } = useGetNameInfoQuery();
    const handleChange = useDebounce((name) => setName(name), 3000);

    const { data, isPending, error } = result;

    const nameField = register("name");

    const onSubmit = handleSubmit((data) => {
        if (data.name === name) {
            return;
        }
        queryClient.cancelQueries({ queryKey: ["nameInfo"] });
        setName(data.name);
    });

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            nameField.onChange(e);
            const name = e.target.value;
            if (schema.isValidSync({ name })) {
                handleChange(name);
            }
        },
        [handleChange, nameField]
    );

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
                    <form onSubmit={onSubmit}>
                        <FormItem>
                            {errors.name && (
                                <Text>{`Invalid input: ${errors.name.message}`}</Text>
                            )}
                            <Input
                                name={nameField.name}
                                onBlur={nameField.onBlur}
                                onChange={onChange}
                                getRef={nameField.ref}
                                type="text"
                                defaultValue={name}
                            />
                            {data && <Text>{`Age: ${data.age}`}</Text>}
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
