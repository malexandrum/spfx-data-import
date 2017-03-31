import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as ParseData from '../modules/ParseData'
import { SPFieldDefinitionCollection } from '../modules/DataImportModule';
import { FieldsGrid, IPropsFieldsGrid } from './FieldsGrid';
import {
  Spinner,
  SpinnerType,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration, ISPHttpClientOptions } from '@microsoft/sp-http';
import { ListViewCommandSetContext } from '@ms/sp-listview-extensibility';



export class RandomDialog extends React.Component<IRandomDialogProps, any> {

  constructor(props: IRandomDialogProps) {
    super(props);
    console.log('props on Random isOpened', this.props.isOpened);
    this.state = {
      isOpened: this.props.isOpened,
      busy: false
    };
    this._getCurrentFields(this._importRandomData);
    console.log('Fields loaded');
  }

  // public loadData() {
  //   ParseData.loadData({ settings: this.state.listSettings, data: this.state.listData }, this.props.listid, this.props.context, (missing) => {
  //     debugger;
  //     this.setState({ missing: missing });
  //   });
  // }

  private _importRandomData() {
    debugger;
  }

  private _getCurrentFields(callback: Function): void {
    this.setState({ busy: true });
    const ctx: ListViewCommandSetContext = this.props.context;
    const siteUrl = this.props.context.pageContext.site.absoluteUrl;
    const listId = this.props.context.pageContext.list.id.toString();
    const fieldsUrl = siteUrl + `/_api/lists(guid'${listId}')/` + "fields?$filter=Hidden eq false and ReadOnlyField eq false and FieldTypeKind eq 2&$select=Id,InternalName";
    const opts: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': ''
      }
    };
    //     const config: SPHttpClientConfiguration = {
    // flags: 
    //     };
    const config: any = SPHttpClient.configurations.v1;


    const p = ctx.spHttpClient.fetch(fieldsUrl, config, opts)
      .then((response) => {
        debugger;
        this.setState({
          fields: response,
          busy: false
        });
        // callback(response);
      });

  }

  public render() {

    return (
      <div className='dialogWrapper'>

        <Dialog
          title='Random Data'
          type={DialogType.largeHeader}
          isOpen={this.state.isOpened}
          isBlocking={true}
          onDismiss={() => this.setState({ isOpened: false })}
        >

          <br />
          {/*<div><label>Read List Settings:</label>{this.state.listSettings}</div>
          <br />
          <br />
          <div><label>Read List Data:</label>{this.state.listData}</div>
          <br />*/}

          <TextField label='Number of rows to generate' placeholder='# of rows' ariaLabel='Please' onChanged={(e) => this._onNoRowsChanged(e)} />


          {this.state.fields ? <Label>Fields to be populated with random data</Label> : ""}
          <FieldsGrid fields={this.state.missing} />

          <DialogFooter>

            {this.state.busy ? <Spinner size={SpinnerSize.medium} /> : ""}

            <Button
              disabled={!(this.state.fields && this.state.noRowsToGenerate > 0)}
              buttonType={ButtonType.primary}
              onClick={() => this._importRandomData()}
            >Import Random Data</Button>
            <Button
              onClick={() => this.setState({ isOpened: false })}
            >Cancel</Button>
            {/*<Spinner type={SpinnerType.large} />*/}
          </DialogFooter>
        </Dialog>
      </div >
    );
  }

  componentWillReceiveProps() {
    this.setState({
      isOpened: true
    })
  }

  @autobind
  private _onNoRowsChanged(text: string) {
    this.setState({
      noRowsToGenerate: parseInt(text)
    })
  }

}


export interface IRandomDialogProps {
  isOpened: boolean,
  listid: string,
  context: ListViewCommandSetContext,
  busy?: boolean
}
