import { expect, test, describe } from "@jest/globals";
import LRUCache from "../src/cache/LRUCache";

describe("LRUCache Tests", () => {
	test("Should return the correct first cache item ", () => {
		const cache = new LRUCache(5);
		cache.set("1", "1");
		expect(cache.getFirstItem()).toBe("1");
	});

	test("Should set value correctly", () => {
		const cache = new LRUCache(4);
		const key = "4567#$";
		const value = "15";
		cache.set(key, value);
		expect(cache.get(key)).toBe(value);
	});

	test("Should remove old unused values if limit has been exceeded", () => {
		const cache = new LRUCache(2);
		cache.set("eur-usd", "1.2");
		cache.set("gbp-usd", "1.4");
		cache.set("gbp-eur", "1.3");
		cache.get("gbp-eur");
		expect(cache.get("eur-usd")).toBe(undefined);
	});
});
