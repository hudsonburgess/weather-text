import { find } from "../util";

const zipRegex = /\d{5}/;

export function getWords(msg: string): string[] {
    return msg.trim().split(/\s+/);
}

export function hasZipCode(msgParts: string[]): boolean {
    return msgParts.some(p => zipRegex.test(p));
}

export function getZipCode(msgParts: string[]): string {
    return find(msgParts, p => zipRegex.test(p));
}
