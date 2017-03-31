import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; 

export class SPFieldDefinition
{
    name: string; 
    length: number = -1; 
    required: boolean = false; 
    type: string; 

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values); 
    }
}

export class SPFieldDefinitionCollection 
{
    constructor(private propperties: Array<SPFieldDefinition> = []) {
    }

    add(field: SPFieldDefinition) { 
        this.propperties.push(field); 
    }

    get items(): Array<SPFieldDefinition> {
        return this.propperties; 
    }
}

export class SPFieldEntry 
{
    constructor(values: Object = {}) {
        (<any>Object).assign(this, values); 
    }
}

export class SPFieldEntryCollection 
{
    constructor(private entries: Array<SPFieldEntry> = []) {
    }

    add(entry: SPFieldEntry) {
        this.entries.push(entry); 
    }

    get items(): Array<SPFieldEntry> {
        return this.entries; 
    }
}

export class SPImportResult 
{
    result: boolean; 
    errormessage: string; 
}

export class SPJSONDataParser 
{
    private _jsondataDefinition: Object; 
    private _jsondata: Object; 

    private fieldDefinitions: SPFieldDefinitionCollection = new SPFieldDefinitionCollection();
    private entries: SPFieldEntryCollection = new SPFieldEntryCollection(); 

    constructor(jsondatadefinition: Object = {}, jsondata: Object = {}) {
        this._jsondataDefinition = jsondatadefinition; 
        this._jsondata = jsondata; 
        this.load(); 
    }

    private load(): void { 
        for (var obj in this._jsondataDefinition) {
            if (this._jsondataDefinition.hasOwnProperty(obj)) {
                this.fieldDefinitions.add(new SPFieldDefinition(this._jsondataDefinition[obj])); 
            }
        }

        for (var obj in this._jsondata) {
            if (this._jsondata.hasOwnProperty(obj)) {
                this.entries.add(new SPFieldEntry(this._jsondata[obj])); 
            }
        }
        console.log(this.fieldDefinitions.items); 
        console.log(this.entries.items);
    }

    import(list: string) {
        console.log("Importing data..."); 
    }

    
}

 

