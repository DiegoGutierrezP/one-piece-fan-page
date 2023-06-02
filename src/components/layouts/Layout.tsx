import Head from "next/head";
import { FC, PropsWithChildren } from "react"
import { MyNavbar } from ".";

interface Props extends PropsWithChildren{
    title:string;
}

export const Layout : FC<Props>  = ({children, title}) => {
  return (
    <>
        <Head>
            <title>{title || 'One Piece Movies'}</title>
            <meta name="author" content="Diego Gutierrez" />
            <meta name="keywords" content="XX, anime , one piece, movie" />


        </Head>

        <MyNavbar/>

        <main style={{
            padding:'0px 20px'
        }}>
            {children}
        </main>

    </>
  )
}
