import { Link } from 'react-router-dom';
import { useFetchOrders } from '../data/FetchData'
import { formatCurrency } from '../utilities/formatCurrency'
import { formatDate } from '../utilities/formatDate';


export default function Orders() {
    // const [open, setOpen] = useState(false);

    const {orders} = useFetchOrders()
    console.log(orders);
    
    const hasOrders = orders && orders.length > 0;
    
  return (
    <div>
        
        <h3 className='m-4'>My orders</h3>

        {hasOrders ? (<table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Items</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                
                </tr>
            </thead>
            <tbody>
                
                {orders.map((order, index) => (
                    <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.address}</td>
                        <td><Link to={`/orderItems/${order.id}`}>See items</Link></td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{formatCurrency(order.price)}</td>
                        <td>Pending</td>
                    </tr>
                ))
                }
                
                
            </tbody>
        </table>) : (
            <h4>You haven't made any orders yet</h4>
        )}

    </div>
  )
}
