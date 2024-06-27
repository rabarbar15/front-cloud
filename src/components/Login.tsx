
import { useRef } from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap' 
import { Link } from 'react-router-dom'
import { signin } from '../data/FetchData'
import { useState } from 'react'

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [emailError, setEmailError] = useState<any>('')
    const [passwordError, setPasswordError] = useState<any>('')
    const [error, setError] = useState<string | null>(null);

    const handleSignupResponse = (response: any) => {
        if (response.email) {
            setEmailError(response.email)

        } else if (response.password) {
            setPasswordError(response.password)

        } 

        if (response.user) {
            location.assign('/books')
            console.log('niby ok ale nie');
            
        }
        
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setEmailError('')
        setPasswordError('')

        const email = emailRef.current?.value
        const password = passwordRef.current?.value


        if (!email || !password ) {
            alert("All fields are required!")
            return
        }

        try {
            signin(email, password, handleSignupResponse)
        } catch (err) {
            console.error(err);
            setError('Error connecting to a database')
            console.error(error);
            
        }

        // console.log("Email:", email)
        // console.log("Password:", password)

    }

  return (
    <>
        <Container 
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: "80vh" }}
        >
            <div style={{ width: '35%', minWidth: '20rem' }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign In</h2>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <div 
                                style={{ fontSize: '0.8rem', textAlign: 'left', paddingBottom: '1rem', color: '#de0446' }} 
                                className='w-100 emailError'
                            >{emailError}</div>
                            {!emailError && <br />}

                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <div 
                                style={{ fontSize: '0.8rem', textAlign: 'left', paddingBottom: '1rem', color: '#de0446' }} 
                                className='w-100 passwordError'
                            >{passwordError}</div>
                            {!passwordError && <br />}

                            <Button className='w-100' type='submit'>Sign in</Button>
                        </Form>

                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link style={{ textDecoration: 'none' }} to={'/signup'}>Sign up</Link>  
                </div>
            </div>
        </Container>
    </>
  )
}
