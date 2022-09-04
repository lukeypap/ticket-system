import { FaHome, FaCompass, FaMusic, FaUserAlt, FaHeart, FaDatabase } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { GiBackwardTime } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { BsBoxArrowLeft } from "react-icons/bs";
import { NavItem } from "../../types/nav-item";
import { IoTicketSharp } from "react-icons/io5";

export const navItems: NavItem[] = [
    {
        type: "link",
        href: "/",
        icon: FaHome,
        label: "Home",
    },
    {
        type: "header",
        label: "Queues",
    },
    {
        type: "link",
        href: "",
        icon: IoTicketSharp,
        label: "Open",
    },
    {
        type: "link",
        href: "",
        icon: IoTicketSharp,
        label: "Closed",
    },
    {
        type: "link",
        href: "",
        icon: IoTicketSharp,
        label: "Work in progress",
    },
    {
        type: "link",
        href: "",
        icon: GiBackwardTime,
        label: "Recent",
    },
    {
        type: "link",
        href: "",
        icon: FaHeart,
        label: "Favorites",
    },
    {
        type: "header",
        label: "General",
    },
    {
        type: "link",
        href: "/users",
        icon: FaUserAlt,
        label: "Admin",
    },
    {
        type: "link",
        href: "/login",
        icon: BsBoxArrowLeft,
        label: "Log Out",
    },
];
