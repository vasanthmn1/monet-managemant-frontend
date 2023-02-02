import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import Pagination from 'react-paginate';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
export const Bussines = () => {
    const [user, setuser] = useState([])
    const [total, settotal] = useState(0)

    const addmoney = (money) => {

        settotal(total + parseInt(money))
        setuser([...user])
    }

    useEffect(() => {
        getuser()
    }, [])


    const getuser = async () => {
        const user = await axios.get(`http://localhost:7000/business`)
        setuser(user.data.user)

    }

    var today = new Date();
    const year = today.getFullYear()
    const days = today.getDay()
    const day = today.getDate()

    const todays = [`${day}-${days}-${year}`]

    let handelDelet = async (id) => {

        let conform = window.confirm("are you sure you want to delete ")
        if (conform) {
            await axios.delete(`http://localhost:7000/business/${id._id}`)
            settotal(total - parseInt(id.money))
        }


        getuser()
    }

    const edittime = () => {
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
            let res = await axios.post("http://localhost:7000/business", values)

        }
    })

    return (
        <div>
            <h1 className='h1'>Bussines moneny mangenment</h1>
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
                            // myFormik.errors.age && myFormik.touched.age ?
                            //     <Form.Label style={{ color: "red" }}  >{myFormik.errors.age}</Form.Label>
                            //     : null
                        }
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
                                        <td><button className=' ms-3 btn btn-danger btn-sm' onClick={() => {
                                            handelDelet(val)
                                        }}>Del</button></td>

                                        <td>
                                            <Link to={`/bussines/edit/${val._id}`} >
                                                <button className=' ms-3 btn btn-danger btn-sm'
                                                    onClick={() => {
                                                        edittime()
                                                    }}
                                                >Edit</button>  </Link></td>

                                    </td>
                                </tr>

                            </tbody>


                        )
                    })
                }
                <div>
                    <h1 >Total:$ {total}</h1>
                </div>
            </table>
            <h4></h4>

        </div>

    )
}
