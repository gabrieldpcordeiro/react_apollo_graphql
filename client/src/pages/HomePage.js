import Title from '../components/layout/Title'
import AddPerson from '../components/forms/AddPerson'
import People from '../components/lists/People'
import {Divider} from 'antd';
import AddCar from "../components/forms/AddCar";

const HomePage = () => {
    return (
        <div className='App'>
            <Title/>
            <Divider>Add a Person</Divider>
            <AddPerson/>
            <Divider>Add a Car</Divider>
            <AddCar/>
            <Divider>Records</Divider>
            <People/>
        </div>

    )
}

export default HomePage
