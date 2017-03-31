import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  IBaseListViewCommandSetProperties,
  IListViewCommandSetRenderEventParameters,
  IListViewCommandSetExecuteEventParameters,
  
} from '@ms/sp-listview-extensibility';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as strings from 'spFxDataImportStrings';

import * as ParseData from '../../modules/ParseData'; 
import { ImportDialog, IImportDialogProps } from '../../components/ImportDialog';
import { RandomDialog, IRandomDialogProps } from '../../components/RandomDialog';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISpFxDataImportCommandSetProperties extends IBaseListViewCommandSetProperties {
  // This is an example; replace with your own property
  disabledCommandIds: string[];
}

const LOG_SOURCE: string = 'SpFxDataImportCommandSet';

export default class SpFxDataImportCommandSet extends BaseListViewCommandSet {
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized SpFxDataImportCommandSet');
    return super.onInit();
  }

  @override
  public get properties(): ISpFxDataImportCommandSetProperties | undefined {
    return this.getBaseProperties() as ISpFxDataImportCommandSetProperties;
  }

  @override
  public onRender(event: IListViewCommandSetRenderEventParameters): void {
    if (this.properties.disabledCommandIds) {
      if (this.properties.disabledCommandIds.indexOf(event.commandId) >= 0) {
        Log.info(LOG_SOURCE, 'Hiding command ' + event.commandId);
        event.visible = false;
      }
    }



    /* Inject our React Fabric Dialog */
    // console.log('ReactDOM version', ReactDOM.version);

    // ReactDOM.render(
    //   <ImportDialog />,
    //   document.getElementsByClassName('LeftPane-bottomCell')[0]
    // );
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.commandId) {
      case 'COMMAND_IMPORT':
        // alert(`Clicked ${strings.CommandImport}`);
        
       
        let id = this.context.pageContext.list.id.toString(); 
        /** Render Import Dialog */
        let placeHolder: Element = document.querySelector(".os-Files-extensionPlaceHolder");
        let element: React.ReactElement<IImportDialogProps> = React.createElement(ImportDialog, { isOpened: true, listid: id, context: this.context }, null);
        ReactDOM.render(element, placeHolder);        
        break;
      case 'COMMAND_RANDOM':
        // alert(`Clicked ${strings.Command2}`);
        /** Render Random Dialog */
        let placeHolder2: Element = document.querySelectorAll(".os-Files-extensionPlaceHolder")[1];
        let element2: React.ReactElement<IRandomDialogProps> = React.createElement(RandomDialog, { isOpened: true, listid: id, context: this.context }, null);
        ReactDOM.render(element2, placeHolder2);
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
