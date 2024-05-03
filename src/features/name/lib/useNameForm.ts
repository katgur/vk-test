import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface FormValues {
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

function useNameForm() {
    const nameForm = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    return { ...nameForm, schema };
}

export default useNameForm;
