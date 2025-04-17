import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashGenerator: HasherGenerator,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const emailAlreadyExists = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (emailAlreadyExists) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
