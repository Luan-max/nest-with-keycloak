export interface UserProps {
  username: string;
  email: string;
  tenant_id: string;
  password: string;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: UserProps, id?: number) {
    this._id = id;
    this.props = { ...props };
  }

  public get id(): number {
    return this._id;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username(): string {
    return this.props.username;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set tenant_id(tenant_id: string) {
    this.props.tenant_id = tenant_id;
  }

  public get tenant_id(): string {
    return this.props.tenant_id;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }
}
