import { Address } from '../models/address';

export class Users {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
}
