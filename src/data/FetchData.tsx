import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchBooks = () => {
    const [books, setBooks] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        
        axios.get('http://localhost:3003/books', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                // console.log(response.data);
                
                setBooks(response.data);
            })
            .catch(error => {
                setError(error.response.data)
                console.error('Error fetching data', error)
            })
    }, [])

    return { books, error };
}


export const useFetchAuth = () => {
    const [authorized, setAuthorized] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        
        axios.get('http://localhost:3003/authConfirm', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        
            .then(response => {
                // console.log(response.data);
                
                setAuthorized(response.data);
            })
            .catch(error => {
                setError(error.response.data)
                console.error('Error fetching data', error)
            })
    }, [])

    return { authorized, error };
}

interface Book {
    id: number
    quantity: number
}

type Order = {
    id: number,
    address: String,
    books: Book[],
    price: number,

}

export const createOrder = (order: Order) => {
    // console.log(order);
    
    axios.post('http://localhost:3003/orders', order, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then(response => {
            console.log("Order created succesfully", response.data);
        })
        .catch(err => {
            console.error("Error while create an order", err);
            
        })
}

type OrderFetch = {
    id: number,
    address: String,
    // books: Book[],
    price: number,
    createdAt: string
}

export const useFetchOrders = () => {

    const [orders, setOrders] = useState<OrderFetch[]>()

    useEffect(() => {
        axios.get(`http://localhost:3003/orders`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
            setOrders(response.data)
        })
        .catch(err => {
            console.error('Error while fetching orders: ', err);
        })
    }, [])
    return {orders}
}



type OrderItem = {
    id: number,
    bookId: number,
    quantity: number
}

export const useFetchOrderItems = (orderId: number) => {

    const [items, setItems] = useState<OrderItem[]>()

    useEffect(() => {
        axios.get(`http://localhost:3003/orderItems/${orderId}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
            setItems(response.data)
        })
        .catch(err => {
            console.error('Error while fetching items: ', err);
        })
    }, [])
    return {items}
    
}

export const signup = (email: String, password: String, callback: (response: any) => void) => {

    const user = JSON.stringify({
        email: email,
        password: password
    })

    axios.post('http://localhost:3003/signup', user, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then(response => {
            // console.log(response.data);
            callback(response.data)
            console.log("User created succesfully", response.data);

        })
        .catch(err => {
            console.log("Error while signing up", err);
            // console.log(err.response.data.errors);
            callback(err.response.data.errors)
            throw err.response.data
        })
}

export const signin = (email: string, password: string, callback: (response: any) => void) => {
    const user = JSON.stringify({
        email: email,
        password: password
    })

    axios.post('http://localhost:3003/signin', user, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
        .then(response => {
            // console.log(response.data);
            callback(response.data)
            console.log('User logged in succesfully');
        })
        .catch(err => {
            console.log("Error while create an order", err);
            // console.log(err.response.data.errors);
            callback(err.response.data.errors)
            throw err.response.data
        })
}

export const logout = () => {
    axios.get('http://localhost:3003/logout', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
}

interface User {
    id: number;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }

export const getUser = () => {
    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        axios.get('http://localhost:3003/user', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(response => {
            // console.log(response.data);
            
            setUser(response.data);
        })
        .catch(error => {
            console.error('Error fetching user', error)
        })
    }, [])
    
    return {...user}
}