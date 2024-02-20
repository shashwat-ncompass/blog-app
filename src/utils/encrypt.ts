import { Md5 } from "ts-md5"

export function encrypt(content: string): string {
    const hashedContent = Md5.hashStr(content)
    return hashedContent
}