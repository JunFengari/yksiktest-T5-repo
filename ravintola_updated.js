/*
TIKO RAVINTOLA
OHJELMAKOODI
*/

const Ravintola = function () {
    this.alkuruoat = ['Tomaattikeitto', 'LeipÃ¤', 'Vihersalaatti', 'Salsa'];
    this.paaruoat = [
        'Kalakeitto',
        'Makaroonilaatikko',
        'Kasvispihvi',
        'Kanasalaatti',
    ];
    this.jalkiruoat = ['HedelmÃ¤salaatti', 'JÃ¤Ã¤telÃ¶', 'Pulla', 'Donitsi'];
    this.juomat = ['Tee', 'Kahvi', 'Maito', 'Mehu'];
    this.alkuruokaHinta = 4;
    this.paaruokaHinta = 6;
    this.jalkiruokaHinta = 4;
    this.juomaHinta = 3;
    this.paikkojenMaara = 15;
    this.paikat; // TÃ¤hÃ¤n muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
    return Math.random() < 0.5;
}

/**
 * Jos 'asiakkaidenMaara' on pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara', luo taulukon 'tilaukset'
 * johon tallennetaan yksittÃ¤isen asiakkaan tilaus. tilaaAteria-funktiolle annetaan satunnaiset boolean arvot
 * argumentteina.
 *
 * Palauttaa pÃ¤Ã¤tteeksi 'tilaukset' taulukon.
 * @param {number} asiakkaidenMaara
 * @return {object} object array
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
    const onTilaa = this.tarkistaPaikkojenMaara(asiakkaidenMaara);
    if (!onTilaa) {
        return;
    }
    const tilaukset = [];

    for (let i = 0; i < asiakkaidenMaara; i++) {
        console.log('-------------------------------------------------------');
        console.log(
            'Tarjoillaan asiakasta numero ' +
                (i + 1) +
                '. MitÃ¤ teille saisi olla?'
        );
        tilaukset.push(
            this.tilaaAteria(
                generoiBoolean(),
                generoiBoolean(),
                generoiBoolean()
            )
        );
        console.log('Asiakkaalle tarjoiltu. HyvÃ¤Ã¤ ruokahalua!');
    }
    console.log('-------------------------------------------------------');
    console.log('Kaikille asiakkaille tarjoiltu!');

    return tilaukset;
};

/**
 * Tarkistaa, ettÃ¤ 'asiakkaidenMaara' on suurempi kuin 0, mutta pienempi tai yhtÃ¤suuri kuin 'paikkojenMaara'.
 *
 * Kirjoittaa konsoliin tulosteen tilanteesta, ja palauttaa onnistumisen boolean arvona.
 *
 * Jos 'asiakkaidenMaara' ei ole numero, heittÃ¤Ã¤ TypeErrorin.
 * @param {number} asiakkaidenMaara
 * @return {boolean} Onnistuminen
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
    if (typeof asiakkaidenMaara !== 'number') {
        throw new TypeError();
    }
    if (asiakkaidenMaara <= 0) {
        console.log(
            'IkÃ¤vÃ¤ kyllÃ¤ emme voi tarjoilla ' +
                asiakkaidenMaara +
                ' asiakkaalle.'
        );
        return false;
    } else if (asiakkaidenMaara <= this.paikkojenMaara) {
        console.log(
            'Tilaa on ' +
                asiakkaidenMaara +
                ' asiakkaalle. Tervetuloa ravintolaamme!'
        );
        return true;
    } else {
        console.log(
            'IkÃ¤vÃ¤ kyllÃ¤ ravintolaamme ei mahdu ' +
                asiakkaidenMaara +
                ' asiakasta.'
        );
        return false;
    }
};

/**
 * Luo Ravintolan paikat-muuttujaan uuden taulukon, jonka koko mÃ¤Ã¤rÃ¤ytyy paikkojenMaara-muuttujan mukaisesti,
 * ja tÃ¤yttÃ¤Ã¤ taulukon boolean arvolla false.
 */
Ravintola.prototype.generoiPaikat = function () {
    this.paikat = new Array(this.paikkojenMaara).fill(false);
};

// MÄ OOON TÄSSSSSSSSSSSÄÄÄÄÄ

/**
 * Funktion tarkoitus on tehdä varauksia.
 * Vaiheet:
 * Tarkistaa ettö paikat muuttujassa on taulukko.
 * Asetetaan 1 arvo varauksenMaaralle, jos sillä ei ole jo arvoa
 *
 * Määritetään että ei voi varata paikkoja jos varauksien määrä ylittää vapaat paikat
 *
 * Palautetaan true jos kaikki onnistui
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara) {
    if (!Array.isArray(this.paikat)) {
        this.generoiPaikat();
    }

    if (typeof varauksenMaara !== 'number') {
        varauksenMaara = 1;
    }

    const vapaatPaikat = this.paikat.filter(
        (paikka) => paikka === false
    ).length;

    if (vapaatPaikat < varauksenMaara) {
        return false;
    }

    let varattuja = 0;
    for (let x = 0; x < this.paikat.length; x++) {
        if (this.paikat[x] === false) {
            this.paikat[x] = true;
            varattuja++;
        }
        if (varattuja === varauksenMaara) {
            break;
        }
    }

    return true;
};

/**
 * Ottaa parametreina 3 boolean arvoa, joiden avulla mÃ¤Ã¤ritellÃ¤Ã¤n mitÃ¤ ruokia asiakas tilaa.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heitetÃ¤Ã¤n TypeError.
 *
 * Tilaukset tallennetaan 'ruoat' taulukkoon boolean parametrien mukaisesti.
 *
 * Lopuksi kutsutaan 'laskeLasku' funktiota, jolla lasketaan tilauksen lasku.
 *
 * Palauttaa objektin, joka sisÃ¤ltÃ¤Ã¤ numeron ja string-taulukon
 *
 * @param {boolean} ottaaAlkuruoan
 * @param {boolean} ottaaJalkiruoan
 * @param {boolean} ottaaJuoman
 * @return {object} object - number, string[]
 */
Ravintola.prototype.tilaaAteria = function (
    ottaaAlkuruoan,
    ottaaJalkiruoan,
    ottaaJuoman
) {
    if (
        typeof ottaaAlkuruoan !== 'boolean' ||
        typeof ottaaJalkiruoan !== 'boolean' ||
        typeof ottaaJuoman !== 'boolean'
    ) {
        throw new TypeError();
    }

    const ruoat = [];
    let ruoka;

    if (ottaaAlkuruoan) {
        ruoka = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
        console.log('Ottaisin alkuruoaksi: ' + ruoka);
        ruoat.push(ruoka);
    }

    ruoka = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
    console.log('Ottaisin pÃ¤Ã¤ruoaksi: ' + ruoka);
    ruoat.push(ruoka);

    if (ottaaJalkiruoan) {
        ruoka = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
        console.log('Ottaisin jÃ¤lkiruoaksi: ' + ruoka);
        ruoat.push(ruoka);
    }

    if (ottaaJuoman) {
        ruoka = this.palautaTaulukonSatunnainenArvo(this.juomat);
        console.log('Ottaisin juomaksi: ' + ruoka);
        ruoat.push(ruoka);
    }

    const summa = this.laskeLasku(ottaaAlkuruoan, ottaaJalkiruoan, ottaaJuoman);

    return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 * @param {string[]} taulukko
 * @return {string}
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
    return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee summan annettujen boolean parametrien mukaisesti.
 * Jos parametrit eivÃ¤t ole tyyppiÃ¤ boolean, heittÃ¤Ã¤ TypeErrorin.
 *
 * 'loppuSumma' muuttujaan lisÃ¤tÃ¤Ã¤n automaattisesti 'paaruokaHinta', ja loput hinnat sitten parametrien mukaisesti.
 *
 * Palauttaa lopussa 'loppuSumma'.
 *
 * @param {boolean} ottiAlkuruoan
 * @param {boolean} ottiJalkiruoan
 * @param {boolean} ottiJuoman
 * @return {number}
 */
Ravintola.prototype.laskeLasku = function (
    ottiAlkuruoan,
    ottiJalkiruoan,
    ottiJuoman
) {
    if (
        typeof ottiAlkuruoan !== 'boolean' ||
        typeof ottiJalkiruoan !== 'boolean' ||
        typeof ottiJuoman !== 'boolean'
    ) {
        throw new TypeError();
    }

    let loppuSumma = 0;

    loppuSumma += this.paaruokaHinta;

    if (ottiAlkuruoan) {
        loppuSumma += this.alkuruokaHinta;
    }

    if (ottiJalkiruoan) {
        loppuSumma += this.jalkiruokaHinta;
    }

    if (ottiJuoman) {
        loppuSumma += this.juomaHinta;
    }

    return loppuSumma;
};

const ravintola = new Ravintola();

export { ravintola };
