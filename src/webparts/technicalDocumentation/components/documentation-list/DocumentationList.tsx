import * as React from 'react'
import { TextField } from 'office-ui-fabric-react'
import { ComboBox, IComboBoxOption } from '@fluentui/react'
import { DocumentModel } from '../../models/DocumentModel'
import Table from './Table'
import SubscribeButton from '../subscribe-options/SubscribeButton'


const DocumentationList = ({ items, documentCategoryOptions, revisionOptions, productOptions, docNumberOptions }: any) => {

    const [selectedProduct, setSelectedProduct] = React.useState<number[] | null>([])
    const [selectedDocType, setSelectedDocType] = React.useState<string[] | null>([])
    // const [selectedLanguage, setSelectedLanguage] = React.useState<string[] | null>([])
    const [selectedRevision, setSelectedRevision] = React.useState<string[] | null>([])
    const [selectedDocNumber, setSelectedDocNumber] = React.useState<string[] | null>([])
    const [freeText, setFreeText] = React.useState<string>("")

    const [data, setData] = React.useState<DocumentModel[]>(items)
    const [dataForTable, setDataForTable] = React.useState<DocumentModel[]>(items)

    React.useEffect(() => {
        setData(items)
    }, [items])

    React.useEffect(() => {
        if (selectedDocType || selectedRevision || freeText || selectedProduct || selectedDocNumber) {
            searchItems()
        }
    }, [selectedDocType, selectedRevision, freeText, selectedProduct, selectedDocNumber])
    //const data = React.useMemo(() => items, [])

    const setSelectedDoc = (v: any) => {
        if (v) {
            if (v.selected) {
                setSelectedDocType(selectedDocType && selectedDocType.length ? [...selectedDocType, v.key] : [v.key])
            } else {
                setSelectedDocType(selectedDocType.filter(s => s !== v.key))
            }
        }
    }

    const setRev = (v: any) => {
        if (v) {
            if (v.selected) {
                setSelectedRevision(selectedRevision && selectedRevision.length ? [...selectedRevision, v.key] : [v.key])
            } else {
                setSelectedRevision(selectedRevision.filter(s => s !== v.key))
            }
        }
    }

    const setDocNum = (v: any) => {
        if (v) {
            if (v.selected) {
                setSelectedDocNumber(selectedDocNumber && selectedDocNumber.length ? [...selectedDocNumber, v.key] : [v.key])
            } else {
                setSelectedDocNumber(selectedDocNumber.filter(s => s !== v.key))
            }
        }
    }

    const setProduct = (v: any) => {
        if (v) {
            if (v.selected) {
                setSelectedProduct(selectedProduct && selectedProduct.length ? [...selectedProduct, v.key] : [v.key])
            } else {
                setSelectedProduct(selectedProduct.filter(s => s !== v.key))
            }
        }
    }

    const searchItems = () => {

        let copyArray = [...data]
        if (selectedDocType.length || selectedRevision.length || freeText || selectedProduct.length || selectedDocNumber.length) {
            if (selectedDocType.length) {
                const joinedDocType = selectedDocType.join(',')
                copyArray = copyArray.filter(d => joinedDocType.indexOf(d.Document_x0020_Category) !== -1)
            }

            if (selectedRevision.length) {
                const joinedRevision = selectedRevision.join(',')
                copyArray = copyArray.filter(d => joinedRevision.indexOf(d.Revision) !== -1)
            }
            if (selectedDocNumber.length) {
                const joinedDocNumber = selectedDocNumber.join(',')
                copyArray = copyArray.filter(d => joinedDocNumber.indexOf(d.DocumentNumber) !== -1)
            }
            if (freeText) {
                const textTrimmed = freeText.trim().toLowerCase()
                copyArray = copyArray.filter(d => {
                    if (d.Title?.toLowerCase().indexOf(textTrimmed) > -1 ||
                        d.Document_x0020_Category?.toLowerCase().indexOf(textTrimmed) > -1 ||
                        d.Product?.toLowerCase().indexOf(textTrimmed) > -1 ||
                        d.DocumentNumber?.toLowerCase().indexOf(textTrimmed) > -1 ||
                        d.Revision?.toLowerCase().indexOf(textTrimmed) > -1) {
                        return d
                    }
                })
            }
            if (selectedProduct.length) {
                const joinedProducts = selectedProduct.join(',')
                copyArray = copyArray.filter(d => joinedProducts.indexOf(d.Product) > -1)
            }
            setDataForTable(copyArray)
        } else {
            if (data.length !== dataForTable.length) {
                setDataForTable([...data])
            }
        }
    }


    return (
        <>
            <div className="row searchBackround pb-1">
                <div className="col-3 mb-1">
                    <TextField label="Search:" onChange={(ev, val) => setFreeText(val)} />
                </div>
                <div className="col-3 mb-1">
                    <ComboBox
                        label="View by Products:"
                        options={productOptions}
                        //options={dataForTable.map(e => e.Product).filter((item, index) => dataForTable.map(e => e.Product).indexOf(item) === index)?.map(i => { return { key: i, text: i } }).sort((a, b) => a.text.localeCompare(b.text))}
                        onChange={(e, v) => setProduct(v)}
                        allowFreeInput={false}
                        multiSelect={true}
                        autoComplete="on"
                    />
                </div>
                <div className="col-3 mb-1">
                    <ComboBox
                        label="View by Document Category:"
                        options={documentCategoryOptions}
                        //options={dataForTable.map(e => e.Document_x0020_Category).filter((item, index) => dataForTable.map(e => e.Document_x0020_Category).indexOf(item) === index)?.map(i => { return { key: i, text: i } }).sort((a, b) => a.text.localeCompare(b.text))}
                        onChange={(e, v) => setSelectedDoc(v)}
                        allowFreeInput={false}
                        multiSelect={true}
                        autoComplete="on"
                    />
                </div>
                <div className="col-3 mb-1" style={{textAlign:'center', marginTop: "auto"}}>
                    <SubscribeButton productOptions={productOptions} />
                    {/* <ComboBox
                        label="View by Language:"
                        options={languagesOptions}
                        onChange={(e, v) => setLang(v)}
                        allowFreeInput={false}
                        multiSelect={true}
                        autoComplete="on"
                    /> */}
                    {/* <ComboBox
                        label="View by Revision:"
                        options={revisionOptions}
                        onChange={(e, v) => setRev(v)}
                        allowFreeInput={false}
                        multiSelect={true}
                        autoComplete="on"
                    /> */}
                    {/* <ComboBox
                        label="View by Document Number:"
                        options={docNumberOptions}
                        //options={dataForTable.map(e => e.DocumentNumber).filter((item, index) => dataForTable.map(e => e.DocumentNumber).indexOf(item) === index)?.map(i => { return { key: i , text: i } }).sort((a, b) => a.text.localeCompare(b.text)) || []}
                        onChange={(e, v) => setDocNum(v)}
                        allowFreeInput={false}
                        multiSelect={true}
                        autoComplete="on"
                    /> */}
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <Table data={dataForTable} />
                </div>
            </div>
        </>

    )
}



export default DocumentationList