import { Session } from "@ory/client";
import { oryApi } from "./oryApi";
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { AxiosError } from "axios";
import { UserCartItem, UserItem } from "./types/UserItem";

export interface UserState {
    session: Session | null;
    logoutUrl: string | null;
    cart: UserCartItem[];
    favorites: UserItem[];
    notificated: UserItem[];
}

async function getUserSession(): Promise<Session | null> {
    try {
        const response = await oryApi.toSession()
        const session = response.data
        return session
    } catch(error) {
        if ((error as AxiosError).response?.status === 401) {
            return null
        } else {
            if ((error as AxiosError).message) {
                console.warn((error as AxiosError).message)
            }
            return null
        }
    } 
}

function getLocalCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}

function getLocalFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

type UserAction =
    | { type: 'SET_SESSION'; payload: Session | null }
    | { type: 'UPDATE_CART'; payload: UserCartItem[] }
    | { type: 'UPDATE_FAVORITES'; payload: UserItem[] };

const initialUserState = {
    session: null,
    logoutUrl: null,
    cart: [],
    favorites: [],
    notificated: []
};

const UserContext = createContext<{
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
    setup: () => void;
    addToCart: (id: string) => void;
    deleteCartItem: (id: string) => void;
    incrementCartItem: (id: string) => void;
    decrementCartItem: (id: string) => void;
    toggleFavorite: (id: string) => void;
}>({
    state: initialUserState,
    dispatch: () => null,
    setup: () => { },
    addToCart: () => { },
    deleteCartItem: () => { },
    incrementCartItem: () => { },
    decrementCartItem: () => { },
    toggleFavorite: () => { },
});

function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case 'SET_SESSION':
            return { ...state, session: action.payload };
        case 'UPDATE_CART':
            return { ...state, cart: action.payload };
        case 'UPDATE_FAVORITES':
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
}

interface ProviderProps {
    children: ReactNode;
}
// UserProvider component
const UserProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    useEffect(() => {
        setup();
    }, []);

    const setup = async () => {
        const session = await getUserSession();
        let cart = [];
        let favorites = [];
        let notificated = [];

        // TODO: if user logged in, merge local and backend states - cart, favorites, notificated
        if (session) {
            const userMeta = session.identity?.metadata_public
            // TODO: parse user meta to get cart and others
        } else {
            cart = getLocalCart()
            favorites = getLocalFavorites()
        };
        dispatch({ type: 'SET_SESSION', payload: session });
        dispatch({ type: 'UPDATE_CART', payload: cart });
        dispatch({ type: 'UPDATE_FAVORITES', payload: favorites });
    }

    const addToCart = async (id: string) => {
        const isInCart = state.cart.some((cartItem) => cartItem.id === id )
        console.log(isInCart)
        const updatedCart = isInCart
            ? [...state.cart]
            : [...state.cart, { id, quantity: 1 }];

        if (state.session) {
            // TODO: Make a backend request to add to cart
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        };
        dispatch({ type: 'UPDATE_CART', payload: updatedCart });
    };

    const deleteCartItem = async (id: string) => {
        const updatedCart = state.cart.filter((cartItem) => cartItem.id !== id );
        if (state.session) {
            // TODO: Make a backend request to delete from cart
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        dispatch({ type: 'UPDATE_CART', payload: updatedCart });
    }

    const incrementCartItem = async (id: string) => {
        const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        if (state.session) {
            // TODO:  Make a backend request to update cart
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        dispatch({ type: 'UPDATE_CART', payload: updatedCart });
    }

    const decrementCartItem = async (id: string) => {
        const cartItem = state.cart.find((cartItem) => cartItem.id === id);
        if (!cartItem) {
            return;
        }
        if (cartItem.quantity === 1) {
            return;
        }
        const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        if (state.session) {
            // TODO: Make a backend request to update cart
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        dispatch({ type: 'UPDATE_CART', payload: updatedCart });
    }

    const toggleFavorite = async (id: string) => {
        const updatedFavs = 
        state.favorites.some((fav) => fav.id === id )
            ? [...state.favorites.filter((fav) => fav.id !== id )]
            : [...state.favorites, { id }];
        console.log(updatedFavs)
        if (state.session) {
            // Make a backend request to add to favorites
        } else {
            localStorage.setItem('favorites', JSON.stringify(updatedFavs));
        }
        dispatch({ type: 'UPDATE_FAVORITES', payload: updatedFavs });
    };

    return (
        <UserContext.Provider value={{
            state, dispatch, setup, addToCart, deleteCartItem, incrementCartItem, decrementCartItem, toggleFavorite
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Export UserProvider and UserContext
export { UserContext, UserProvider };
