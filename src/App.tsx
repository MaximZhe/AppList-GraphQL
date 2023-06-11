import { useEffect, useState } from 'react'
import {GET_REPOSITORIES} from './query/query'
import './App.css'
import { useQuery } from '@apollo/client'
import { getPageCount} from './utils/pagesCount.tsx';
import {getPagesArray} from './utils/pagesCount.tsx';
function App() {
  const limit = 10;
  
  const [nameRepo, setNameRepo] = useState(localStorage.getItem('nameRepo') || '')
  const [first, setFirst] = useState(100)
  const [after, setAfter] = useState( )
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')!) || 1)
  const [totalCount,setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [hasMore, setHasMore] = useState(true);
  const {data, loading, error,  fetchMore} = useQuery(GET_REPOSITORIES, {
    variables: {name: nameRepo, first:first,after: after}
    
  })
  const pageArray = getPagesArray(totalPages)
  
  
  function fetchData () {
    const { pageInfo } = data.search;
    const {edges} = data.search
    if (pageInfo.hasNextPage) {
    fetchMore({
    variables: {
    after: pageInfo.endCursor
    }
    }).then(result => {
    const newEdges = result.data.search.edges;
    const hasMoreData = result.data.search.pageInfo.hasNextPage;
    setHasMore(hasMoreData);
    });
    } else {
    setHasMore(false);
    }
    }
  useEffect(() => {
    function cons () {
      if(data !== undefined){
        const totalRepo = data.search.edges
        setTotalCount(totalRepo.length);
        setTotalPages(getPageCount(totalCount,limit))
      }else{
        return null
      }
      
    }
    cons ()
    console.log(data)
    console.log(totalCount)
    console.log(totalPages)
    if(nameRepo === ''){
      setCurrentPage(1)
    }else{
      setCurrentPage(parseInt(localStorage.getItem('currentPage')!) || 1)
    }
    
  },[data, nameRepo, totalCount, totalPages])

  useEffect(() => {
    localStorage.setItem('nameRepo', nameRepo);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [nameRepo, currentPage])
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <input type='text' value={nameRepo} onChange={(e) => setNameRepo(e.target.value)} /> 
        <button type='button' > Search</button>
      </div>

      {loading ? (<p>Loading...</p>) : (
        data.search.edges.slice((currentPage - 1) * limit, currentPage * limit).map((data:any, index:number) =>
        <ul key={data.node.id}>
        <li>{index + ((currentPage - 1) * limit)} Name: {data.node.name}</li>
        {/* <li>Link:<a href={data.node.url}>Ссылка</a></li>
        <li>Stars GitHub:{data.node.stargazers.totalCount}</li>
        <li> Data commit: {data.node.pushedAt}</li> */}
      </ul>
        )
      )}

      
        
{loading ? (<p>Loading...</p>) : (
      pageArray.map((pageNumber:number) => 
        <button 
           key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      )
    )}
    </div>
  )
}
export default App
