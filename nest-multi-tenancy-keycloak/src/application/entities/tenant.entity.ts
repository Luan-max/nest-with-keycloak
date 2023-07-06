export interface TenantProps {
  id?: number;
  subdomain: string;
  name: string;
  secretKey: string;
}

export class Tenant {
  private _id: number;
  private props: TenantProps;

  constructor(props: TenantProps, id?: number) {
    this._id = id;
    this.props = { ...props };
  }

  public get id(): number {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set subdomain(subdomain: string) {
    this.props.subdomain = subdomain;
  }

  public get subdomain(): string {
    return this.props.subdomain;
  }

  public set secretKey(secretKey: string) {
    this.props.secretKey = secretKey;
  }

  public get secretKey(): string {
    return this.props.secretKey;
  }
}
