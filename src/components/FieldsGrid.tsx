import * as React from 'react';
import { FieldRow } from './FieldRow';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
// import { createListItems } from '@uifabric/example-app-base';

import { SPFieldDefinitionCollection } from '../modules/DataImportModule';

export class FieldsGrid extends React.Component<IPropsFieldsGrid, any> {
    constructor(props: IPropsFieldsGrid) {
        super(props);
    }
    render() {
        let el: any;
        if (this.props.fields) {
            el =
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>Length</td>
                                <td>TypeAsString</td>
                                <td>Required</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.fields.items.map((field) =>
                                <FieldRow Required={field.Required} Title={field.Title} TypeAsString={field.TypeAsString} Length={field.Length} key={field["name"]} />
                            )}
                        </tbody>
                    </table>
                </div>
        }
        else {
            el = <div></div>;
        }

        return el;

    }
}

export interface IPropsFieldsGrid {
    fields: SPFieldDefinitionCollection;
}