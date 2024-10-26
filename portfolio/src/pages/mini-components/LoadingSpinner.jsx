import { Context } from '../../main'
import React, { useContext } from 'react'
import { RingLoader } from 'react-spinners'

const LoadingSpinner = () => {

    const { loading } = useContext(Context)

    return (
        <RingLoader
            color="#6D00C9"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default LoadingSpinner
