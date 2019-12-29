import { AUTH, getServerConfigurations } from "dcl/config";

const serverConfig = getServerConfigurations();

export const HORUS_CONFIG = {
    AUTH0_DOMAIN: AUTH.AUTH0_DOMAIN,
    CONTENT_SERVER_URL: serverConfig.content,
    ENVIRONMENT: "Production" //TODO: Hardcoded
}