import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import HistoryModal from '../view/EG/HistoryModal';
// layouts
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    //  admin Routes
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        // administrator
        {
          path: 'management-unit',
          children: [{ path: '/', element: <ManagementUnit /> }]
        },
        {
          path: 'management-unit-history/:id',
          children: [{ path: '/', element: <HistoryMU /> }]
        },
        { path: 'management-unit-agent-data/:id', element: <AgentDataMU /> }
      ]
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        // administrator
        {
          path: 'account-setup',
          children: [
            { path: '/', element: <Navigate to="/dashboard/account-setup/enterprise-group" replace /> },
            { path: 'enterprise-group', element: <GeneralApp /> },
            { path: 'enterprise-group-history/:id', element: <HistoryModal /> },
            { path: 'enterprise-group-availability/:id', element: <Availability /> },
            { path: 'management-unit', element: <ManagementUnit /> },
            { path: 'contact-type', element: <ContactType /> },
            { path: 'contact-type-assignment/:id', element: <AssignmentHistory /> },
            { path: 'queues', element: <Queues /> },
            { path: 'queues-history/:id', element: <QueuesHistory /> },
            { path: 'skills', element: <Skills /> },
            { path: 'entity-sets', element: <EntitySet /> },
            { path: 'entity-include/:id/:setType', element: <EntityIncludes /> },
            { path: 'agent-group', element: <AgentData /> },
            { path: 'agent-group-values/:id', element: <Values /> },
            { path: 'activity-definition', element: <ActivityCodeDefinition /> },
            { path: 'entity-assignment', element: <EntityAssignment /> },
            { path: 'entity-unassign', element: <EntityUnassign /> }
          ]
        },
        {
          path: 'agents',
          children: [
            { path: '/', element: <Navigate to="/dashboard/agents/agent-definition" replace /> },
            { path: 'agent-definition', element: <AgentDefinition /> },
            { path: 'agent-definition/agent-data/:id', element: <AgentDefData /> },
            { path: 'agent-edit/:id', element: <AgentEdit /> },
            { path: 'agent-profile', element: <GeneralApp /> },
            { path: 'agent-availability', element: <AgentAvailability /> },
            { path: 'agent-workrule-availability', element: <WorkRuleAvailability /> },
            { path: 'agent-dataValues', element: <AgentDataValues /> },
            { path: 'agent-dataValues/view-skills/:id', element: <ViewValues /> },
            { path: 'agent-skills', element: <AgentSkills /> },
            { path: 'agent-skills/view-skills/:id', element: <ViewSkills /> },
            { path: 'agent-TimeOffParameter', element: <GeneralApp /> },
            { path: 'move-agents', element: <MoveAgents /> },
            { path: 'move-agents-history/:id/:MuOrTogToken', element: <MoveAgentAssignmentHistory /> },
            { path: 'schedule-prefences', element: <GeneralApp /> }
          ]
        },
        {
          path: 'user-permissions',
          children: [{ path: '/', element: <UserPermission /> }]
        },
        // time off manager
        {
          path: 'timeOff-manager',
          children: [
            { path: '/', element: <Navigate to="/dashboard/timeOff-manager/accural-tables" /> },
            { path: 'accural-tables', element: <ManagementUnit /> },
            { path: 'time-offGroup', element: <ManagementUnit /> },
            { path: 'time-offRules', element: <ManagementUnit /> },
            { path: 'time-offAllotments', element: <ManagementUnit /> },
            { path: 'move-agents', element: <ManagementUnit /> },
            { path: 'agent-parameter', element: <ManagementUnit /> },
            { path: 'agent-survay', element: <ManagementUnit /> },
            { path: 'master-updates', element: <ManagementUnit /> },
            { path: 'holiday-prefences', element: <ManagementUnit /> }
          ]
        },

        // { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <ManagementUnit /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'e-commerce',
          children: [
            { path: '/', element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> }
          ]
        },
        {
          path: 'user',
          children: [
            { path: '/', element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: '/:name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '/', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'mail',
          children: [
            { path: '/', element: <Navigate to="/dashboard/mail/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { path: '/', element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        // { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <ManagementUnit /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'e-commerce',
          children: [
            { path: '/', element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> }
          ]
        },
        {
          path: 'user',
          children: [
            { path: '/', element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: '/:name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '/', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'mail',
          children: [
            { path: '/', element: <Navigate to="/dashboard/mail/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { path: '/', element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../view/EG/GeneralApp')));
const ActivityCodeDefinition = Loadable(lazy(() => import('../view/ActivityCodeDefinition/ActivityCodeDefinition')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
// const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const ContactType = Loadable(lazy(() => import('../view/ContactType/ContactType')));
const AssignmentHistory = Loadable(lazy(() => import('../view/ContactType/AssignmentHistory')));
const ManagementUnit = Loadable(lazy(() => import('../view/management-unit/ManagementUnit')));
const HistoryMU = Loadable(lazy(() => import('../view/management-unit/components/HistoryMU')));
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));
const Availability = Loadable(lazy(() => import('../view/EG/Availability')));
const AgentData = Loadable(lazy(() => import('../view/AgentData/AgentData')));
const AgentDataMU = Loadable(lazy(() => import('../view/management-unit/components/AgentDataMU/AgentDataMU')));
const Values = Loadable(lazy(() => import('../view/AgentData/components/ValueAgentData')));
const AgentDataValues = Loadable(lazy(() => import('../view/Agent-dataValues/AgentDataValues')));
const AgentSkills = Loadable(lazy(() => import('../view/Agent-Skills/AgentSkills')));
const ViewSkills = Loadable(lazy(() => import('../view/Agent-Skills/components/ViewSkills')));
const UserPermission = Loadable(lazy(() => import('../view/users-permission/UserPermission')));
const ViewValues = Loadable(lazy(() => import('../view/Agent-dataValues/components/ViewValues')));
// Main
// const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Queue
const Queues = Loadable(lazy(() => import('../view/Queues/Queues')));
// eslint-disable-next-line import/extensions
const QueuesHistory = Loadable(lazy(() => import('../view/Queues/QueueHistory.js')));

// skills
// eslint-disable-next-line import/extensions
const Skills = Loadable(lazy(() => import('../view/Skills/Skills.js')));

// Entity Set
const EntitySet = Loadable(lazy(() => import('../view/EntitySet/EntitySet')));
const EntityIncludes = Loadable(lazy(() => import('../view/EntitySet/EntityIncludes')));

// Agent Definition
const AgentDefinition = Loadable(lazy(() => import('../view/AgentDefinition/AgentDefinition')));
const AgentAvailability = Loadable(lazy(() => import('../view/AgentAvailability/AgentAvailability')));
const AgentEdit = Loadable(lazy(() => import('../view/AgentDefinition/AgentEdit')));
const AgentDefData = Loadable(lazy(() => import('../view/AgentDefinition/AgentData')));

// Move Agents
const MoveAgents = Loadable(lazy(() => import('../view/AgentMove/MoveAgents')));
const MoveAgentAssignmentHistory = Loadable(lazy(() => import('../view/AgentMove/MoveAgentAssignmentHistory')));

// Entity Assignment
const EntityAssignment = Loadable(lazy(() => import('../view/EntityAssignment/EntityAssignment')));
const EntityUnassign = Loadable(lazy(() => import('../view/EntityAssignment/EntityUnassign')));

// Agent Availability
const WorkRuleAvailability = Loadable(lazy(() => import('../view/AgentAvailability/WorkRuleAvailability')));

// Components
// const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
// const Color = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationColors')));
// const Typography = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationTypography')));
// const Shadows = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationShadows')));
// const Grid = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationGrid')));
// const Icons = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationIcons')));
// const Accordion = Loadable(lazy(() => import('../pages/components-overview/material-ui/Accordion')));
// const Alert = Loadable(lazy(() => import('../pages/components-overview/material-ui/Alert')));
// const Autocomplete = Loadable(lazy(() => import('../pages/components-overview/material-ui/Autocomplete')));
// const Avatar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Avatar')));
// const Badge = Loadable(lazy(() => import('../pages/components-overview/material-ui/Badge')));
// const Breadcrumb = Loadable(lazy(() => import('../pages/components-overview/material-ui/Breadcrumb')));
// const Buttons = Loadable(lazy(() => import('../pages/components-overview/material-ui/buttons')));
// const Checkbox = Loadable(lazy(() => import('../pages/components-overview/material-ui/Checkboxes')));
// const Chip = Loadable(lazy(() => import('../pages/components-overview/material-ui/chips')));
// const Dialog = Loadable(lazy(() => import('../pages/components-overview/material-ui/dialog')));
// const Label = Loadable(lazy(() => import('../pages/components-overview/material-ui/Label')));
// const List = Loadable(lazy(() => import('../pages/components-overview/material-ui/Lists')));
// const Menu = Loadable(lazy(() => import('../pages/components-overview/material-ui/Menus')));
// const Pagination = Loadable(lazy(() => import('../pages/components-overview/material-ui/Pagination')));
// const Pickers = Loadable(lazy(() => import('../pages/components-overview/material-ui/pickers')));
// const Popover = Loadable(lazy(() => import('../pages/components-overview/material-ui/Popover')));
// const Progress = Loadable(lazy(() => import('../pages/components-overview/material-ui/progress')));
// const RadioButtons = Loadable(lazy(() => import('../pages/components-overview/material-ui/RadioButtons')));
// const Rating = Loadable(lazy(() => import('../pages/components-overview/material-ui/Rating')));
// const Slider = Loadable(lazy(() => import('../pages/components-overview/material-ui/Slider')));
// const Snackbar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Snackbar')));
// const Stepper = Loadable(lazy(() => import('../pages/components-overview/material-ui/stepper')));
// const Switches = Loadable(lazy(() => import('../pages/components-overview/material-ui/Switches')));
// const Table = Loadable(lazy(() => import('../pages/components-overview/material-ui/table')));
// const Tabs = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tabs')));
// const Textfield = Loadable(lazy(() => import('../pages/components-overview/material-ui/textfield')));
// const Timeline = Loadable(lazy(() => import('../pages/components-overview/material-ui/Timeline')));
// const Tooltip = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tooltip')));
// const TransferList = Loadable(lazy(() => import('../pages/components-overview/material-ui/transfer-list')));
// const TreeView = Loadable(lazy(() => import('../pages/components-overview/material-ui/TreeView')));
// const DataGrid = Loadable(lazy(() => import('../pages/components-overview/material-ui/data-grid')));
//
// const Charts = Loadable(lazy(() => import('../pages/components-overview/extra/Charts')));
// const Map = Loadable(lazy(() => import('../pages/components-overview/extra/Map')));
// const Editor = Loadable(lazy(() => import('../pages/components-overview/extra/Editor')));
// const CopyToClipboard = Loadable(lazy(() => import('../pages/components-overview/extra/CopyToClipboard')));
// const Upload = Loadable(lazy(() => import('../pages/components-overview/extra/Upload')));
// const Carousel = Loadable(lazy(() => import('../pages/components-overview/extra/Carousel')));
// const MultiLanguage = Loadable(lazy(() => import('../pages/components-overview/extra/MultiLanguage')));
// const Animate = Loadable(lazy(() => import('../pages/components-overview/extra/animate')));
// const MegaMenu = Loadable(lazy(() => import('../pages/components-overview/extra/MegaMenu')));
// const FormValidation = Loadable(lazy(() => import('../pages/components-overview/extra/form-validation')));
