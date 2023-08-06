import { useEffect, useState } from 'react'
import { GET_REPOSITORIES } from '../../query/query.tsx'
import { useQuery } from '@apollo/client'
import { getPageCount, getPagesArray } from '../../utils/pagesCount.tsx';

import { useDispatch, useSelector } from 'react-redux';
import { setDatas, setSingleRepoData } from '../../redux/slice/datasSlice.tsx';
import './applist.scss'
import '../../index.css'
import ItemAppList from '../ItemAppList/ItemAppList.tsx';


function AppList() {
  const dispatch = useDispatch()
  const limit = 10;

  const [nameRepo, setNameRepo] = useState(localStorage.getItem('nameRepo') || '')
  const [first, setFirst] = useState(100)
  const [after, setAfter] = useState()
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')!) || 1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { name: nameRepo, first: first, after: after }

  })

  const pageArray = getPagesArray(totalPages)



  const dat = useSelector((state: any) => state.datas.datas)
  if (data) {
    console.log(dat)
  }
  useEffect(() => {
    function cons() {
      if (data !== undefined) {
        const totalRepo = data.search.edges
        dispatch(setDatas(totalRepo))
        const totalCount = data ? data.search.edges.length : 0;
        // setTotalCount(totalRepo.length);
        setTotalPages(getPageCount(totalCount, limit))
      } else {
        return null
      }

    }
    cons()


    console.log(totalPages)
    if (nameRepo === '') {
      setCurrentPage(1)
    } else {
      setCurrentPage(parseInt(localStorage.getItem('currentPage')!) || 1)
    }

  }, [data, dispatch, nameRepo, totalPages])

  useEffect(() => {
    localStorage.setItem('nameRepo', nameRepo);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [nameRepo, currentPage])

  return (
    <>
      <div className='search' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input className='search__input' type='text' value={nameRepo} onChange={(e) => setNameRepo(e.target.value)} />
        <button className='search__btn' type='button' > Search</button>
      </div>
      <div className='items'>
        {loading ? (<p>Loading...</p>) : (
          dat.slice((currentPage - 1) * limit, currentPage * limit).map((data: any, index: number) =>

            <ItemAppList key={data.node.id} data={data} />

          )
        )}
      </div>
      <div className='pagination'>
        {loading ? (null) : (
          pageArray.map((pageNumber: number) =>
            <button
              key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>

    </>
  )
}
export default AppList
