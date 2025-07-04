import { expect } from "jsr:@std/expect";
import { serialiseDate } from "../_shared/utils.ts";

Deno.test("output of serialiseDate() follows ISO string format", () => {
	const date = new Date();
	const dateSerialised = serialiseDate(date);

	console.log("Date serialised:", dateSerialised);

	// 1. Hyphens in the date section
	expect(dateSerialised[4]).toBe("-");
	expect(dateSerialised[7]).toBe("-");

	// 2. "T" delimiter
	expect(dateSerialised[10]).toBe("T");

	// 3. Colons in the time section
	expect(dateSerialised[13]).toBe(":");
	expect(dateSerialised[16]).toBe(":");

	// 4. "Z" at the end
	expect(dateSerialised[dateSerialised.length - 1]).toBe("Z");
});
