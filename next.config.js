/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{ //las imagenes que quiero que sean permitidas y next no se queje(mande error)
    domains:['cdn.myanimelist.net']
  }
}

module.exports = nextConfig
