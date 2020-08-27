import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AddawptodoappWebPartStrings';
import Addawptodoapp from './components/Addawptodoapp';
import { IAddawptodoappProps } from './components/IAddawptodoappProps';

export interface IAddawptodoappWebPartProps {
  description: string;
  ListNames: string;
  targetsite: string;
}

export default class AddawptodoappWebPart extends BaseClientSideWebPart<IAddawptodoappWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddawptodoappProps > = React.createElement(
      Addawptodoapp,
      {
        description: this.properties.description,
        SiteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
        LibraryName: this.properties.ListNames,
        currentsiteurl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
