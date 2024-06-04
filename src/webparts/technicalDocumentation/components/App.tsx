import * as React from 'react'
import { Routes, Route, HashRouter, json } from "react-router-dom";
import Service from '../service/Service';
import { ListsData } from '../models/ListData';
import Loader from './loader/Loader';
import { DocumentModel } from '../models/DocumentModel';
import DocumentationList from './documentation-list/DocumentationList';


const App = ({ context }: any) => {

    const svc = new Service
    const listsData = new ListsData()
    const [loader, setLoader] = React.useState(true)
    const [items, setItems] = React.useState<DocumentModel[]>([])
    const [documentCategoryOptions, setDocumentCategoryOptions] = React.useState<any[]>()
    // const [languagesOptions, setLanguagesOptions] = React.useState<any[]>()
    const [productOptions, setProductOptions] = React.useState<any[]>()
    const [revisionOptions, setRevisionOptions] = React.useState<any[]>()

    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        // svc.getFields()

        let newItems = await svc.getFieldsFromListAndExpand(listsData.MAIN_LIST, listsData.MAIN_LIST_TABLE_FIELDS, listsData.MAIN_LIST_EXPAND_FIELD)
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

        const documentCat = await svc.getChoices(listsData.MAIN_LIST, listsData.DOCUMENT_CATEGORY_CHOICES)
        setDocumentCategoryOptions(svc.makeDropdownFluentFromChoices(documentCat.Choices, newItems))

        // let languageRes = await svc.getManagedMetadataTerms()
        // setLanguagesOptions(svc.makeDropdownFluentFromTermStore(languageRes, newItems, 'Document_x0020_Language'))

        // let productRes = await svc.getManagedMetadataProductsTerms()
        // setProductOptions(svc.makeDropdownFluentFromTermStore(productRes, newItems, 'Product'))
        let prod: string[] = newItems.map(e => e.Product)
        setProductOptions(prod.filter((item, index) => prod.indexOf(item) === index)?.map(i => { return { key: i, text: i } }))

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
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<DocumentationList
                                items={items}
                                documentCategoryOptions={documentCategoryOptions}
                                // languagesOptions={languagesOptions}
                                revisionOptions={revisionOptions}
                                productOptions={productOptions}
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
                }
            </div>

        </>

    )
}

export default App;