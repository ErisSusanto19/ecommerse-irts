import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ProductRow from '../components/ProductRow';
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from '../store/actions/product/actionCreator';
import ReactPaginate from 'react-paginate';

export default function Dashboard(){
    const dispatch = useDispatch()
    const products =  useSelector(state => {
        return state.product.products
    })
    // console.log(products, '<<<< from dahsboard');

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])

    //Pagination needs
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    //End Pagination needs

    const row = currentItems.map((product) => {
        return <ProductRow key={product.id} product={product}/>
    })

    return(
        <>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-2">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Menu List</h1>
                <Button as={Link} to='/add-product' variant="primary">Add New Menu</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Image</th>
                        <th>Info</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </Table>

            <Outlet/>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-link'
                previousLinkClassName='page-link'
                nextLinkClassName='page-link'
                activeLinkClassName='active'
            />
        </div>
        </>
    )
}