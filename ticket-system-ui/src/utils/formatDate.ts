import { format, formatDistance, formatDistanceStrict } from "date-fns";

export const formatDate = (time: string | number | Date) => {
    //format(new Date(time), "Pp");
    return formatDistanceStrict(new Date(time), new Date(), { addSuffix: true });
};
