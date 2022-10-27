import {useQuery} from '@apollo/client'
import {List} from 'antd'
import {GET_CARS} from '../../queries'
import Car from '../cards/Car'

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Cars = ({passedId}) => {
    const styles = getStyles()

    const {loading, error, data} = useQuery(GET_CARS)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    return (
        <List grid={{gutter: 20, column: 1}} style={styles.list}>
            {data.cars.map(({id, year, make, model, price, personId}) => {
                if (personId === passedId) {

                    return <List.Item key={id}>
                        <Car id={id} year={year} make={make} model={model} price={price} personId={personId}/>
                    </List.Item>
                } else {
                    return null
                }

            })}
        </List>
    )
}

export default Cars
