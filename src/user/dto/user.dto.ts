export class UserDto {
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly courses?: string[];
}
