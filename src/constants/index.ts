import {
  Home,
  Inbox,
  Search,
  Settings,
  Briefcase,
  FileText,
  User,
  Building,
  BarChart,
  Building2,
  Calendar,
  PanelsTopLeft,
  Circle,
  BarChart4,
  ShieldCheck,
  Users2,
  BookAIcon,
  InfoIcon,
} from "lucide-react";

export const dataSidebar = [
  {
    href: "/dashboard",
    icon: PanelsTopLeft,
    label: "Dashboard",
  },
  {
    href: "/dashboard/blog",
    icon: BookAIcon,
    label: "Blog",
  },
  {
    href: "/dashboard/appointments",
    icon: Calendar,
    label: "Appointments",
  },
  {
    href: "/dashboard/users",
    icon: Users2,
    label: "Users",
  },
];

export const dataToolsSidebar = [
  {
    href: "/",
    icon: BarChart4,
    label: "Analitycs",
  },
  {
    href: "/",
    icon: InfoIcon,
    label: "Faqs",
  },
];

export const dataSupportSidebar = [
  {
    href: "/",
    icon: Settings,
    label: "Setting",
  },
  {
    href: "/",
    icon: ShieldCheck,
    label: "Security",
  },
  {
    href: "/bookins",
    icon: ShieldCheck,
    label: "Bookins-web",
  },
];

export const dataCardSumary = [
  {
    icon: User,
    total: "1,200",
    avarage: 100,
    title: "Clients",
    tooltipText: "Total number of clients",
  },
  {
    icon: FileText,
    total: "300",
    avarage: 25,
    title: "Active Cases",
    tooltipText: "Total number of active cases",
  },
  {
    icon: Briefcase,
    total: "50",
    avarage: 5,
    title: "Lawyers",
    tooltipText: "Total number of lawyers",
  },
  {
    icon: Building,
    total: "20",
    avarage: 2,
    title: "Offices",
    tooltipText: "Total number of offices",
  },
];


export const OPENING_HOURS_BEGINNING = 9
export const OPENING_HOURS_END = 12
export const OPENING_HOURS_INTERVAL = 30 

export const now = new Date()