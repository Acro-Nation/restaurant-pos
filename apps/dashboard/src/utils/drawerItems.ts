import { USER_ROLE } from '@/constant/role'
import NewOrderIcon from '../assets/icons/NewOrderIcon'
import openOrder from '../assets/icons/OpenOrderIcon'
import CategoryIcon from '../assets/icons/CategoryIcon'
import TableIcon from '../assets/icons/TableIcon'
import PurchesIcon from '../assets/icons/PurchesIcon'
import SettingIcon from '../assets/icons/SettingIcon'
import SaleIGroupIcon from '@/assets/icons/SaleIGroupIcon'
import LogoutIcon from '@/assets/icons/LogoutIcon'
import HelpCenterIcon from '@/assets/icons/HelpCenterIcon'

export const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = []
  const defaultMenus = [
    {
      title: 'Profile',
      path: `${role as string}/profile`,
      icon: CategoryIcon,
    },
  ]
  switch (role) {
    case USER_ROLE.RESTAURANT_ADMIN:
      roleMenus.push(
        {
          title: 'New Order',
          path: `${role}/new-order`,
          icon: NewOrderIcon,
        },
        {
          title: 'Open Order',
          path: `${role}/open-order`,
          icon: openOrder,
        },
        {
          title: 'Category',
          path: `${role}/category`,
          icon: CategoryIcon,
        },
        {
          title: 'Tables',
          path: `${role}/tables`,
          icon: TableIcon,
        },
        {
          title: 'Sales',
          path: `${role}/sales`,
          icon: SaleIGroupIcon,
        },
        {
          title: 'Purches',
          path: `${role}/checkout`,
          icon: PurchesIcon,
        },
        {
          title: 'Settings',
          path: `${role}/#`,
          icon: SettingIcon,
        },
      )
      break

    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: 'Home',
          path: `${role}`,
          // icon: 'MdDashboard',
        },
        {
          title: 'Search',
          path: `${role}/search`,
          // icon: 'MdSearch',
        },
        {
          title: 'Calendar',
          path: `${role}/calendar`,
          // icon: 'MdCalendarToday',
        },
      )
      break

    // Add additional roles as needed

    default:
      break
  }

  return [...roleMenus, ...defaultMenus]
}

export const footerItems = [
  {
    title: 'Help Center',
    path: '#',
    icon: HelpCenterIcon,
  },
  {
    title: 'Log Out',
    path: '#',
    icon: LogoutIcon,
  },
]
