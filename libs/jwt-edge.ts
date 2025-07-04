// utils/jwt-edge.ts
import { SignJWT, jwtVerify } from 'jose'
import type { JWTPayload } from 'jose'
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret')



export async function generateToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (e) {
    return null
  }
}
