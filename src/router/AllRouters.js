import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Personla } from '../components/personal/Personla'
import { Bussines } from '../components/business/Bussines'
import { Bussinessedit } from '../components/business/Bussinessedit'
import { PersonalEdit } from '../components/personal/PersonalEdit'
export const AllRouters = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<Personla />} />
                <Route path='/personal' element={<Personla />} />
                <Route path='/personal/edit/:id' element={<PersonalEdit />} />
                <Route path='/bussines' element={<Bussines />} />
                <Route path='/bussines/edit/:id' element={<Bussinessedit />} />
            </Routes>

        </>
    )
}
