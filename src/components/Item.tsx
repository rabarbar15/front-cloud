import { Button, Card } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'

type ItemProps = {
    id: number
    title: string
    author: string
    price: number
    imgUrl: string
}

export const Item = ({id, title, author, price}: ItemProps) => {
  const { increaseCartQuantity } = useShoppingCart()
  const imgUrl = `http://localhost:3003/imgs/${id}`

  return <Card 
    style={{ width: "270px" }}
  >
    
    <Card.Img variant='top' src={imgUrl} height="410px" 
      style={{ objectFit: "cover" }} 
    />

    <Card.Body>

      <Card.Title className='d-flex flex-column mb-4 align-items-center'>
        <span className='fs-3 mb-2'>{title}</span>
        <span className='fs-5 mb-1 text-muted'>{author}</span>
        <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
      </Card.Title>

      <div className="mt-auto">
          <Button className='w-100 btn-success' onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
      </div>

    </Card.Body>
  </Card>
}
