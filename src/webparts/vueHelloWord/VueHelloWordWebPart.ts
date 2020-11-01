import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'VueHelloWordWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';
//import vuetify from '../../plugins/vuetify'

// Importing Vue.js
import Vue from 'vue';
//import Vuetify from 'vuetify/lib';

//Vue.use(Vuetify);
// Importing Vue.js SFC
import VueHelloWordComponent from './components/VueHelloWord.vue';

export interface IVueHelloWordWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class VueHelloWordWebPart extends BaseClientSideWebPart<IVueHelloWordWebPartProps> {
  
  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;
   
    let el = new Vue({
      el: `#${id}`,
     //vuetify,
      render: h => h(VueHelloWordComponent, {
        props: {
          description: this.properties.description
        }
      })
    });
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
