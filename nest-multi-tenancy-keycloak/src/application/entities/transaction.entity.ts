export interface TransactionProps {
    id?: number;
    type: string;
    amount: string;
    brand: string;
    tenant_id?: string
  }
  
  export class Transaction {
    private _id: number;
    private props: TransactionProps;
  
    constructor(props: TransactionProps, id?: number) {
      this._id = id;
      this.props = { ...props };
    }
  
    public get id(): number {
      return this._id;
    }
  
    public set type(type: string) {
      this.props.type = type;
    }
  
    public get type(): string {
      return this.props.type;
    }
  
    public set brand(brand: string) {
      this.props.brand = brand;
    }
  
    public get brand(): string {
      return this.props.brand;
    }
  
    public set amount(amount: string) {
      this.props.amount = amount;
    }
  
    public get amount(): string {
      return this.props.amount;
    }
  
    public set tenant_id(tenant_id: string) {
      this.props.tenant_id = tenant_id;
    }
  
    public get tenant_id(): string {
      return this.props.tenant_id;
    }
  }
  