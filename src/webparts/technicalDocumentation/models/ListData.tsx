import * as React from "react";

export class ListsData {
    MAIN_LIST: string = 'Documents';
    MAIN_LIST_TABLE_FIELDS: string = 'ID, Title, Product, Revision, DocumentNumber, Document_x0020_Category, FileRef, TaxCatchAll/Term, TaxCatchAll/ID'; 
    MAIN_LIST_SORT_FIELDS: string = 'StartDate';
    MAIN_LIST_EXPAND_FIELD: string = 'TaxCatchAll';
    DOCUMENT_CATEGORY_CHOICES: string = 'Document_x0020_Category';
    SUBSCRIPTION_LIST: string = 'Subscriptions';
    SUBSCRIPTION_LIST_USER_FIELD: string = 'User';
}