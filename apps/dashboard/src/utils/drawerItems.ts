import { USER_ROLE } from '@/contant/role'
import { DrawerItem, userRole } from '@/types/userRole'

export const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = []

  switch (role) {
    case USER_ROLE.admin:
      roleMenus.push(
        {
          title: 'New Order',
          path: `${role}/new-order`,
          icon: '',
        },
        {
          title: 'Open Order',
          path: `${role}/open-order`,
          icon: '',
        },
        {
          title: 'Category',
          path: `${role}/category`,
          icon: '',
        },
        {
          title: 'Tables',
          path: `${role}/tables`,
          icon: '',
        },
        {
          title: 'Sales',
          path: `${role}/sales`,
          icon: '',
        },
        {
          title: 'Purches',
          path: `${role}/purches`,
          icon: '',
        },
        {
          title: 'Settings',
          path: `${role}/settings`,
          icon: '',
        },
      )
      break

    case USER_ROLE.user:
      roleMenus.push(
        {
          title: 'Home',
          path: `${role}`,
          icon: 'MdDashboard',
        },
        {
          title: 'Search',
          path: `${role}/search`,
          icon: 'MdSearch',
        },
        {
          title: 'Calendar',
          path: `${role}/calendar`,
          icon: 'MdCalendarToday',
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
