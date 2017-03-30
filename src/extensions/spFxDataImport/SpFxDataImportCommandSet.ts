import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  IBaseListViewCommandSetProperties,
  IListViewCommandSetRenderEventParameters,
  IListViewCommandSetExecuteEventParameters
} from '@ms/sp-listview-extensibility';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

import * as strings from 'spFxDataImportStrings';

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
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.commandId) {
      case 'COMMAND_IMPORT':
        alert(`Clicked ${strings.CommandImport}`);
        break;
      case 'COMMAND_2':
        alert(`Clicked ${strings.Command2}`);
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
