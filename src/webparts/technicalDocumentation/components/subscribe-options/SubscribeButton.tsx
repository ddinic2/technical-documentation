import * as React from 'react'
import { PrimaryButton } from '@fluentui/react'
import SubscribeModal from './SubscribeModal';

export interface ProductOptionsProps {
    key: string;
    text: string;
}

interface SubscribeButtonProps {
    productOptions: ProductOptionsProps[]
}

const SubscribeButton = ({ productOptions }: SubscribeButtonProps) => {

    const [isOpen, setIsOpen] = React.useState(false)



    return (
        <>
            <PrimaryButton disabled={!productOptions.length} onClick={() => setIsOpen(true)} text='Subscribe' />
            {productOptions && productOptions.length > 0 && <SubscribeModal isOpen={isOpen} setIsOpen={setIsOpen} productOptions={productOptions} />}
        </>
    )
}

export default SubscribeButton