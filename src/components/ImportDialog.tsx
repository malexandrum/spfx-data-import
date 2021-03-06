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
  SpinnerSize,
} from 'office-ui-fabric-react/lib//Spinner';
import { Layer } from 'office-ui-fabric-react/lib/Layer';


export class ImportDialog extends React.Component<IImportDialogProps, any> {

  constructor(props: IImportDialogProps) {
    super(props);
    console.log('props isOpened', this.props.isOpened);
    this.state = {
      isOpened: this.props.isOpened
    };
  }

  public loadData() {
    ParseData.loadData({ settings: this.state.listSettings, data: this.state.listData }, this.props.listid, this.props.context, (missing) => {
      this.setState({ missing: missing });
    });
  }

  public importMissingDataFields() {

    var listid = this.props.listid;
    var missingfields = this.state.missing;

    var context = this.props.context;

    this.setState({ busy: true });

    ParseData.importMissingListItemFields(listid, missingfields, context, (success) => {

      ParseData.showListItemsInDefaultView(listid, missingfields, context, (success) => {

        ParseData.importData(listid, context, (records) => {
          this.setState({ busy: false, recordsImported: records });
        });
      });
    });

  }

  public render() {

    return (
      <div className='dialogWrapper'>

        <Dialog
          title='Import Options'
          type={DialogType.largeHeader}
          isOpen={this.state.isOpened}
          isBlocking={true}
          onDismiss={() => this.setState({ isOpened: false })}
        >
          <div>List Settings File<br />
            <input type="file" name="listSettings" onChange={(e) => this._handleSettings(e)} />
          </div>
          <br />
          <div>List Data File<br />
            <input type="file" name="listData" onChange={(e) => this._handleData(e)} /></div>
          <br />
          <br />
          {/*<div><label>Read List Settings:</label>{this.state.listSettings}</div>
          <br />
          <br />
          <div><label>Read List Data:</label>{this.state.listData}</div>
          <br />*/}

          <FieldsGrid fields={this.state.missing} />
          
          <br />

          {this.state.busy ? <Spinner size={SpinnerSize.large} /> : ""}
          {this.state.recordsImported > 0 ? <div>
            <b>Successfully imported {this.state.recordsImported} records!</b></div> : ""}

          <DialogFooter>
            <Button disabled={!(this.state.listSettings && this.state.listData)}
              buttonType={ButtonType.primary}
              onClick={() => this.importMissingDataFields()}
            >Import</Button>
            <Button
              onClick={() => {
                this.setState({ isOpened: false });
                window.location.reload(true);
              }}
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

  // componentWillUpdate() {
  //   !this.state.missing && this.loadData();
  // }

  private _handleSettings(event: any) {

    if (event.target.files.length == 0) { return }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      this.setState({
        listSettings: e.target["result"]
      });
      this.loadData();
      console.log('Settings loaded', new Date());
    };
    reader.readAsText(file);

  }

  private _handleData(event: any) {
    if (event.target.files.length == 0) { return }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      this.setState({
        listData: e.target["result"]
      });
      this.loadData();
      console.log('Data loaded', new Date());
    };
    reader.readAsText(file);
  }

}


export interface IImportDialogProps {
  isOpened: boolean,
  listid: string,
  context: any
  listSettings?: any,
  listData?: any,
  missing?: SPFieldDefinitionCollection,
  busy?: boolean,
  recordsImported?: number  
}
