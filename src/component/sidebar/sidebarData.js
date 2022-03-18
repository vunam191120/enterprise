import { MdSpaceDashboard, MdManageAccounts } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMedkit } from "react-icons/io5";

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
    path: "/terms",
    icon: <IoMedkit />,
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
];

export default SidebarQAM;
