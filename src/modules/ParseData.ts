import * as DI from './DataImportModule'; 
import { ListViewCommandSetContext } from '@ms/sp-listview-extensibility';

var jsonDataDefinition = [
    { name: "firstname", length: "30", required: "true", type: "string" },
    { name: "lastname", length: "10", required: "true", type: "string" }
]; 

var jsonData = [
     { firstname: "Keith", lastname: "Davis" },
     { firstname: "Alex", lastname: "Molodoi" },
     { firstname: "Bert", lastname: "Terce", foo: "undefined" }
]

export var dataParser: DI.SPJSONDataParser; 

export function loadData(props: any, id: any, context: ListViewCommandSetContext, onComplete: Function ) {
    console.log('loading module....' + id); 
    dataParser = new DI.SPJSONDataParser(props.settings, props.data); 
    if (props.settings != undefined && props.data != undefined) {
        dataParser.import(id, context, onComplete);
    }
}

export function importMissingListItemFields(fields: any, id: any, context: ListViewCommandSetContext, onComplete: Function) { 
    console.log('adding missing fields...'); 
    dataParser.addMissingFields(id, fields, context, onComplete); 
}

