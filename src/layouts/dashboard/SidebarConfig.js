// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
// import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     {
  //       title: 'app',
  //       path: PATH_DASHBOARD.general.app,
  //       icon: ICONS.dashboard
  //     },
  //     { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
  //   ]
  // },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account }
  //       ]
  //     },
  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
  //       ]
  //     },
  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
  //       ]
  //     }
  //   ]
  // },
  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">2</Label>
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     }
  //   ]
  // },

  // new dashboard scheduly
  {
    parentName: 'Administrator',
    variant: 'contained',
    items: [
      // accountSetup

      {
        title: 'Account Setup',
        path: PATH_DASHBOARD.AccountSetup.root,
        icon: ICONS.analytics,
        children: [
          { title: 'Enterprise Group', path: PATH_DASHBOARD.AccountSetup.enterprise },
          { title: 'Management Unit', path: PATH_DASHBOARD.AccountSetup.management },
          { title: 'Contact Type', path: PATH_DASHBOARD.AccountSetup.contact },
          { title: 'Queues', path: PATH_DASHBOARD.AccountSetup.queues },
          { title: 'Skills', path: PATH_DASHBOARD.AccountSetup.skills },
          { title: 'Entity Sets', path: PATH_DASHBOARD.AccountSetup.entitySets },
          { title: 'Agent Data Groups', path: PATH_DASHBOARD.AccountSetup.agentDataGroup },
          { title: 'Activity Code Definition', path: PATH_DASHBOARD.AccountSetup.activityCodeDefinition },
          { title: 'Entity Assigment ', path: PATH_DASHBOARD.AccountSetup.entityAssignment }
        ]
      },
      // Agents

      {
        title: 'Agents',
        path: PATH_DASHBOARD.Agents.root,
        icon: ICONS.chat,
        children: [
          { title: 'Agent Profile', path: PATH_DASHBOARD.Agents.agentDefinition },
          // { title: 'Agent Profile', path: PATH_DASHBOARD.Agents.agentProfile },
          { title: 'Agent Availability', path: PATH_DASHBOARD.Agents.agentAvailability },
          { title: 'Agent Data Values ', path: PATH_DASHBOARD.Agents.agentDataValues },
          { title: 'Agent Skills', path: PATH_DASHBOARD.Agents.agentSkills },
          { title: 'Agent Time Off Parameter', path: PATH_DASHBOARD.Agents.agentTimeOffParameter },
          { title: 'Move Agents', path: PATH_DASHBOARD.Agents.moveAgents },
          { title: 'Schedule Prefences', path: PATH_DASHBOARD.Agents.schedulePrefences }
        ]
      },
      // User Permissions

      {
        title: 'User Permissions',
        path: PATH_DASHBOARD.UserPermissions.root,
        icon: ICONS.user
      }
    ]
  },
  {
    parentName: 'Time-off Manager',
    variant: 'outlined',
    items: [
      {
        title: 'Time Manager',
        path: PATH_DASHBOARD.TimeOffManager.root,
        icon: ICONS.calendar,
        children: [
          { title: 'Accural Tables', path: PATH_DASHBOARD.TimeOffManager.AccuralTables },
          { title: 'Time Off Groups', path: PATH_DASHBOARD.TimeOffManager.TimeOffGroup },
          { title: 'Time Off Rules', path: PATH_DASHBOARD.TimeOffManager.TimeOffRules },
          { title: 'Time Off Allotments', path: PATH_DASHBOARD.TimeOffManager.TimeOffAllotments },
          { title: 'Move Agents', path: PATH_DASHBOARD.TimeOffManager.MoveAgents },
          { title: 'Agent Time Off Parameter', path: PATH_DASHBOARD.TimeOffManager.AgentTimeOffParameter },
          { title: 'Agent Time Off Survay', path: PATH_DASHBOARD.TimeOffManager.AgentTimeOffSurvay },
          { title: 'Update Master Data Updates', path: PATH_DASHBOARD.TimeOffManager.UpdateMasterDataUpdatees },
          { title: 'Holiday Prefences', path: PATH_DASHBOARD.TimeOffManager.HolidayPrefences }
        ]
      }
    ]
  }
];

export default sidebarConfig;
