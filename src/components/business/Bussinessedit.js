import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
export const Bussinessedit = () => {
    let porms = useParams()

    let naveget = useNavigate()
    const [loding, setloding] = useState(false)
    useEffect(() => {
        Getusers()
    }, [])

    const Getusers = async () => {
        try {
            let get = await axios.get(`http://localhost:7000/business/${porms.id}`)
            myFormik.setValues(get.data.products)
            console.log(get.data.products);

        } catch (error) {
            console.log(error);
        }
    }

    let myFormik = useFormik({
        initialValues: {
            task: "",
            money: "",
        },
        validate: (values) => {
            let err = {}
            if (!values.task) {
                err.task = "Enter Today Name"
            } else if (values.task.length < 4) {
                err.task = "Maximam Four Letter"
            }
            if (!values.money) {
                err.money = "entet money"
            }
            return err
        },
        onSubmit: async (values) => {
            let res = await axios.put(`http://localhost:7000/business/${porms.id}`, values)
            naveget("/bussines")
            setloding(true)
        }
    })
    return (
        <>
            <div>bussinessedit</div>
            <div>
                <Form onSubmit={myFormik.handleSubmit}>
                    <Row className=''>

                        {/* <div className='col-lg-8'> */}

                        <Form.Group as={Col} md="5" className='mb-3'>
                            <Form.Label>Detailes</Form.Label>
                            <Form.Control
                                name="task"
                                value={myFormik.values.task}
                                onChange={myFormik.handleChange}
                                onBlur={myFormik.handleBlur}
                                type="text"
                                placeholder="First name"

                            />
                            {
                                myFormik.errors.task && myFormik.touched.task ?
                                    <Form.Label style={{ color: "red" }}  >{myFormik.errors.task}</Form.Label>
                                    : null
                            }
                        </Form.Group>

                        <Form.Group as={Col} md="2" >
                            <Form.Label>Money</Form.Label>
                            <Form.Control
                                name='money'
                                value={myFormik.values.money}
                                onChange={myFormik.handleChange}
                                onBlur={myFormik.handleBlur}
                                type="number"
                                placeholder="Last name"
                                defaultValue="Otto"
                            />

                            {
                                myFormik.errors.money && myFormik.touched.money ?
                                    <Form.Label style={{ color: "red" }}  >{myFormik.errors.money}</Form.Label>
                                    : null
                            }
                        </Form.Group>
                    </Row>
                    <button type="submit" disabled={loding} className='btn btn-primary btn-sm'>{loding ? "Loding.." : "Edit"}</button>
                </Form>
            </div>
        </>
    )
}
