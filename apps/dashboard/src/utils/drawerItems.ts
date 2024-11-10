import { USER_ROLE } from '@/constant/role'
import { DrawerItem, userRole } from '@/types/userRole'

import NewOrderIcon from '../assets/icons/NewOrderIcon'
import openOrder from '../assets/icons/OpenOrderIcon'
import CategoryIcon from '../assets/icons/CategoryIcon'
import TableIcon from '../assets/icons/TableIcon'

import PurchesIcon from '../assets/icons/PurchesIcon'
import SettingIcon from '../assets/icons/SettingIcon'
import SaleIcon from '@/assets/icons/SaleIcon'

export const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = []

  switch (role) {
    case USER_ROLE.admin:
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
          icon: SaleIcon,
        },
        {
          title: 'Purches',
          path: `${role}/purches`,
          icon: PurchesIcon,
        },
        {
          title: 'Settings',
          path: `${role}/settings`,
          icon: SettingIcon,
        },
      )
      break

    case USER_ROLE.user:
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
    // case USER_ROLE.MANAGER:
    //    roleMenus.push(...);

    default:
      break
  }

  return roleMenus
}
