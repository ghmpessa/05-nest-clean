import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRespository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentsRespository: InMemoryStudentsRespository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryStudentsRespository = new InMemoryStudentsRespository()
    sut = new RegisterStudentUseCase(inMemoryStudentsRespository, fakeHasher)
  })

  it('should be able to register a student', async () => {
    const result = await sut.execute({
      name: 'Gustavo',
      email: 'guga@email.com',
      password: 'password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRespository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Gustavo',
      email: 'guga@email.com',
      password: 'password',
    })

    const hashedPassword = await fakeHasher.hash('password')

    if (result.isRight()) {
      console.log(result.value.student.password)
    }

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRespository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
