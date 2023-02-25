import { createBrowserRouter, redirect } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "../views/Home"
import ProductDetail from "../views/ProductDetail"
import Favorite from "../views/Favorite"
import Login from "../views/Login"
import Register from "../views/Register"

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/detail/:id',
                element: <ProductDetail/>
            },
            {
                path: '/favorite',
                loader: () => {
                    const isAuth = localStorage.getItem("access_token")
                    if(!isAuth){
                        throw redirect("/login")
                    }
        
                    return null
                },
                element: <Favorite/>
            },
        ]
    },
    {
        path: '/login',
        loader: () => {
            const isAuth = localStorage.getItem("access_token")
            if(isAuth){
                throw redirect("/")
            }

            return null
        },
        element: <Login/>
    },
    {
        path: '/register',
        loader: () => {
            const isAuth = localStorage.getItem("access_token")
            if(isAuth){
                throw redirect("/")
            }

            return null
        },
        element: <Register/>
    }
])

export default router