import * as DI from './DataImportModule'; 

var jsonDataDefinition = [
    { name: "firstname", length: "30", required: "true", type: "string" },
    { name: "lastname", length: "10", required: "true", type: "string" }
]; 

var jsonData = [
     { firstname: "Keith", lastname: "Davis" },
     { firstname: "Alex", lastname: "Molodoi" },
     { firstname: "Bert", lastname: "Terce", foo: "undefined" }
]

export function loadData(id: any) {
    var dataParser: DI.SPJSONDataParser = new DI.SPJSONDataParser(jsonDataDefinition, jsonData); 
    dataParser.import('Regions');
}

