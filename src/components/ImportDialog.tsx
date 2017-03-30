import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';


export class ImportDialog extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      isOpened: true
    };
  }
  
  public render() {
    
    // let isOpened = true;
    
    return (
      <div className='dialogWrapper'>
        
          <Dialog
            title='Import Options'
            type={ DialogType.close }
            isOpen={ this.state.isOpened }
            isBlocking={true}
            onDismiss={ () => this.setState({isOpened: false })}
          >
          Map import data
          <DialogFooter>
            <Button 
              buttonType={ ButtonType.primary } 
              onClick={ () => this.setState({isOpened: false }) }
            >Save</Button>
            <Button 
              onClick={ () => this.setState({isOpened: false }) }
            >Cancel</Button>
          </DialogFooter>
          </Dialog>
      </div>
    );
  }
}

