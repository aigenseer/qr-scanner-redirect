export default class SettingsStorage {

    private static getPrefixName(): string
    {
        return "qr-scanner-redirect";
    }

    private static getKeyWithPrefix(key: string): string
    {
        return [SettingsStorage.getPrefixName(), key].join(',');
    }

    public static get(key: string): string|null
    {
        return localStorage.getItem(SettingsStorage.getKeyWithPrefix(key));
    }

    public static getValueOrDefault(key: string, defaultValue: any): string|any
    {
        let value = SettingsStorage.get(key);
        return value !== null? value : defaultValue;
    }

    public static set(key: string, value: string): void
    {
        localStorage.setItem(SettingsStorage.getKeyWithPrefix(key), value);
    }

    public static delete(key: string): void
    {
        localStorage.removeItem(SettingsStorage.getKeyWithPrefix(key));
    }

}