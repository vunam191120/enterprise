import { MdSpaceDashboard, MdManageAccounts, MdPolicy } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMedkit } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";

const SidebarAdmin = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Term",
    path: "/terms",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/terms/view",
      },
      {
        title: "Create",
        path: "/terms/create",
      },
    ],
  },
  {
    title: "Department",
    path: "/departments",
    icon: <IoMedkit />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/departments/view",
      },
      {
        title: "Create",
        path: "/departments/create",
      },
    ],
  },
  {
    title: "Category",
    path: "/category",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/categories/view",
      },
      {
        title: "Create",
        path: "/categories/create",
      },
    ],
  },
  {
    title: "User",
    path: "/users",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/users/view",
      },
      {
        title: "Create",
        path: "/users/create",
      },
    ],
  },
  {
    title: "Idea",
    path: "/ideas",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/ideas/view",
      },
      {
        title: "Create",
        path: "/ideas/create",
      },
    ],
  },
  {
    title: "Aggrement",
    path: "/aggrements",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/aggrements/view",
      },
      {
        title: "Create",
        path: "/aggrements/create",
      },
    ],
  },
];

const SidebarQAM = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Term",
    path: "/terms/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Department",
    path: "/departments/view",
    icon: <IoMedkit />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Category",
    path: "/category/view",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "User",
    path: "/users/view",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Idea",
    path: "/ideas/view",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Aggrement",
    path: "/aggrements/view",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

const SidebarQAC = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Term",
    path: "/terms/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Idea",
    path: "/ideas/view",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

const SidebarStaff = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdSpaceDashboard />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Term",
    path: "/terms/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Department",
    path: "/departments/view",
    icon: <IoMedkit />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Category",
    path: "/category/view",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "User",
    path: "/users/view",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Idea",
    path: "/ideas",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/ideas/view",
      },
      {
        title: "Create",
        path: "/ideas/create",
      },
    ],
  },
  {
    title: "Aggrement",
    path: "/aggrement/view",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

export { SidebarAdmin, SidebarQAM, SidebarQAC, SidebarStaff };
