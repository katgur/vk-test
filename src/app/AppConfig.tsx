import vkBridge, {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import {
    useAdaptivity,
    useAppearance,
    useInsets,
} from "@vkontakte/vk-bridge-react";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import { ReactNode, useEffect } from "react";
import { transformVKBridgeAdaptivity } from "./lib/transformVKBridgeAdaptivity";
import "@vkontakte/vkui/dist/vkui.css";

interface AppConfigProps {
    children: ReactNode;
}

function AppConfig({ children }: AppConfigProps) {
    const vkBridgeAppearance = useAppearance() || undefined;
    const vkBridgeInsets = useInsets() || undefined;
    const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
    const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
        window.location.search
    );

    useEffect(() => {
        vkBridge.send("VKWebAppInit");
    }, []);

    return (
        <ConfigProvider
            appearance={vkBridgeAppearance}
            platform={vk_platform === "desktop_web" ? "vkcom" : undefined}
            isWebView={vkBridge.isWebView()}
            hasCustomPanelHeaderAfter={true}
        >
            <AdaptivityProvider {...adaptivity}>
                <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
                    {children}
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default AppConfig;
