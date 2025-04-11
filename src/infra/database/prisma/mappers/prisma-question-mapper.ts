import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(rawQuestion: PrismaQuestion): Question {
    const {
      title,
      content,
      authorId,
      bestAnswerId,
      slug,
      createdAt,
      updatedAt,
    } = rawQuestion

    return Question.create(
      {
        title,
        content,
        authorId: new UniqueEntityId(authorId),
        bestAnswerId: bestAnswerId ? new UniqueEntityId(bestAnswerId) : null,
        slug: Slug.create(slug),
        createdAt,
        updatedAt,
      },
      new UniqueEntityId(rawQuestion.id),
    )
  }
}
