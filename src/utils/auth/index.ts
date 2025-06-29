import JWT from "jsonwebtoken"
const createTokenPair = async(payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload,privateKey, {
      algorithm: "RS256",
      expiresIn: "3d"
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d"
    })

    // JWT.verify(accessToken, publicKey, (error, decode)=> {
    //   if(error) {
    //     console.log(error)
    //   } else{
    //     console.log(decode)
    //   }

    // })
    return {accessToken, refreshToken}
  } catch (error) {
    return error
  }
}


export {createTokenPair}
