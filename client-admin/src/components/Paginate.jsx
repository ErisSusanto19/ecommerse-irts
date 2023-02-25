// import Pagination from 'react-bootstrap/Pagination';

export default function Paginate({limitPerPage, totalProduct, changePage}){

    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalProduct/limitPerPage) ; i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => changePage(number)} href='/' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )

}