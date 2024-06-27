import * as React from "react";
import { spfi, SPBrowser, } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/site-users/web";

import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/fields";
import "@pnp/sp/security";
import "@pnp/sp/search";
import "@pnp/sp/lists/web";
import "@pnp/sp/attachments";
import { IItem } from "@pnp/sp/items/types";
import { SPHttpClient } from '@microsoft/sp-http';
import "@pnp/sp/taxonomy";
import { TermStore, TermSet, Term } from '@pnp/sp/taxonomy';
import { DocumentModel } from "../models/DocumentModel";



class Service {
    //sp = spfi("https://landisgyr.sharepoint.com/sites/Ext-WS-AMTechnicalDocumenation/").using(SPBrowser());
    sp = spfi("https://landisgyr.sharepoint.com/sites/Ext-WS-AMTechnicalDocumentation/").using(SPBrowser());
    constructor() { }

    getManagedMetadataTerms = async () => {
        try {
            const res = await this.sp.termStore.groups.getById("0e250b36-22f5-4624-ab60-366f18ff8931").sets.getById("5f81fdae-39cf-4406-a722-63dbe2ffe4ec").getAllChildrenAsOrderedTree()
            return res

        } catch (error) {
            console.error('Error fetching term store data:', error);
        }
    }

    // getManagedMetadataProductsTerms = async () => {
    //     try {
    //         const res = await this.sp.termStore.groups.getById("76ee1144-4244-4acd-8b2b-957be65495e7").sets.getById("0da3e3c3-72d6-49bc-a857-b8017e995492").getAllChildrenAsOrderedTree()
    //         console.log('products', res)
    //         return res

    //     } catch (error) {
    //         console.error('Error fetching term store data:', error);
    //     }
    // }

    makeDropdownFluentFromChoices(someArray: any[], mainItems: DocumentModel[]) {
        const myItemsDocuments = mainItems.map(mi => mi.Document_x0020_Category).join(',')
        let newArr = someArray.filter((el: any) => {
            if (myItemsDocuments.indexOf(el) !== -1) {
                return el
            }
        })
        return newArr?.map((e) => {return { key: e, text: e }})
    }

    makeDropdownFluentFromTermStore(someArray: any[], mainItems: DocumentModel[], fieldName:string) {
        const myItemsLanguages = mainItems.map((mi:any) => mi[fieldName]).join(',')
        let newArr = someArray.filter((el: any) => {
            if (myItemsLanguages.indexOf(el.defaultLabel) > -1) {
                return el
            }
        })
        return newArr?.map((el) => { return { key: el.defaultLabel, text: el.defaultLabel } })
    }

    getFieldsFromListAndExpand(listName: string, fields: string, expandColumns: string) {
        return this.sp.web.lists.getByTitle(listName).items.select(fields).expand(expandColumns).top(5000)()
    }

    async getFields() {
        const fields = await this.sp.web.lists.getByTitle("Documents").fields();
        console.log(fields);
    }

    getChoices(listName: string, fieldName: string) {
        return this.sp.web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(fieldName)()
    }


}

export default Service;