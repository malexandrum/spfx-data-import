import * as React from 'react';
import { SPFieldDefinition } from '../modules/DataImportModule';

export class FieldRow extends React.Component<SPFieldDefinition, any> {
    constructor(props: SPFieldDefinition) {
        super(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.ID}</td>
                <td>{this.props.Title}</td>
                <td>{this.props.TypeAsString}</td>                
            </tr>
        );
    }
}

// export interface IFieldRowProps {
//     internalName: string,
//     fieldTypeAsString: string,
//     required: boolean,

// }