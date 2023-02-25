import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteProduct } from '../store/actions/product/actionCreator';

export default function ProductRow({product}){
    const formatPrice = () => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(product.price)
    }

    const dispatch = useDispatch()

    const deleteClicked = () => {
        dispatch(deleteProduct(product.id))
    }

    return (
        <>
        <tr>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{formatPrice()}</td>
            <td>{product.brand? product.brand : "Unknown"}</td>
            <td>
                <img className="img-fluid" width={180} alt="" src={product.image} />
            </td>
            <td>{product.info? product.info : "Unknown"}</td>
            <td>
                <Button as={Link} to={`${product.id}/edit-product`} variant="primary" size='sm' className="mx-2">Edit</Button>
                <Button onClick={deleteClicked} variant="danger" size='sm'>Delete</Button>
            </td>
        </tr>
        </>
    )
}