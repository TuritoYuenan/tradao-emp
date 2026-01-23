import { describe, it, expect } from 'vitest';
import { participantName } from "./validation";

describe('event registration schema test', () => {
	it('accepts Latin-based name for participant name', () => {
		const nameVietnamese = 'Nguyễn Khánh Phúc Thịnh';
		expect(participantName.isValidSync(nameVietnamese)).toBe(true);

		const nameEnglish = 'John Doe';
		expect(participantName.isValidSync(nameEnglish)).toBe(true);

		const nameFrench = 'Élise Dupont';
		expect(participantName.isValidSync(nameFrench)).toBe(true);

		const nameSpanish = 'María-José Carreño Quiñones';
		expect(participantName.isValidSync(nameSpanish)).toBe(true);

		const nameGerman = 'Jürgen Müller';
		expect(participantName.isValidSync(nameGerman)).toBe(true);
	});

	it('rejects names with invalid characters for participant name', () => {
		const nameWithNumbers = 'John Doe123';
		expect(participantName.isValidSync(nameWithNumbers)).toBe(false);

		const nameWithSpecialChars = 'Jane @Doe!';
		expect(participantName.isValidSync(nameWithSpecialChars)).toBe(false);

		const nameWithEmojis = 'Alice 😊';
		expect(participantName.isValidSync(nameWithEmojis)).toBe(false);
	});
});
