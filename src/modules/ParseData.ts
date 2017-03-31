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

export function loadData(id: any, context: ListViewCommandSetContext, onComplete: Function ) {
    console.log('loading module....' + id); 
    var dataParser: DI.SPJSONDataParser = new DI.SPJSONDataParser(jsonDataDefinition, jsonData); 
    dataParser.import(id, context, onComplete);
}

