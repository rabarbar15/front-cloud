import { useParams } from 'react-router-dom'
import { useFetchBooks, useFetchOrderItems } from '../data/FetchData'
import { formatCurrency } from '../utilities/formatCurrency'
import { CloseButton } from 'react-bootstrap'


export default function OrderItems() {

    const { id } = useParams()
    const {items} = useFetchOrderItems(parseInt(id || ''))
    const {books} = useFetchBooks()
    // console.log(items);

    const redirect = () => {
        location.assign('/orders')
    }
    
    const hasItems = items && items.length > 0 && books;
    
  return (
    <div>
        <h3 className='m-4'>Order # {id}</h3>
        
        {hasItems ? (<table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col"><CloseButton onClick={redirect}/></th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>

                
                </tr>
            </thead>
            <tbody>
               
                {items.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{books[item.bookId] ? books[item.bookId].title : 'Something went wrong'}</td>
                        <td>{books[item.bookId] ? books[item.bookId].author: 'Something went wrong'}</td>
                        <td>{item.quantity}</td>
                        <td>{books[item.bookId] ? formatCurrency(books[item.bookId].price) : 'Something went wrong'}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>) : (
            <h4>Empty</h4>
        )}

    </div>
  )
}
