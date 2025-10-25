export const apiRoutes = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    check: '/auth/check',
    refresh: '/auth/refresh',
  },

  group: {
    base: '/group',
    byId: (id: number) => `/group/${id}`,
    search: '/group/search',
    summary: '/group/summary/',
  },

  room: {
    base: '/room',
    byId: (id: number) => `/room/${id}`,
    buildings: '/room/buildings',
  },

  building: {
    base: '/building',
  },

  subject: {
    base: '/subject',
    byId: (id: number) => `/subject/${id}`,
  },

  teacher: {
    base: '/teacher',
    byId: (id: number) => `/teacher/${id}`,
  },

  schedule: {
    base: '/schedule',
    lessons: '/schedule/lessons',
    byGroupId: (id: number) => `/schedule/lessons/${id}`,
  },
};
