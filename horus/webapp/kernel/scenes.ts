import { ParcelInfoResponse } from "dcl/utils";
import { fetchManifestForContent } from "dcl/kernel/scene-atlas/05-sceneManifest-resolution/sagas";
import { HORUS_CONFIG } from "../horus-config/config";

export async function fetchManifest(content: ParcelInfoResponse,
    sceneId: string,
    mappings?: any) {
    return await fetchManifestForContent(content, sceneId, HORUS_CONFIG.CONTENT_SERVER_URL, mappings);
}