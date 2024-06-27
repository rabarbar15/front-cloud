import { Button, Container, Nav, NavDropdown, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { CiShoppingCart } from "react-icons/ci";
import { getUser, logout, useFetchAuth } from '../data/FetchData';


export const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()
  const { authorized } = useFetchAuth()
  const { email } = getUser()  
  
  const handleLogout = () => {

    try {
      logout()
      location.assign('/login')
    } catch(err) {
      console.error('Error while logging out:', err);
    }

  }

  return <NavbarBs sticky='top' bg="dark" data-bs-theme="dark" className=' shadow-lg mb-3 pb-2'>
    <Container>
        <NavbarBs.Brand className='fs-3'>Books.com</NavbarBs.Brand>
        <Nav className='me-auto'>
          <Nav.Link to="/books" as={NavLink}>Books</Nav.Link>
          <Nav.Link to="/payments" as={NavLink}>Payments</Nav.Link>
        </Nav>
        <p></p>
        <Nav className='ml-auto'>
            {!authorized ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title='My Account'
              menuVariant="dark"
            >
              <NavDropdown.Item to="/login" as={NavLink} href="#action/3.3">Login</NavDropdown.Item>
              <NavDropdown.Item to="/signup" as={NavLink} href="#action/3.4">Sign Up</NavDropdown.Item>

            </NavDropdown>) : (
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={email}
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={handleLogout} as={Button} href="#action/3.3">Sign out</NavDropdown.Item>
                <NavDropdown.Item to="/orders" as={NavLink} href="#action/3.4">My orders</NavDropdown.Item>

              </NavDropdown>
            )}
        </Nav>
        
        <Button onClick={ openCart } className='btn-light' style={{ marginLeft: "2rem", borderRadius: '30px', border: '1px solid black', padding: '0.5rem 0.6rem' }}>
          
          <CiShoppingCart size='1.7rem' color='black'/>

          <div 
            className='rounded-circle bg-danger d-flex justify-content-center align-items-center' 
            style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", transform: "translate(80%, -25%)"}}
            >
              { cartQuantity }
          </div>
          
        </Button>
        
    </Container>
  </NavbarBs>
}
