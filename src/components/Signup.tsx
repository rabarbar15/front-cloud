
import { useRef, useState } from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap' 
import { Link } from 'react-router-dom'
import { signup } from '../data/FetchData'

export default function Singup() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const [emailError, setEmailError] = useState<any>('')
    const [passwordError, setPasswordError] = useState<any>('')

    const handleSignupResponse = (response: any) => {
        if (response.email && response.password) {
            setEmailError(response.email)
            setPasswordError(response.password)

        } else if (response.email) {
            setEmailError(response.email)

        } else if (response.password) {
            setPasswordError(response.password)

        } else if(response.user) {
            location.assign('/books')
        }
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setEmailError('')
        setPasswordError('')

        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        const passwordConfirm = passwordConfirmRef.current?.value

        if (!email || !password || !passwordConfirm) {
            alert("All fields are required!")
            return
        }

        if (password !== passwordConfirm) {
            alert('Passwords do not match!')
            return
        }

        try {
            signup(email, password, handleSignupResponse)
        } catch (err) {
            console.error(err)
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
                        <h2 className="text-center mb-4">Sign Up</h2>
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

                            <Form.Group id='password-confirm'>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type='password' ref={passwordConfirmRef} required />
                            </Form.Group>
                            <br />

                            <Button className='w-100' type='submit'>Sign up</Button>
                        </Form>
                        
                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Already have an account? <Link style={{ textDecoration: 'none' }} to={'/login'}>Sign in</Link>  
                </div>
            </div>
        </Container>
    </>
  )
}
