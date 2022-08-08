import { createHash } from "crypto";

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true
    } catch (error) {
        return false;
    }
}

export const generateUniqueUrlHash = (url: string): string => {
    return createHash("sha256").update(url).digest("hex").substring(0, 6);
}