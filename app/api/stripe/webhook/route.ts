import { webhookHandler } from '../checkout-session/route';
import { NextRequest } from 'next/server';
 
export async function POST(req: NextRequest) {
  return webhookHandler(req);
} 