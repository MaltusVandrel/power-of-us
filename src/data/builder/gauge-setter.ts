import { Gauge } from "../../model/gauge";
import { Figure } from "../../model/figure";
import { GAUGE_KEYS, GAUGE_TITLES } from "../bank/gauge";

let GAUGES:Gauge[] = [];

export function setGauges(being:Figure){
    for(let key of Object.keys(GAUGE_KEYS)){
        let gauge=new Gauge();
        gauge.title={...GAUGE_TITLES}[key]||'';
        gauge.key=key||'';
        being.gauges.push(gauge);
    }
}
