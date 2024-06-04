import * as React from 'react';
import { BallTriangle } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className="loader">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#0078D4"
                ariaLabel="ball-triangle-loading"
                wrapperClass={''}
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    )
}

export default Loader;