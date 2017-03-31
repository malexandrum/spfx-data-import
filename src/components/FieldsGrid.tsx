import * as React from 'react';
import { FieldRow } from './FieldRow';
import { SPFieldDefinitionCollection } from '../modules/DataImportModule';

export class FieldsGrid extends React.Component<IPropsFieldsGrid, any> {
    constructor(props: IPropsFieldsGrid) {
        super(props);
    }
    render() {
        debugger;
        const el = this.props.fields
            ? this.props.fields.items.map((field) =>
                <FieldRow Required={field.Required} Title={field.Title} TypeAsString={field.TypeAsString} Length={field.Length} />
            )
            : <tr></tr>;

        return (
            <table>
                <thead>
                    <td>Title</td>
                    <td>Length</td>
                    <td>TypeAsString</td>
                    <td>Required</td>
                </thead>
                <tbody>
                    {el}
                </tbody>
            </table>
        );
    }
}

export interface IPropsFieldsGrid {
    fields: SPFieldDefinitionCollection;
}