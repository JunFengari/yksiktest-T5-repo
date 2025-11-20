import { describe, expect, it } from 'vitest';
/*importing vitest library functions*/
import { ravintola } from '../ravintola.js';
/* ravintola is an object/instance made by the constructor Ravintola (like a class) */

/* ---------------------------- Tehtävä 1.1 ------------------------------ */
describe('testing laskeLasku', () => {
    /*describe makes/defines a group of tests*/

    it('should return 6 for pääruoka', () => {
        /* arrange, so taking the information about whether a customer ordered these (they're functions)
   and checking that the result is the price of ONLY the pääruoka, which is 6. So essentially
   we give these 'choices' to test that it gives the right answer*/
        const ottiAlkuruoan = false;
        const ottiJalkiruoan = false;
        const ottiJuoman = false;

        /* act, this is where we perform the actual test, aka calling the 
        function from the original ravintola.js file */
        const result = ravintola.laskeLasku(
            ottiAlkuruoan,
            ottiJalkiruoan,
            ottiJuoman
        );

        /* assert, so that result of that test should be 6 */
        expect(result).toBe(6);
    });

    it('should return 17 for all the extras', () => {
        /* arange the functions and their booleans, or their choices, this time testing 
      that they ordered everything*/
        const ottiAlkuruoan = true;
        const ottiJalkiruoan = true;
        const ottiJuoman = true;

        //act, calling the test from og file's function
        const result = ravintola.laskeLasku(
            ottiAlkuruoan,
            ottiJalkiruoan,
            ottiJuoman
        );

        //assert, checking that the result is indeed 17
        expect(result).toBe(17);
    });

    it('should return 9 for pääruoka + juoma', () => {
        const ottiAlkuruoan = false;
        const ottiJalkiruoan = false;
        const ottiJuoman = true;

        const result = ravintola.laskeLasku(
            ottiAlkuruoan,
            ottiJalkiruoan,
            ottiJuoman
        );
        expect(result).toBe(9);
    });
});
// use "npm run test"

/* ------------------------ Tehtävä 1.2 -----------------------------*/

describe('Testing palautaTaulukonSatunnainenArvo', () => {
    it('should return a value from chosen array', () => {
        const array = ravintola.jalkiruoat;
        // Arrange: valitaan yksi taulukko

        const result = ravintola.palautaTaulukonSatunnainenArvo(array);
        // Act: laitetaan just luotu array funktioon

        expect(array.includes(result)).toBe(true);
        // Assert: katsotaan että resultin sisältämä testi palauttaa true
    });
});

/* --------------------------- Tehtävä 1.3 ------------------------ */
describe('Testing syoRavintolassa ', () => {
    it('should give an array when there are enough places', () => {
        const ltmaxAsiakkaat = 5;
        //Arrange: testing with a value less than the maximum customers allowed

        const result = ravintola.syoRavintolassa(ltmaxAsiakkaat);
        // Act, so giving the asiakasmäärä to the function syoRavintolassa

        expect(Array.isArray(result)).toBe(true);
        // Assert, expecting the result to be an array (true)
    });
});
