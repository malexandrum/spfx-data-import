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

    // let isOpened = true;

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
            <input type="file" name="listSettings" onChange={this._handleSettings} />
          </div>
          <br />
          <div>List Data<br />
            <input type="file" name="listData" /></div>
          <br />
          <br />
          <div><label>Read List Settings:</label>{this.state.listSettings}</div>
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
  // componentWillUpdate() {
  //   this.setState({
  //     isOpened: this.props.isOpened
  //   });
  // }
  componentWillReceiveProps() {
    this.setState({
      isOpened: true
    })
  }

  private _handleSettings(event: any) {
    console.log('files: ', event.target.files)
    if (event.target.files.length == 0) { return }

    const file = event.target.files[0];
    const reader = new FileReader();
    debugger;
    const self = this;
    reader.onload = (e: Event) => {
      self.setState({
        listSettings: e.target["result"]
      })
    };
    reader.readAsText(file);

  }
  // shouldComponentUpdate() {
  //   alert('should component update');
  //   return true;
  // }
  // componentWillUpdate() {
  //   alert('will update');
  // }
  // private _destroy() {
  //   React.unmountComponentAtNode(document.getElementById('container'))
  // }
}


export interface IImportDialogProps {
  isOpened: boolean,
  listSettings?: string
}
