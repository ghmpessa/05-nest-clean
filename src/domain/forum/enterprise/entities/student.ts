import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface StudentProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.name
  }

  get email() {
    return this.email
  }

  get password() {
    return this.password
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id)

    return student
  }
}
