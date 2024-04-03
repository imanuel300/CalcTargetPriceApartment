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
    MekademKoma=0;
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
        //if (this.RavKomot < 9) { this.isRavKomot = false; }
        this.calcRavKomot();
        this.sumAllMarkivim = (this.mehirLemeter * this.shetachDira + this.mehirLemeter * this.shetachMirpesetOrGina * 30 / 100 + this.mehirLemeter * this.shetachMachsan * 40 / 100 + this.mehirLemeter * this.shetachHanayot * 200 / 100);

        if (this.selectedTypeCalc.code == 1) { this.govaHanacha = ["300000"]; this.hanachaBeshiur = 20; }
        if (this.selectedTypeCalc.code == 2) { this.govaHanacha = ["500000"]; this.hanachaBeshiur = 20; if (this.mekademHatzmada.length < 1) this.mekademHatzmada = ["10.3"]; }
        if (this.selectedTypeCalc.code == 3) { this.hanachaBeshiur = 25; if (this.govaHanacha.length < 1) this.govaHanacha = ["600000"]; }
        this.setToLocalStorage();
    }
    calcRavKomot() {
        if (this.RavKomot >= 9){
            let middelOfBuilding = this.RavKomot/2;
            this.MekademKoma = 0;
            for(let i = 0; i < Math.abs(middelOfBuilding-this.numberKoma); i++) {
                if (Math.abs(this.MekademKoma)!=5) {
                    if ((this.numberKoma-middelOfBuilding) > 0) {
                        this.MekademKoma = this.MekademKoma + 0.5;
                    }
                    if ((this.numberKoma-middelOfBuilding) < 0) {
                        this.MekademKoma = this.MekademKoma - 0.5;
                    }
                }

            }
            console.log(`MekademKoma: ${this.MekademKoma}`);
            console.log(`middelOfBuilding: ${middelOfBuilding}`);
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


//https://primeng.org/inputtext
//ng build --output-path docs --base-href /CalcTargetPriceApartment/
//https://imanuel300.github.io/CalcTargetPriceApartment/

