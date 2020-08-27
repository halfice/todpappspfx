import { SPHttpClient } from '@microsoft/sp-http';

export interface IAddawptodoappProps {
  description: string;
  LibraryName:string;
  SiteUrl:string;
  spHttpClient: SPHttpClient;
  _items: Array<object>;
  FlagStageForBreadCrum:Number;

  TaskItem:string;
  TaskItemID:string;

}
