import * as React from 'react'
import Service from '../../service/Service';
import { ListsData } from '../../models/ListData';
import { UserEmail } from '../App';
import { ProductOptionsProps } from './SubscribeButton';
import { DefaultButton, Dialog, DialogContent, DialogFooter, DialogType } from 'office-ui-fabric-react';
import { ComboBox, PrimaryButton } from '@fluentui/react';

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Subscribe on topics',
};

interface SubscribeModalProps {
    isOpen: boolean;
    productOptions: ProductOptionsProps[];
    setIsOpen: Function;
}

const SubscribeModal = ({ isOpen, productOptions, setIsOpen }: SubscribeModalProps) => {

    const svc = new Service()
    const listsData = new ListsData()
    const email = React.useContext(UserEmail)
    const [subscriptionObject, setSubscriptionObject] = React.useState(null)
    const [subscribeOnProducts, setSubeOnProducts] = React.useState<string[] | null>([])

    React.useEffect(() => {
        if (!isOpen) return
        getMySubscription()
    }, [isOpen])

    const getMySubscription = async () => {
        let mySubscription = await svc.getItemByField(listsData.SUBSCRIPTION_LIST, listsData.SUBSCRIPTION_LIST_USER_FIELD, email)
        if (mySubscription.length) {
            setSubscriptionObject(mySubscription[0])
            const products = mySubscription[0].Products.split(';')
            setSubeOnProducts(products)
        } else {
            setSubscriptionObject(null)
        }
    }

    const save = async () => {
        const selected = subscribeOnProducts.join(';')
        if (subscriptionObject) {
            const saveRes = await svc.updateItemInList(listsData.SUBSCRIPTION_LIST, { ID: subscriptionObject.ID, User: email, Products: selected })
            if (saveRes.data) {
                setIsOpen(false)
                setSubeOnProducts([])
            }
        } else {
            const saveRes = await svc.addItemInList(listsData.SUBSCRIPTION_LIST, { User: email, Products: selected })
            if (saveRes.data) {
                setIsOpen(false)
                setSubeOnProducts([])
            }
        }
    }

    return (
        <>
            <Dialog
                hidden={!isOpen}
                onDismiss={() => setIsOpen(false)}
                dialogContentProps={dialogContentProps}
            >
                <DialogContent>
                    <ComboBox
                        label="Select Products:"
                        options={productOptions}
                        onChange={(e, v) => {
                            if (v.selected) {
                                setSubeOnProducts(subscribeOnProducts && subscribeOnProducts.length ? [...subscribeOnProducts, v.text] : [v.text])
                            } else {
                                setSubeOnProducts(subscribeOnProducts.filter(s => s !== v.key))
                            }
                        }}
                        selectedKey={subscribeOnProducts}
                        allowFreeInput={false}
                        multiSelect={true}
                        autoComplete="on"
                        calloutProps={{
                            onLayerMounted: () => {
                              // Force the ComboBox options layer to be on top
                              const layers = document.getElementsByClassName('ms-Layer');
                              if (layers.length > 0) {
                                const lastLayer:any = layers[layers.length - 1];
                                lastLayer.style.zIndex = '1000';
                              }
                            }
                          }}
                    />
                </DialogContent>
                <DialogFooter>
                    <PrimaryButton onClick={save} text="Save" />
                    <DefaultButton onClick={() => setIsOpen(false)} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default SubscribeModal