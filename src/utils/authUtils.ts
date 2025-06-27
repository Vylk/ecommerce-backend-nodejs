import jwt from 'jsonwebtoken'
import {KeyObject} from 'crypto'

import {V4} from 'paseto'

const createTokenPair = async (payload: any, publicKey : KeyObject, privateKey: string) => {
    try {
        const accessToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })
        // const accessToken = await V4.sign(payload,privateKey, {
        //     expiresIn: '2 days'
        // })
        // const refreshToken = await V4.sign(payload, privateKey, {
        //     expiresIn: '7 days'
        // })
        const refreshToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        jwt.verify(accessToken,publicKey, (err, decode)=> {
            if(err){
                console.log('error verify',err)
            } else {
                console.log('Decode', decode)
            }
        })
        // const decode = await V4.verify(accessToken, publicKey)
        // if(decode){
        //     console.log('Decode', decode)
        // }
        // console.log(accessToken)
        return {accessToken, refreshToken}
    } catch (error) {
        
    }
}

export {
    createTokenPair
}