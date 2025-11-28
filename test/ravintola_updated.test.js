import { describe, expect, it } from 'vitest';
/*importing vitest library functions*/
import { ravintola_updated } from '../ravintola_updated.js';

//testitapaus 1
describe('Testing if we can eat at the restaurant', () => {
    it('should let us eat if not full', () => {
        // Arrange: määritetään asiakkasmäärän
        const asiakkaita = 7;
        // Act: kutsutaan syöravintolassa
        const result = ravintola_updated.syoRavintolassa(asiakkaita);
        // Assert: tarkistetaan että tulos on oikeanpituinen taulukko
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(asiakkaita);
    });
});

//testitapaus 2
describe('Testing if we can reserve seats', () => {
    it('should let us reserve seats if not full', () => {
        // Arrange & Act, resetoidaan ravintolan ja tehdään varaus 10 henkilölle
        ravintola_updated.generoiPaikat();
        const reserve = ravintola_updated.syoRavintolassa(10);
        // Assert: varaus pitäisi olla olemassa
        expect(reserve).toBeDefined();
    });

    it('should not let us reserve more seats', () => {
        // Assert again: yritetään varata 6 lisä-paikkaa, odotetaan erroria (eikä console logia)
        expect(() => {
            ravintola_updated.syoRavintolassa(6);
        }).toThrowError('Ei tarpeeksi vapaita paikkoja!');
    });
});

//testitapaus 3
describe('Testing that laskeLasku works with new foods', () => {
    it('should calculate food prices correctly', () => {
        // Arrange: luodaan esimerkkitilaus
        const esimtilaus = [
            { ruoka: 'Leipä', hinta: 2 },
            { ruoka: 'Makaroonilaatikko', hinta: 12 },
            { ruoka: 'Jäätee', hinta: 3 },
        ];

        // Act: calling laske lasku function to calculate our order
        const total = ravintola_updated.laskeLasku(esimtilaus);

        //Assert: result should be 17
        expect(total).toBe(17);
    });
});
