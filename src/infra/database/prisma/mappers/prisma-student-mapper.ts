import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { Prisma, User as PrismaStudent } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(rawStudent: PrismaStudent): Student {
    const { id, name, email, password } = rawStudent

    return Student.create(
      {
        name,
        email,
        password,
      },
      new UniqueEntityId(id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    const { id, name, email, password } = student

    return {
      id: id.toString(),
      name,
      email,
      password,
    }
  }
}
