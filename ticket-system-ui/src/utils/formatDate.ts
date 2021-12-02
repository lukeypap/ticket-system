import { format } from "date-fns";

export const formatDate = (time: string | number | Date) => {
    return format(new Date(time), "Pp");
};
