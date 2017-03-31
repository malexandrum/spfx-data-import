import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http'; 
import { ListViewCommandSetContext } from '@ms/sp-listview-extensibility';

export class SPFieldDefinition
{
    ID?: any; 
    Title: string; 
    Required: boolean = false;
    TypeAsString: string;
    Length?: number; 

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

    import(id: string, context: ListViewCommandSetContext, onComplete: Function ) {
        console.log("Importing data for id " + id); 
        for ( var idx in this._jsondataDefinition) {
            
            var siteURL = context.pageContext.site.absoluteUrl; 

            // grab the list's items 
            console.log(`${siteURL}/_api/web/lists(guid'${id}')/fields`);
            context.spHttpClient.get(`${siteURL}/_api/web/lists(guid'${id}')/fields?$select=Id,Title,Required,TypeAsString,MaxLength`,
            (<any>SPHttpClient.configurations.v1), {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': ''
                }
            }).then((value) => {
                value.json().then((value) => {
                    var items:any = value.value; 
                    
                    var fields: SPFieldDefinitionCollection = new SPFieldDefinitionCollection(); 
                    for ( var idx in items ) {
                        fields.add(new SPFieldDefinition({
                            Id: items[idx]["Id"],
                            Title : items[idx]["Title"],
                            Required: items[idx]["Required"],
                            TypeAsString: items[idx]["TypeAsString"],
                            Length: items[idx]["Length"]
                        })); 
                    }

                    // return the fields that are missing 
                    var titles = fields.items.map((a) => { return a.Title; }); 
                    var missing = this.fieldDefinitions.items.filter(n => titles.indexOf(n.Title) < 0); 
                    onComplete(missing); 
                }); 
            }); 
        }
    }
}

 

