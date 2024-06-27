import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    clearCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}



const ShoppingCartContext = createContext({} as
    ShoppingCartContext
)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider( { children }: ShoppingCartProviderProps ) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    } 

    useEffect(() => {
        const initialCartItems = JSON.parse(document.cookie.split(';').find(cookie => cookie.trim().startsWith('cartItems='))?.split('=')[1] || '[]');
        // console.log("Initial cart items:", initialCartItems);
        setCartItems(prevCartItems => initialCartItems.length ? initialCartItems : prevCartItems);
    }, [])

    useEffect(() => {
        // console.log("Cart items:", cartItems);
        document.cookie = `cartItems=${JSON.stringify(cartItems)}; expires=${new Date(new Date().getTime() + 6000)}; path=/`;
      }, [cartItems])
    

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    function clearCart() {
        setCartItems([])
    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, clearCart, cartItems, cartQuantity, }}>
        {children}

        <ShoppingCart isOpen={isOpen}></ShoppingCart>
    </ShoppingCartContext.Provider>
}

