import React from 'react'
import { AllRouters } from '../../router/AllRouters'
import { Haeder } from '../header/Haeder'

export const Layout = () => {
    return (
        <div>
            <Haeder />
            <AllRouters />
        </div>
    )
}
