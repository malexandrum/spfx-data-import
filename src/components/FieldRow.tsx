import * as React from 'react';
import { SPFieldDefinition } from '../modules/DataImportModule';

export class FieldRow extends React.Component<SPFieldDefinition, any> {
    constructor(props: SPFieldDefinition) {
        super(props);
    }
    render() {
        return (
            <tr>                
                <td>{this.props.Title}</td>
                <td>{this.props.Length}</td>
                <td>{this.props.TypeAsString}</td>
                <td>{this.props.Required}</td>                
            </tr>
        );
    }
}

// export interface IFieldRowProps {
//     internalName: string,
//     fieldTypeAsString: string,
//     required: boolean,

// }