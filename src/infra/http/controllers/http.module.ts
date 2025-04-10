import { Module } from '@nestjs/common'
import { CreateAccountController } from './create-account.controller'
import { AuthenticateController } from './authenticate.controller'
import { CreateQuestionController } from './create-question.controller'
import { FetchRecentQuestionsController } from './fetch-recent-questions.controller'
import { PrismaService } from '@/infra/prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
