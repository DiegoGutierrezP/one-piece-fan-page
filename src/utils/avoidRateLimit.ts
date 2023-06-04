export function avoidRateLimit(delay = 500) {
    // if (!process.env.IS_BUILD) {
    //   return
    // }

    if (!(process.env.NODE_ENV === 'production')){
        return
    }
  
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }