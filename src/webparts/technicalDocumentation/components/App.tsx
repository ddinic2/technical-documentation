import * as React from 'react'
import { Routes, Route, HashRouter, json } from "react-router-dom";
import Service from '../service/Service';
import { ListsData } from '../models/ListData';
import Loader from './loader/Loader';
import { DocumentModel } from '../models/DocumentModel';
import DocumentationList from './documentation-list/DocumentationList';
import '../style/main.css'
export const UserEmail = React.createContext(null)


const App = ({ user }: any) => {

    const svc = new Service
    const listsData = new ListsData()
    const [loader, setLoader] = React.useState(true)
    const [items, setItems] = React.useState<DocumentModel[]>([])
    const [documentCategoryOptions, setDocumentCategoryOptions] = React.useState<any[]>()
    const [productOptions, setProductOptions] = React.useState<any[]>()
    const [revisionOptions, setRevisionOptions] = React.useState<any[]>()
    const [docNumberOptions, setDocNumberOptions] = React.useState<any[]>()

    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        let newItems = await svc.getFieldsFromListAndExpand(listsData.MAIN_LIST, listsData.MAIN_LIST_TABLE_FIELDS, listsData.MAIN_LIST_EXPAND_FIELD, listsData.MAIN_LIST_SORT_FIELDS)
        let rOpt: string[] = []
        newItems = newItems.map(i => {
            if (i.Revision) {
                rOpt.push(i.Revision.trim())
            }
            return new DocumentModel(i)
        })
        setItems(newItems)
        if (rOpt.length) {
            rOpt = rOpt.filter((item, index) => rOpt.indexOf(item) === index)

            setRevisionOptions(rOpt.map(r => {
                return { key: r, text: r }
            }))
        }

        let documentCat: string[] = newItems.map(e => e.Document_x0020_Category)
        setDocumentCategoryOptions(documentCat.filter((item, index) => documentCat.indexOf(item) === index)?.map(i => { return { key: i, text: i } }).sort((a, b) => a.text.localeCompare(b.text)))
        let prod: string[] = newItems.map(e => e.Product)
        setProductOptions(prod.filter((item, index) => prod.indexOf(item) === index)?.map(i => { return { key: i, text: i } }).sort((a, b) => a.text.localeCompare(b.text)))
        let documentNumber: string[] = newItems.map(e => e.DocumentNumber)
        setDocNumberOptions(documentNumber.filter((item, index) => documentNumber.indexOf(item) === index)?.map(i => { return { key: i, text: i } }).sort((a, b) => a.text?.localeCompare(b.text)))

        setLoader(false)
    }



    return (
        <>
            <div className="container-fluid">
                {loader ?
                    <div className='row'>
                        <div className='col-4 offset-4'>
                            <Loader />
                        </div>
                    </div>
                    :
                    <UserEmail.Provider value={user.email}>
                        <HashRouter>
                            <Routes>
                                <Route path="/" element={<DocumentationList
                                    items={items}
                                    documentCategoryOptions={documentCategoryOptions}
                                    revisionOptions={revisionOptions}
                                    productOptions={productOptions}
                                    docNumberOptions={docNumberOptions}
                                />}
                                >
                                </Route>
                                <Route path="*" element={
                                    <main style={{ padding: "1rem" }}>
                                        <p>There's nothing here!</p>
                                    </main>
                                }
                                >
                                </Route>
                            </Routes>
                        </HashRouter>
                    </UserEmail.Provider>
                }
            </div>

        </>

    )
}

export default App;