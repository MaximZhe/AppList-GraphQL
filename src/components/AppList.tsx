import { useEffect, useState } from 'react'
import {GET_REPOSITORIES} from '../query/query'
import { useQuery } from '@apollo/client'
import { getPageCount, getPagesArray} from '../utils/pagesCount.tsx';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDatas, setOneRepoName, setOneRepoOwner } from '../features/datas/datasSlice.tsx';
import { setCurrentPage } from '../redux/slice/paginationSlice.tsx';



function AppList() {
  const dispatch = useDispatch()
  const limit = 10;
  
  const [nameRepo, setNameRepo] = useState(localStorage.getItem('nameRepo') || '')
  const [first, setFirst] = useState(100)
  const [after, setAfter] = useState( )
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')!) || 1)
  const [totalCount,setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const {data, loading, error} = useQuery(GET_REPOSITORIES, {
    variables: {name: nameRepo, first:first,after: after}
    
  })

  const pageArray = getPagesArray(totalPages)
  
  const handleLinkClick = (name:string,owner:string) => {
    dispatch(setOneRepoOwner(owner));
    dispatch(setOneRepoName(name));
  };
 
    // const currentPage = useSelector((state:any) => state.pagination.currentPage);
  
  
    
  
 
  
  const dat = useSelector((state:any) => state.datas.datas)
  if(data){
    console.log(dat)
  }
  useEffect(() => {
    function cons () {
      if(data !== undefined){
        const totalRepo = data.search.edges
        dispatch(setDatas(totalRepo))
        const totalCount = data ? data.search.edges.length : 0;
        // setTotalCount(totalRepo.length);
        setTotalPages(getPageCount(totalCount,limit))
      }else{
        return null
      }
      
    }
    cons ()
    
    
    console.log(totalPages)
    if(nameRepo === ''){
      setCurrentPage(1)
    }else{
      setCurrentPage(parseInt(localStorage.getItem('currentPage')!) || 1)
    }
    
  },[data, dispatch, nameRepo, totalPages])
  
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
        <li>{index + ((currentPage - 1) * limit)} 
        <Link to={`/repos/${data.node.id}`} onClick={() => handleLinkClick(data.node.name, data.node.owner.login)}>Name: {data.node.name}</Link>
        </li>
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
export default AppList
