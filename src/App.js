import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";


function App() {
  
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    const result = api.get('/repositories')
      .then(({data}) => {
        setRepositories(data)
      })
  }, [])


  async function handleAddRepository() {
    const repository = {
      title: `repository ${Date.now()}`,
      url:`http://github.com/devfreelex/${Date.now()}`,
      techs:["Angular", "React", "Vue"]
    }

    const { data: newRepository } = await api.post('/repositories', repository)

    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`)
    if(!status || status !== 204) return

    const remainingRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories(remainingRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map( repository => (
            <li key={repository.id}>
              {repository.title}    
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
