import AppointmentImage from "@/assets/svg/DashBoard/appointment.svg"
import CommentImage from "@/assets/svg/DashBoard/comments.svg"
import ContactImage from "@/assets/svg/DashBoard/contact.svg"
import OrderImage from "@/assets/svg/DashBoard/orders.svg"
import ProductImage from "@/assets/svg/DashBoard/product.svg"
import ServiceImage from "@/assets/svg/DashBoard/service.svg"
import UserImage from "@/assets/svg/DashBoard/user.svg"

/* eslint-disable @typescript-eslint/no-explicit-any */
type SideBarItem = {
  title: string
  url: string
  icon: any
}

export const SideBarItems: SideBarItem[] = [
    {
        title: "Orders",
        url: "/dashboard/orders",
        icon: OrderImage,
    },
    {
        title: "Products",
        url: "/dashboard/products",
        icon: ProductImage,
    },
    {
        title: "Appointments",
        url: "/dashboard/appointments",
        icon: AppointmentImage,
    },
        {
        title: "Services",
        url: "/dashboard/services",
        icon: ServiceImage,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: UserImage,
    },
    {
        title: "Comments",
        url: "/dashboard/comments",
        icon: CommentImage,
    },
    {
        title: "Contacts",
        url: "/dashboard/contacts",
        icon: ContactImage,
    },
]
