import {useMutation, useQuery} from '@apollo/client'
import {Button, Form, Input, InputNumber, Select} from 'antd'
import {useEffect, useState} from 'react'
import {GET_PEOPLE, UPDATE_CAR} from '../../queries'

const {Option} = Select;


const UpdateCar = props => {

    const {id, year, make, model, price, personId} = props
    const [newPersonId, setNewPersonId] = useState(personId);
    const {data} = useQuery(GET_PEOPLE);
    const [updateCar] = useMutation(UPDATE_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const {
            year,
            make,
            model,
            price,
        } = values

        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId: newPersonId
            }
        })

        props.onButtonClick()
    }

    return (
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                person: data.people.find(person => person.id === personId).id
            }}
        >
            <Form.Item name="year" label="Year" rules={[{required: true, message: "Please input the car's year!"}]}>
                <InputNumber
                    placeholder="Year"
                />
            </Form.Item>
            <Form.Item name="make" label="Make" rules={[{required: true, message: "Please input the car's make!"}]}>
                <Input width={20} placeholder="Make"/>
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{required: true, message: "Please input the car's model!"}]}>
                <Input width={20} placeholder="Model"/>
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{required: true, message: "Please input the car's price!"}]}>
                <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item name="person" label="Person"
                       rules={[{required: true, message: "Please input the car's owner!"}]}>
                <Select
                    showSearch
                    placeholder="Select a person"
                    onChange={(id => setNewPersonId(id))}
                >
                    {data?.people?.map(person => (
                        <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                    ))}
                </Select>
            </Form.Item>


            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(false) ||
                            form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                    >
                        Update Contact
                    </Button>
                )}
            </Form.Item>
            <Button type='danger' onClick={props.onButtonClick}>
                Cancel
            </Button>
        </Form>
    )
}

export default UpdateCar
