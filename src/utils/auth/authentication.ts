import {  Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import { HEADERS } from "../../contants";
import { AuthFailureError, NotFoundError } from "../response/errorResponse";
import KeyTokenService from "../../services/key-token.service";
import { verifyToken } from ".";
import { AuthRequest } from "./checkAuth";
import logger from "../../libs/logger";

const authentication = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {

  const userId = req.headers[HEADERS.CLIENT_ID]

  if (!userId) throw new AuthFailureError('Invalid Request!')

  const keyStore = await KeyTokenService.findByUserId({ userId })
  if (!keyStore) throw new  NotFoundError('Not Found KeyStore!')

  const accessTokenHeader = req.headers[HEADERS.AUTHORIZATION];
  const accessToken = Array.isArray(accessTokenHeader) ? accessTokenHeader[0] : accessTokenHeader;
  if (!accessToken) throw new AuthFailureError('Invalid Request!');

    try {
      const decoded = verifyToken(accessToken, keyStore.publicKey)
      if(userId!== decoded.payload.userId) throw new AuthFailureError('Invalid Request!')

        req.keyStore = keyStore
        next()
    } catch (error) {
      logger.error(error)
    }
})


export { authentication}
