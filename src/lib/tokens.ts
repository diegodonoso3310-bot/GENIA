import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';

export type AccessTokenPayload = {
  sub: string;
  sessionId: string;
  companyId: string;
  email: string;
};

export const createTokenId = (): string => randomUUID();

export const signAccessToken = (payload: AccessTokenPayload): string =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    issuer: env.JWT_ISSUER,
    expiresIn: env.ACCESS_TOKEN_TTL,
    subject: payload.sub,
    jwtid: payload.sessionId,
  });
