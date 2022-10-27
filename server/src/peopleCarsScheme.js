import {gql} from 'apollo-server-express'
import {find, remove} from 'lodash'

let people_data = [
    {
        id: '1',
        firstName: 'Bill',
        lastName: 'Gates'
    },
    {
        id: '2',
        firstName: 'Steve',
        lastName: 'Jobs'
    },
    {
        id: '3',
        firstName: 'Linux',
        lastName: 'Torvalds'
    }
]

let cars_data = [
    {
        id: '1',
        year: '2019',
        make: 'Toyota',
        model: 'Corolla',
        price: '40000',
        personId: '1'
    },
    {
        id: '2',
        year: '2018',
        make: 'Lexus',
        model: 'LX 600',
        price: '13000',
        personId: '1'
    },
    {
        id: '3',
        year: '2017',
        make: 'Honda',
        model: 'Civic',
        price: '20000',
        personId: '1'
    },
    {
        id: '4',
        year: '2019',
        make: 'Acura ',
        model: 'MDX',
        price: '60000',
        personId: '2'
    },
    {
        id: '5',
        year: '2018',
        make: 'Ford',
        model: 'Focus',
        price: '35000',
        personId: '2'
    },
    {
        id: '6',
        year: '2017',
        make: 'Honda',
        model: 'Pilot',
        price: '45000',
        personId: '2'
    },
    {
        id: '7',
        year: '2019',
        make: 'Volkswagen',
        model: 'Golf',
        price: '40000',
        personId: '3'
    },
    {
        id: '8',
        year: '2018',
        make: 'Kia',
        model: 'Sorento',
        price: '45000',
        personId: '3'
    },
    {
        id: '9',
        year: '2017',
        make: 'Volvo',
        model: 'XC40',
        price: '55000',
        personId: '3'
    }
]


const typeDefs = gql`
    type People {
        id: String!
        firstName: String
        lastName: String
    }

    type PersonWithCars {
        id: String!
        firstName: String
        lastName: String
        cars: [Car]
    }
    
    type Car {
        id: String!,
        year: Int,
        make: String,
        model: String,
        price: Float,
        personId: String
    }


    type Query {
        person(id: String!): People,
        people: [People],
        cars: [Car],
        car(id: String!): Car,
        personWithCars(id: String!): PersonWithCars
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): People
        updatePerson(id: String!, firstName: String, lastName: String): People
        removePerson(id: String!): People

        addCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String):Car
        updateCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Car
        removeCar(id: String!): Car
    }
`
const resolvers = {
    Query: {
        people: () => people_data,
        person(parent, args, context, info) {
            return find(people_data, {id: args.id})
        },
        cars: () => cars_data,
        car(parent, args, context, info) {
            return find(cars_data, {id: args.id})
        },
        personWithCars(parent, args, context, info) {
            const searchPerson = find(people_data, {id: args.id});
            searchPerson.cars = cars_data.filter(car => car.personId === args.id);
            return searchPerson
        }
    },
    Mutation: {
        /* Adding a new person to the people_data array. */
        addPerson: (root, args) => {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName,
            }
            people_data.push(newPerson)
            return newPerson
        },
        /* Updating the person in the people_data array. */
        updatePerson: (root, args) => {
            const person = find(people_data, {id: args.id})
            if (!person) {
                throw new Error("Person doenst exist!")
            }
            person.firstName = args.firstName
            person.lastName = args.lastName

            return person
        },
        /* Removing the person from the people_data array. */
        removePerson: (root, args) => {
            const removePerson = find(people_data, {id: args.id})
            if (!removePerson) {
                throw new Error("Person doenst exist!")
            }
            remove(people_data, p => {
                return p.id === removePerson.id
            })
            cars_data = cars_data.filter(car => car.personId !== removePerson.id);
            return removePerson
        },
        /* Adding a new car to the cars_data array. */
        addCar: (root, args) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            }
            cars_data.push(newCar)
            return newCar
        },
        /* Updating the car in the cars_data array. */
        updateCar: (root, args) => {
            const car = find(cars_data, {id: args.id})
            if (!car) {
                throw new Error("Car doenst exist!")
            }
            car.id = args.id
            car.year = args.year
            car.make = args.make
            car.model = args.model
            car.price = args.price
            car.personId = args.personId

            return car
        },
        /* Removing the car from the cars_data array. */
        removeCar: (root, args) => {
            const removeCar = find(cars_data, {id: args.id})
            if (!removeCar) {
                throw new Error("Car doenst exist!")
            }
            remove(cars_data, c => {
                return c.id === removeCar.id
            })
            return removeCar
        },
    }
}

export {typeDefs, resolvers}