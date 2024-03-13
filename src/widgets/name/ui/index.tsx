import {
    Button,
    Group,
    Header,
    Panel,
    View,
    Text,
    FormItem,
    FormLayoutGroup,
    Input,
    ScreenSpinner,
} from "@vkontakte/vkui";
import { useState } from "react";
import api from "../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "../../../features/error";

interface FormValues {
    name: string;
}

const schema = yup
    .object({
        name: yup
            .string()
            .required()
            .max(50)
            .matches(/[a-zA-Z]/, "Input must be only letters"),
    })
    .required();

function NameView() {
    const [name, setName] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ["nameInfo", name],
        queryFn: async ({ signal }) => {
            return await api.getNameInfo(name, signal);
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const nameField = register("name");

    const onSubmit = handleSubmit((data) => {
        if (data.name === name) {
            return;
        }
        queryClient.cancelQueries({ queryKey: ["nameInfo"] });
        setName(data.name);
    });

    if (isPending) {
        return <ScreenSpinner />;
    }

    if (error) {
        return <Error error={error.message} />;
    }

    return (
        <View activePanel="name">
            <Panel id="name">
                <Group header={<Header mode="secondary">Name</Header>}>
                    <FormLayoutGroup>
                        <form onSubmit={onSubmit}>
                            <FormItem>
                                {errors.name && (
                                    <Text>{`Invalid input: ${errors.name.message}`}</Text>
                                )}
                                <Input
                                    name={nameField.name}
                                    onBlur={nameField.onBlur}
                                    onChange={nameField.onChange}
                                    getRef={nameField.ref}
                                    type="text"
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
        </View>
    );
}

export default NameView;
