class LRUCache {
	cache: Map<string, string>;
	limit: number;

	constructor(limit: number) {
		this.cache = new Map();
		this.limit = limit;
	}

	get(key: string): string {
		const item = this.cache.get(key);
		if (item) {
			this.cache.delete(key);
			this.cache.set(key, item);
		}
		return item;
	}

	set(key: string, val: string): void {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		} else if (this.cache.size === this.limit) {
			this.cache.delete(this.getFirstItem());
		}
		this.cache.set(key, val);
	}

	getFirstItem(): string {
		return this.cache.keys().next().value;
	}
}

export default LRUCache;
