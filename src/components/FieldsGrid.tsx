import * as React from 'react';
import { FieldRow } from './FieldRow';
import { SPFieldDefinitionCollection } from '../modules/DataImportModule';

class FieldsGrid extends React.Component<IPropsFieldsGrid, any> {
    constructor(props: IPropsFieldsGrid) {
        super(props);
    }
    render() {
        const el = this.props.fields.items.map((field) =>
            <FieldRow ID={field.ID} Title={field.Title} Required={field.Required} TypeAsString={field.TypeAsString} />
        );

        return (
            <table>
                {el}
            </table>
        );
    }
}

export interface IPropsFieldsGrid {
    fields: SPFieldDefinitionCollection;
}