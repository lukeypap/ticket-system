import { IconType } from "react-icons";

type HeaderItem = {
    type: "header";
};

type LinkItem = {
    type: "link";
    icon: IconType;
    href: string;
};

type ItemTypeProps = HeaderItem | LinkItem;

export type NavItem = ItemTypeProps & {
    label: string;
};
