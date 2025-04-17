import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { Encrypter } from '@/domain/forum/cryptography/encrypter'
import { HasherComparer } from '@/domain/forum/cryptography/hasher-comparer'
import { BcryptHasher } from './bcrypt-hasher'
import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HasherComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HasherGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HasherComparer, HasherGenerator],
})
export class CryptographyModule {}
