import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useFormik } from 'formik';
import { listClasses } from '@mui/material';
import { Link } from 'react-router-dom';

export const Personla = () => {
    const [user, setuser] = useState([])
    const [total, settotal] = useState(0)
    useEffect(() => {
        getuser()

    }, [user])

    const addmoney = (money) => {

        settotal(total + parseInt(money))
        setuser([...user])
    }

    const getuser = async () => {
        const user = await axios.get(`https://moneymangment.onrender.com/personal`)
        setuser(user.data.user)
        // settotal(+ total)
        // settotal(user.data.user)
        // console.log(user.data.user);
    }
    // settotal(total + user.data.user.money)

    // const a = settotal(t)
    var today = new Date();
    const year = today.getFullYear()
    const days = today.getDay()
    const day = today.getDate()

    const todays = [`${day}-${days}-${year}`]

    // console.log(date);
    let handelDelet = async (id) => {

        let conform = window.confirm("are you sure you want to delete ")
        if (conform) {
            await axios.delete(`https://moneymangment.onrender.com/personal/${id._id}`)
            settotal(total - parseInt(id.money))
        }
        getuser()

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
            let res = await axios.post("https://moneymangment.onrender.com/personal", values)
        }
    })
    return (
        <div>
            <h1 className='h1'>Personal moneny mangenment</h1>
            <Form onSubmit={myFormik.handleSubmit}>
                <Row className=''>



                    <Form.Group as={Col} md="5" className='mb-3'>
                        <Form.Label>Detailes</Form.Label>
                        <Form.Control
                            name="task"
                            value={myFormik.values.task}
                            onChange={myFormik.handleChange}
                            onBlur={myFormik.handleBlur}
                            type="text"
                            placeholder=""

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
                            placeholder=""
                            defaultValue="Otto"
                        />

                        {
                            myFormik.errors.money && myFormik.touched.money ?
                                <Form.Label style={{ color: "red" }}  >{myFormik.errors.money}</Form.Label>
                                : null
                        }
                    </Form.Group>
                    <Form.Group as={Col} md="1" className='mb-3'>
                        <Button type='submit' className='btn btn-success addbtn' onClick={() => {
                            addmoney(myFormik.values.money)
                        }}>Add</Button>
                    </Form.Group>
                </Row>

            </Form>


            <h1>{user.task}</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Today spanding Money</th>
                        <th scope="col">Date</th>
                        <th scope="col">Money</th>
                    </tr>
                </thead>
                {
                    user.map((val, idx) => {
                        return (

                            <tbody>
                                <tr>

                                    <td>{val.task}</td>

                                    <td className='date'>  {todays}</td>
                                    <td className='money'>$ {val.money}</td>
                                    <td>
                                        <td>
                                            <Link to={`/personal/edit/${val._id}`}>
                                                <button className=' ms-3 btn btn-info btn-sm' onClick={() => {

                                                }}>Edit</button>
                                            </Link>
                                        </td>
                                        <td><button className=' ms-3 btn btn-danger btn-sm' onClick={() => {
                                            handelDelet(val)
                                        }}>Del</button></td>
                                    </td>
                                </tr>

                            </tbody>

                        )
                    })
                }
                <div>
                    {/* <h1>Total:$ {total}</h1> */}
                </div>
            </table>
            <h4></h4>

        </div>
    )
}
