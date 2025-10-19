export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;
  start: string | Date;
  resort: string;
  perPerson: number;
  image?: string;
  description?: string;
}
