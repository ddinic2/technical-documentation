import * as React from "react";

export class DocumentModel {
    Document_x0020_Category: string;
    // Document_x0020_Language: any;
    Revision: string;
    DocumentNumber: string;
    Id: number;
    ID: number;
    Title: string;
    Product: string;
    TaxCatchAll: any;
    FileRef:any;
    constructor(obj?: DocumentModel) {
        this.Document_x0020_Category = obj ? obj.Document_x0020_Category : '',
            // this.Document_x0020_Language = obj ? this.makeLanguageInRow(obj.Document_x0020_Language) : '',
            this.Revision = obj? obj.Revision : '',
            this.DocumentNumber = obj ? obj.DocumentNumber : '',
            this.Id = obj ? obj.Id : 0,
            this.ID = obj ? obj.ID : 0,
            this.Title = obj ? obj.Title : '',
            this.Product = obj ? obj.Product : '',
            this.FileRef = obj ? obj.FileRef: ''
    }
  
    makeLanguageInRow(languages: any[]) {
        let inRow = languages?.map(l => {
            return l.Label
        })
        return inRow.join(', ')
    }

    makeProduct(product:any, taxAll:any[]){
        if(product && product.WssId){
            let inRowText:string = taxAll.filter(ta => ta.ID === product.WssId)[0].Term
            return inRowText
        }else{
            return ''
        }
    }
}


