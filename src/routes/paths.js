// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ADMIN_DASHBOARD = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  AccountSetup: {
    root: path(ROOTS_DASHBOARD, '/account-setup'),
    enterprise: path(ROOTS_DASHBOARD, '/account-setup/enterprise-group'),
    management: path(ADMIN_DASHBOARD, '/management-unit'),
    contact: path(ROOTS_DASHBOARD, '/account-setup/contact-type'),
    queues: path(ROOTS_DASHBOARD, '/account-setup/queues'),
    skills: path(ROOTS_DASHBOARD, '/account-setup/skills'),
    entitySets: path(ROOTS_DASHBOARD, '/account-setup/entity-sets'),
    agentDataGroup: path(ROOTS_DASHBOARD, '/account-setup/agent-group'),
    activityCodeDefinition: path(ROOTS_DASHBOARD, '/account-setup/activity-definition'),
    entityAssignment: path(ROOTS_DASHBOARD, '/account-setup/entity-assignment')
  },
  Agents: {
    root: path(ROOTS_DASHBOARD, '/agents'),
    agentDefinition: path(ROOTS_DASHBOARD, '/agents/agent-definition'),
    agentProfile: path(ROOTS_DASHBOARD, '/agents/agent-profile'),
    agentAvailability: path(ROOTS_DASHBOARD, '/agents/agent-availability'),
    agentDataValues: path(ROOTS_DASHBOARD, '/agents/agent-dataValues'),
    agentSkills: path(ROOTS_DASHBOARD, '/agents/agent-skills'),
    agentTimeOffParameter: path(ROOTS_DASHBOARD, '/agents/agent-TimeOffParameter'),
    moveAgents: path(ROOTS_DASHBOARD, '/agents/move-agents'),
    schedulePrefences: path(ROOTS_DASHBOARD, '/agents/schedule-prefences')
  },
  UserPermissions: {
    root: path(ROOTS_DASHBOARD, '/user-permissions')
  },
  TimeOffManager: {
    root: path(ROOTS_DASHBOARD, '/timeOff-manager'),
    AccuralTables: path(ROOTS_DASHBOARD, '/accural-tables'),
    TimeOffGroup: path(ROOTS_DASHBOARD, '/time-offGroup'),
    TimeOffRules: path(ROOTS_DASHBOARD, '/time-offRules'),
    TimeOffAllotments: path(ROOTS_DASHBOARD, '/time-offAllotments'),
    MoveAgents: path(ROOTS_DASHBOARD, '/move-agents'),
    AgentTimeOffParameter: path(ROOTS_DASHBOARD, '/agent-parameter'),
    AgentTimeOffSurvay: path(ROOTS_DASHBOARD, '/agent-survay'),
    UpdateMasterDataUpdatees: path(ROOTS_DASHBOARD, '/master-updates'),
    HolidayPrefences: path(ROOTS_DASHBOARD, '/holiday-prefences')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
