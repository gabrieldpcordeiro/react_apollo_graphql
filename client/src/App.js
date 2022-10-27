import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import './App.css'

import HomePage from './pages/HomePage'
import ShowPage from './pages/ShowPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="people">
            <Route path=":id" element={<ShowPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </ApolloProvider>
  )
}

export default App
