export type CacheEntry<T> = {
    createdAt: number,
    val: T,
} 

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(number: number) {
        this.#interval = number;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        const entry = this.#cache.get(key);
        if (entry === undefined) {
            return undefined;
        }    
        return entry.val as T;
    }

    #reap(): void {
        for (const [key, entry] of this.#cache) {
            if (Date.now() - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalID = setInterval(() => { this.#reap() }, this.#interval);
    }

    stopReapLoop(): void {
        if (this.#reapIntervalID) {
            clearInterval(this.#reapIntervalID);
            this.#reapIntervalID = undefined;
        }
    }
}