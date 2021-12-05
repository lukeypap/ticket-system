export interface ITicket {
    id: number;
    title: string;
    user: string;
    message: string;
    status: string;
    isOpen: boolean;
    comments: [];
    createdAt: string;
    updatedAt: string;
}
