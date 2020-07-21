import React from 'react';
import { useQuery, gql } from '@apollo/client'
import './App.css';

const GET_USERS_QUERY = gql`
  query{
    getUsers{
      id
      username
      email
      image
    }
  }
`

function App() {
  const {loading, error, data} = useQuery(GET_USERS_QUERY);

  if(loading) return <p>Loading....</p>;
  if(error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">
        {data.getUsers.map(d => (
          <>
            <div key={d.id}>
              <p>{d.username}</p>
              <p>{d.email}</p>
              <p>{d.image}</p>
            </div>
            <hr />
          </>
        ))}
      </header>
    </div>
  );
}

export default App;
