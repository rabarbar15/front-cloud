import { Col, Row } from "react-bootstrap"
import { Item } from '../components/Item'
import { useFetchBooks } from "../data/FetchData"
import { Link } from "react-router-dom";



export const Books = () => {
    const { books, error } = useFetchBooks();
    
    return (
    <>
        <h1 className="mb-3">Books</h1>
        {books && books.length > 0 ? (<Row sm={2} xs={1} md={2} lg={3} xl={4} className='g-5'>
            {books.map((book: any) => (
                <Col key={book.id}><Item {...book} /></Col>
            ))}
        </Row>) : error && error.message ? (
            <h4 style={{ textAlign: 'center' }}><Link to={'/login'}>Sign in</Link> to see this page</h4>
        ) : (
            <div>No books available</div>
        )}
    </>
  )
}

export default Books