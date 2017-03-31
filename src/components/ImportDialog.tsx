import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as ParseData from '../modules/ParseData'

export class ImportDialog extends React.Component<IImportDialogProps, any> {

  constructor(props: IImportDialogProps) {
    super(props);
    console.log('props isOpened', this.props.isOpened);
    this.state = {
      isOpened: this.props.isOpened
    };
  }

  public loadData() { 
    this.setState({ isOpened : false }); 
    ParseData.loadData(this.props.listid, this.props.context);
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
          <input type="file" name="listSettings" />
          </div>
          <br />
          <div>List Data<br />
          <input type="file" name="listData" /></div>
          <DialogFooter>
            <Button
              buttonType={ButtonType.primary}
              onClick={() =>  this.loadData() }
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
  listid: string,
  context: any
}
