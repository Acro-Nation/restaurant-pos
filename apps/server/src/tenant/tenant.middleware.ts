import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['tenant-id']

    if (!tenantId || typeof tenantId !== 'string') {
      throw new UnauthorizedException('No tenant ID provided')
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    })

    if (!tenant) {
      throw new UnauthorizedException('Invalid tenant')
    }

    req['tenantId'] = tenantId // Attach tenant ID to the request for later use
    next()
  }
}
