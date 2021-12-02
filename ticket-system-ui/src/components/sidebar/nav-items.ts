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
        type: "link",
        href: "/search",
        icon: RiSearchLine,
        label: "Search",
    },
    {
        type: "link",
        href: "/producers",
        icon: FaUserAlt,
        label: "Users",
    },
    {
        type: "header",
        label: "Queues",
    },
    {
        type: "link",
        href: "/local",
        icon: IoTicketSharp,
        label: "Open",
    },
    {
        type: "link",
        href: "/local",
        icon: IoTicketSharp,
        label: "Closed",
    },
    {
        type: "link",
        href: "/local",
        icon: IoTicketSharp,
        label: "Work in progress",
    },
    {
        type: "link",
        href: "/recent",
        icon: GiBackwardTime,
        label: "Recent",
    },
    {
        type: "link",
        href: "/favorites",
        icon: FaHeart,
        label: "Favorites",
    },
    {
        type: "header",
        label: "General",
    },
    {
        type: "link",
        href: "/settings",
        icon: IoIosSettings,
        label: "Settings",
    },
    {
        type: "link",
        href: "/logout",
        icon: BsBoxArrowLeft,
        label: "Log Out",
    },
];
