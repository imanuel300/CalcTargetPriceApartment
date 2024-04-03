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
    RavKomot = 8;
    numberKoma = 10;
    numberHadarim = 4.5;
    isDuplex = false;
    shetachDira = 105;
    shetachMirpesetOrGina = 14;
    shetachMachsan = 8;
    shetachHanayot = 2;
    mekademHatzmada: string[] = [];
    govaHanacha: string[] = [];
    sumAllMarkivim;
    hanachaBeshiur=20;
    //maam = 1.17;

    ngOnInit() {
        this.TypesCalc = [
            { name: 'הנחה 20% או מירבית 300,000', code: 1 },
            { name: 'הנחה 20% או מקדם 3.4% או 10.3% מגבלה 500,000 ', code: 2 },
            { name: 'הנחה 25% או שומה עדכנית מגבלה 500,000 או 600,000', code: 3 }
        ];
       // this.selectedTypeCalc = this.TypesCalc[0];
    }
    onChange(event) {
        console.log(event,event.value);
        this.sumAllMarkivim = (this.mehirLemeter*this.shetachDira+this.mehirLemeter*this.shetachMirpesetOrGina*30/100+this.mehirLemeter*this.shetachMachsan*40/100+this.mehirLemeter*this.shetachHanayot*200/100);
     
        if (this.selectedTypeCalc.code==1) {this.govaHanacha = ["300000"]; this.hanachaBeshiur = 20;}
        if (this.selectedTypeCalc.code==2) {this.govaHanacha = ["500000"]; this.hanachaBeshiur = 20; this.mekademHatzmada =["10.3"];}
        if (this.selectedTypeCalc.code==3) {this.govaHanacha = ["600000"]; this.hanachaBeshiur = 25;}
    }
}
//ng build --output-path docs --base-href /CalcTargetPriceApartment/

