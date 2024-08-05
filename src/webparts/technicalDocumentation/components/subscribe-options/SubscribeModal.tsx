import * as React from 'react'
import Service from '../../service/Service';
import { ListsData } from '../../models/ListData';
import { UserEmail } from '../App';
import { ProductOptionsProps } from './SubscribeButton';
import { DefaultButton, IconButton, Modal } from 'office-ui-fabric-react';
import { ComboBox, PrimaryButton } from '@fluentui/react';
import { IButtonStyles } from '@fluentui/react/lib/Button';

import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    IIconProps,
} from '@fluentui/react';

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        // eslint-disable-next-line deprecation/deprecation
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
    footer: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        textAlign: "right"
    },
});


const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };

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
            <Modal
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    <h2 className={contentStyles.heading}>
                        Subscribe on products
                    </h2>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
                <div className={contentStyles.body}>
                    <ComboBox
                        style={{ minWidth: "700px" }}
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
                                    const lastLayer: any = layers[layers.length - 1];
                                    lastLayer.style.zIndex = '1000';
                                }
                            }
                        }}
                    />

                </div>
                <div className={contentStyles.footer}>
                    <PrimaryButton onClick={save} text="Save" style={{ marginRight: "10px" }} />
                    <DefaultButton onClick={() => setIsOpen(false)} text="Cancel" />
                </div>
            </Modal>
        </>
    )
}

export default SubscribeModal