import {useEffect, useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {Button, Form, Input, InputNumber} from 'antd'
import {v4 as uuidv4} from 'uuid'
import {ADD_CAR, GET_CARS, GET_PEOPLE} from '../../queries'
import {Select} from 'antd';

const {Option} = Select;

const AddCar = () => {
    const [personId, setPersonId] = useState(null);
    const [id, setId] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
    const {data} = useQuery(GET_PEOPLE);


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
            price
        } = values

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId: personId

            },
            update: (cache, {data: addCar}) => {
                const dataNew = cache.readQuery({query: GET_CARS})
                console.log('data: ', dataNew.cars)
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...dataNew,
                        cars: [...dataNew.cars, addCar]
                    }
                })
            }
        })

        form.resetFields();
        setId(uuidv4());
    }


    return (
        <Form
            form={form}
            name='add-person-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{marginBottom: '40px', gap: '0.8em'}}
        >
            <Form.Item name="year" label="Year" rules={[{required: true, message: "Please input the car's year!"}]}>
                <InputNumber min={1500}
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
                <InputNumber min={0}
                             formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                             parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item name="person" label="Person"
                       rules={[{required: true, message: "Please input the car's owner!"}]}>
                <Select
                    showSearch
                    placeholder="Select a person"
                    onChange={(id => setPersonId(id))}
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
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar
