import { USER_ROLE } from '@/contant/role'
import { DrawerItem, userRole } from '@/types/userRole'

export const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = []

  switch (role) {
    case USER_ROLE.admin:
      roleMenus.push(
        {
          title: 'Dashboard',
          path: `${role}`,
          icon: 'MdInbox',
        },
        {
          title: 'New Order',
          path: `${role}/new-order`,
          icon: 'MdInbox',
        },
        {
          title: 'Settings',
          path: `${role}/settings`,
          icon: 'MdSettings',
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
