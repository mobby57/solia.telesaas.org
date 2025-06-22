declare module 'bcryptjs' {
  interface Bcrypt {
    hash(s: string, salt: number): Promise<string>;
    compare(s: string, hash: string): Promise<boolean>;
  }
  const bcrypt: Bcrypt;
  export default bcrypt;
}
