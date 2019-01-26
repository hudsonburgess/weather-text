import { getWords, hasZipCode, getZipCode } from "./messages";

describe('message functions', () => {

    describe('getWords', () => {

        it(`breaks the message into an array of words`, () => {
            const words = getWords(' forecast  20148');
            expect(words).toEqual(['forecast', '20148']);
        });

    });

    describe('hasZipCode', () => {

        it(`returns true if the list has a 5-digit ZIP code`, () => {
            const msgParts = ['forecast', '20148'];
            expect(hasZipCode(msgParts)).toBe(true);
        });

        it(`returns false if the list doesn't contain a 5-digit ZIP code`, () => {
            const msgParts = ['forecast', 'home'];
            expect(hasZipCode(msgParts)).toBe(false);
        });

    });

    describe('getZipCode', () => {

        it(`gets the ZIP code from the list`, () => {
            const msgParts = ['current', '20148'];
            expect(getZipCode(msgParts)).toEqual('20148');
        });

        it(`returns undefined if the message doesn't contain a ZIP code`, () => {
            const msgParts = ['hello', 'world'];
            expect(getZipCode(msgParts)).toBeUndefined();
        });

    });

});
