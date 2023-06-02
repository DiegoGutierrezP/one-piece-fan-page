import React from 'react'
import { Button, Link, Navbar, Text, useTheme } from "@nextui-org/react";
import Image from 'next/image';

import NextLink from 'next/link'

export const MyNavbar = () => {
  const {theme} = useTheme();
  return (
    <div style={{background:theme?.colors.gray100.value}} className='flex w-full items-center justify-start py-1 px-6' >
      <div className='flex items-center '>
        <Image
          src='/imgs/logo-onepiece.png'
          alt='logo one piece'
          width={65}
          height={65}
          className='mr-2'
        />

        <NextLink href='/' passHref legacyBehavior>
          <Link>
          <h2 className='text-2xl text-white'>One Piece Movies</h2>
          </Link>
        </NextLink>
      </div>
      

    </div>
  )
}
