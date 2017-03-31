import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';


export class ImportDialog extends React.Component<IImportDialogProps, any> {

  constructor(props: IImportDialogProps) {
    super(props);
    console.log('props isOpened', this.props.isOpened);
    this.state = {
      isOpened: this.props.isOpened
    };
  }

  public render() {

    return (
      <div className='dialogWrapper'>

        <Dialog
          title='Import Options'
          type={DialogType.close}
          isOpen={this.state.isOpened}
          isBlocking={true}
          onDismiss={() => this.setState({ isOpened: false })}
        >
          <div>List Settings<br />
            <input type="file" name="listSettings" onChange={(e) => this._handleSettings(e)} />
          </div>
          <br />
          <div>List Data<br />
            <input type="file" name="listData" onChange={(e) => this._handleData(e)}/></div>
          <br />
          <br />
          <div><label>Read List Settings:</label>{this.state.listSettings}</div>
          <br />
          <br />
          <div><label>Read List Data:</label>{this.state.listData}</div>
          <DialogFooter>
            <Button
              buttonType={ButtonType.primary}
              onClick={() => this.setState({ isOpened: false })}
            >Save</Button>
            <Button
              onClick={() => this.setState({ isOpened: false })}
            >Cancel</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  componentWillReceiveProps() {
    this.setState({
      isOpened: true
    })
  }

  private _handleSettings(event: any) {

    if (event.target.files.length == 0) { return }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      this.setState({
        listSettings: e.target["result"]
      })
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
      })
    };
    reader.readAsText(file);
  }

}


export interface IImportDialogProps {
  isOpened: boolean,
  listSettings?: any,
  listData?: any
}
