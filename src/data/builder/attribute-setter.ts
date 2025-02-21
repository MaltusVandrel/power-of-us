
import { Attribute } from "../../model/attribute";
import { Figure } from "../../model/figure";
import { ATTRIBUTE_KEYS, ATTRIBUTE_TITLES } from "../bank/attribute";

let ATTRIBUTES:Attribute[] = [];

export function setAttributes(being:Figure){
    for(let key of Object.keys(ATTRIBUTE_KEYS)){
        let attr=new Attribute();
        attr.title={...ATTRIBUTE_TITLES}[key]||'';
        attr.key=key||'';
        being.attributes.push(attr);
    }
}
