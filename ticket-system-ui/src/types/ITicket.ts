import { IUser } from "./IUser";
export interface ITicket {
    id: number;
    title: string;
    message: string;
    status: string;
    priority: string;
    comments?: { id: number; message: string; createdAt: string }[];
    createdAt: string;
    updatedAt: string;
    user: IUser;
    asignee: IUser;
}
