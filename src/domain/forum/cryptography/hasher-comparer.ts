export abstract class HasherComparer {
  abstract compare(plainText: string, hash: string): Promise<boolean>
}
