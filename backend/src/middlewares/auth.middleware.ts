import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

dotenv.config();

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. Unauthorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = {
      id: decoded.id as string,
      email: decoded.email as string,
      role: decoded.role as string,
    };

    next();
  } catch (error) {
    console.error("JWT verification error:", error instanceof Error ? error.message : error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;