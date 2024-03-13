import { ChangeEvent, useCallback, useMemo } from "react";
import useDebounce from "../../../shared/debounce/useDebounce";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "./useNameForm";

interface NameFieldProps {
    register: UseFormRegister<FormValues>;
    defaultValue: string;
    handleChange: (name: string) => void;
}

function useNameField({
    register,
    defaultValue,
    handleChange,
}: NameFieldProps) {
    const handleChangeDebounced = useDebounce(handleChange, 3000);
    const nameField = useMemo(() => register("name"), [register]);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            nameField.onChange(e);
            handleChangeDebounced(e.target.value);
        },
        [nameField, handleChangeDebounced]
    );

    return {
        name: nameField.name,
        onBlur: nameField.onBlur,
        onChange: onChange,
        getRef: nameField.ref,
        type: "text",
        defaultValue,
    };
}

export default useNameField;
