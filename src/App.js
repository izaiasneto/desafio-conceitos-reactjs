import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=> {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Izaias Neto',
      url: "www.github.com",
      techs: ["Nodejs", "css"]
    })

    const repo = response.data

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    
    var i = repositories.findIndex(repo => repo.id === id)

    const updatedRepositories = [...repositories]

    updatedRepositories.splice(i, 1)

    setRepositories(updatedRepositories)

    await api.delete(`repositories/${id}`)
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
            <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
            </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
