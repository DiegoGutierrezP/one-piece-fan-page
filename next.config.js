/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{ //las imagenes que quiero que sean permitidas y next no se queje(mande error)
    domains:['cdn.myanimelist.net']
  },
  experimental:{
    workerThreads:false,
    cpus: 1,
  }
}

module.exports = nextConfig
