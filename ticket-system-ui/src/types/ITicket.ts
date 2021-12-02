export interface ITicket {
    id: number;
    title: string;
    user: string;
    message: string;
    status: string;
    isOpen: boolean;
    createdAt: string;
    updatedAt: string;
}
