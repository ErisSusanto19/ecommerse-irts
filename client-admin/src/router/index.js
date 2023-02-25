import { createBrowserRouter, redirect } from "react-router-dom"
import Layout from "../components/Layout"
import Dashboard from "../views/Dashboard"
import Login from "../views/Login"
import User from "../views/User"
import FormAdmin from "../views/FormAdmin"
import ProductModal from "../components/ProductModal"

const router = createBrowserRouter([
    {
        element: <Layout/>,
        loader: () => {
            const isAuth = localStorage.getItem("access_token")
            if(!isAuth){
                throw redirect("/login")
            }

            return null
        },
        children: [
            {
                path: '/',
                element: <Dashboard/>,
                children: [
                    {
                      path: "/add-product",
                      element: (
                        <ProductModal method="POST" modalTitle="Add Product" text="Create" />
                      ),
                    },
                    {
                      path: "/:id/edit-product",
                      element: (
                        <ProductModal method="PUT" modalTitle="Edit Product" text="Update" />
                      ),
                    },
                  ],
            },
            {
                path: '/users',
                element: (
                    <User/>
                )
            },
            {
                path: '/form-admin',
                element: (
                    <FormAdmin/>
                )
            }
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
        element: (
            <Login/>
        )
    }
])

export default router