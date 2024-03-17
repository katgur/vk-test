import { Alert } from "@vkontakte/vkui";

interface ErrorProps {
    error: string;
}

function Error({ error }: ErrorProps) {
    return (
        <Alert
            actions={[
                {
                    title: "Ок",
                    mode: "default",
                },
            ]}
            actionsAlign="left"
            actionsLayout="horizontal"
            header="Произошла ошибка"
            text={error}
            onClose={() => {}}
        />
    );
}

export default Error;
