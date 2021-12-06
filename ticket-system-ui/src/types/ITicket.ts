export interface ITicket {
    id: number;
    title: string;
    user: string;
    message: string;
    status: string;
    isOpen?: boolean;
    comments?: { id: number; message: string; createdAt: string }[];
    createdAt: string;
    updatedAt: string;
}
