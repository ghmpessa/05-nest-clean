import { hash, compare } from 'bcryptjs'
import { HasherComparer } from '@/domain/forum/cryptography/hasher-comparer'
import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'

export class BcryptHasher implements HasherGenerator, HasherComparer {
  private HASH_SALT_LENGTH = 8

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT_LENGTH)
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash)
  }
}
