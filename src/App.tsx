import { useEffect, useState } from 'react'
import {GET_REPOSITORIES} from './query/query'
import './App.css'
import { useQuery } from '@apollo/client'

function App() {
  const [nameRepo, setNameRepo] = useState('City')
  const [fetchData, setFetchData] = useState({})
  const {data, loading, error, refetch} = useQuery(GET_REPOSITORIES, {variables: {name: nameRepo}})
  
  
  useEffect(() => {
    
    
    console.log(data)
  },[data])
  
  
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <input type='text'  value={nameRepo} onChange={(e) => setNameRepo(e.target.value)} /> 
        <button type='button' > Search</button>
      </div>


{ loading ? (<p>Loading...</p>) : (
data.search.edges.map((data:any) =>
<ul key={data.node.id}>
  <li>Name: {data.node.name}</li>
  <li>Link:<a href={data.node.url}>Ссылка</a></li>
  
  <li>Stars GitHub:{data.node.stargazers.totalCount}</li>
  <li> Data commit: {data.node.pushedAt}</li>
  
  
  
</ul>
))}


    </div>
  )
}

export default App
