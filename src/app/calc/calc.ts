import { Component, OnInit } from '@angular/core';

interface TypesCalc {
    name: string,
    code: number
}

@Component({
    selector: 'Calc',
    templateUrl: './calc.html'
})
export class Calc implements OnInit {
    TypesCalc!: TypesCalc[];
    selectedTypeCalc: TypesCalc = { name: '', code: 0 };
    mehirLemeter = 3000;
    isRavKomot = true;
    RavKomot = 9;
    numberKoma = 10;
    numberHadarim = 4.5;
    isDuplex = false;
    shetachDira = 105;
    shetachMirpesetOrGina = 14;
    shetachMachsan = 8;
    shetachHanayot = 2;
    mekademHatzmada: string[] = [];
    govaHanacha: string[] = [];
    sumAllMarkivim: number;
    hanachaBeshiur = 20;
    MekademKoma = 0;
    error = false;
    harigaShetachDira = 0;
    lookupMisparHadarimShetach = [
        { hadarim: 2.5, shetach: 76 },
        { hadarim: 3, shetach: 90 },
        { hadarim: 3.5, shetach: 100 },
        { hadarim: 4, shetach: 110 },
        { hadarim: 4.5, shetach: 120 },
        { hadarim: 5, shetach: 125 },
        { hadarim: 5.5, shetach: 135 },
        { hadarim: 6, shetach: 145 }];
    shetachDiraPerHadarim = 0;
    //maam = 1.17;

    ngOnInit() {
        this.TypesCalc = [
            { name: 'הנחה 20% או מירבית 300,000', code: 1 },
            { name: 'הנחה 20% או מקדם 3.4% או 10.3% מגבלה 500,000 ', code: 2 },
            { name: 'הנחה 25% או שומה עדכנית מגבלה 500,000 או 600,000', code: 3 }
        ];

        let calc = JSON.parse(localStorage.getItem('Calc'));
        if (calc) {
            console.log(calc);
            // run on calc object get key val and set to this key the value
            for (const key in calc) {
                if (Object.hasOwnProperty.call(calc, key)) {
                    const element = calc[key];
                    this[key] = element;
                }
            }
            this.selectedTypeCalc = this.TypesCalc[this.selectedTypeCalc.code - 1];
        }
    }
    onChange(event) {
        console.log(event, event.value);
        this.error = false;
        if (this.RavKomot < this.numberKoma) this.error = true;
        if (this.RavKomot < 9) this.error = true; //this.isRavKomot = false; 

        if (!this.isRavKomot) {
            this.numberKoma = 0;
            this.RavKomot = 0;
            this.MekademKoma = 0;
        } else
            this.RavKomot = 9;

        

        this.numberHadarim = Math.round(this.numberHadarim * 2) / 2;//step half

        this.lookupMisparHadarimShetach.forEach(item => {//חישוב מטר בנייה עיקרי ושולי
            if (this.numberHadarim == item.hadarim) {
                this.shetachDiraPerHadarim = item.shetach;
                if (this.shetachDira > item.shetach) {
                    this.harigaShetachDira = this.shetachDira - item.shetach;
                    if (this.isDuplex && this.numberHadarim > 4.5 && this.harigaShetachDira > 10) {
                        this.harigaShetachDira = 10;
                        this.shetachDira = this.shetachDiraPerHadarim + 10;
                    }
                } else {
                    this.harigaShetachDira = 0;
                }
            }
        });
        if (!this.isDuplex) { 
            this.harigaShetachDira = 0;
        }


        let newMehirShetachMirpesetOrGina = 0;
        if (this.shetachMirpesetOrGina <= 30) newMehirShetachMirpesetOrGina = this.shetachMirpesetOrGina * 30 / 100;
        if (this.shetachMirpesetOrGina > 30 && this.shetachMirpesetOrGina <= 60) newMehirShetachMirpesetOrGina = 30 * 30 / 100 + (this.shetachMirpesetOrGina - 30) * 20 / 100;
        if (this.shetachMirpesetOrGina > 60 && this.shetachMirpesetOrGina <= 120) newMehirShetachMirpesetOrGina = 30 * 30 / 100 + 30 * 20 / 100 + (this.shetachMirpesetOrGina - 60) * 10 / 100;
        if (this.shetachMirpesetOrGina > 120) newMehirShetachMirpesetOrGina = 30 * (30 + 20 + 10) / 100;

        this.calcRavKomot();
        let newMehirLemeter = this.mehirLemeter + (this.mehirLemeter * (this.MekademKoma / 100));// מחיר מטר לאחר חישוב מקדם קומה
        this.sumAllMarkivim = (newMehirLemeter * (this.shetachDira - this.harigaShetachDira) + newMehirLemeter * (this.harigaShetachDira) * 0.85 + newMehirLemeter * newMehirShetachMirpesetOrGina + newMehirLemeter * this.shetachMachsan * 40 / 100 + newMehirLemeter * this.shetachHanayot * 200 / 100);

        if (this.selectedTypeCalc.code == 1) { this.govaHanacha = ["300000"]; this.hanachaBeshiur = 20; }
        if (this.selectedTypeCalc.code == 2) { this.govaHanacha = ["500000"]; this.hanachaBeshiur = 20; if (this.mekademHatzmada.length < 1) this.mekademHatzmada = ["10.3"]; }
        if (this.selectedTypeCalc.code == 3) { this.hanachaBeshiur = 25; if (this.govaHanacha.length < 1) this.govaHanacha = ["600000"]; }
        this.setToLocalStorage();
    }
    calcRavKomot() {
        if (this.RavKomot >= 9 && this.RavKomot >= this.numberKoma) {
            let middelOfBuilding = (this.RavKomot + 1) / 2;
            this.MekademKoma = 0;
            for (let i = 0; i < Math.floor(Math.abs(middelOfBuilding - this.numberKoma)); i++) {
                if (Math.abs(this.MekademKoma) != 5) {
                    if ((this.numberKoma - middelOfBuilding) >= 1) {
                        this.MekademKoma = this.MekademKoma + 0.5;
                    }
                    if ((this.numberKoma - middelOfBuilding) < 1) {
                        this.MekademKoma = this.MekademKoma - 0.5;
                    }
                }
                //console.log(i,this.numberKoma-middelOfBuilding);
            }
            // console.log(`MekademKoma: ${this.MekademKoma}`);
            // console.log(`middelOfBuilding: ${middelOfBuilding}`);
        }
    }



    setToLocalStorage() {
        console.log(JSON.stringify(this));
        localStorage.setItem('Calc', JSON.stringify(this));
    }
    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem('Calc'));
    }
    clearLoca() {
        localStorage.removeItem('Calc');
        //do refreach page
        window.location.reload();
    }
}
//
//https://primeng.org/inputtext
//ng build --output-path docs --base-href /CalcTargetPriceApartment/
//https://imanuel300.github.io/CalcTargetPriceApartment/

