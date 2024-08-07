export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly verificationStatus: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly favouriteCities?: { cityname: string }[],
  ) {}
}
