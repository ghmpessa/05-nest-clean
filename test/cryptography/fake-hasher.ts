import { HasherComparer } from '@/domain/forum/cryptography/hasher-comparer'
import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'

export class FakeHasher implements HasherGenerator, HasherComparer {
  async hash(plainText: string): Promise<string> {
    return plainText.concat('-hashed')
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return plainText.concat('-hashed') === hash
  }
}
