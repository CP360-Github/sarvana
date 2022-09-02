import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import { actionCode } from '../ReduxCreated/reducers/Reducers/ActionCodeReducer';
import { productReducerr } from '../ReduxCreated/reducers/ProductReducerr';
import { agentDataTypes } from '../ReduxCreated/reducers/Reducers/AgentDataGroupsReducer';
import QueueReducer from '../ReduxCreated/reducers/Reducers/Queue.reducer';
import QueueOperatingHours from '../ReduxCreated/reducers/Reducers/QueueOperatingHours.reducer';
import { LoginLogoutReducers } from '../ReduxCreated/reducers/Reducers/LoginLogoutReducers';
import { managementunit } from '../ReduxCreated/reducers/Reducers/ManagementUnitReducer';
import SkillsReducer from '../ReduxCreated/reducers/Reducers/Skills.reducer';
import EntitySetReducer from '../ReduxCreated/reducers/Reducers/EntitySet.reducer';
import { CtReducerr } from '../ReduxCreated/reducers/ContactTypeReducer';
import AgentAvailabilityReducer from '../ReduxCreated/reducers/Agent/AgentAvailability.reducer';
import AgentSkillReducer from '../ReduxCreated/reducers/Agent/AgentSkillReducer';
import AgentValueMultii from '../ReduxCreated/reducers/Agent/AgentValueMultii';
import { AgentDefinitonReducer } from '../ReduxCreated/reducers/AgentDefinitionReducer';
import MoveAgents from '../ReduxCreated/reducers/Agent/MoveAgents.reducer';
import EntityAssignmentReducer from '../ReduxCreated/reducers/Reducers/EntityAssignment.reducer';
import { UsersAndPermissionss } from '../ReduxCreated/reducers/Reducers/UsersAndPermissions/UsersAndPermissions';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  AgentDef: AgentDefinitonReducer,
  contact: CtReducerr,
  product: persistReducer(productPersistConfig, productReducer),
  details: productReducerr,
  actiontype: actionCode,
  agentdatagroup: agentDataTypes,
  queuesData: QueueReducer,
  queueOH: QueueOperatingHours,
  useradmin: LoginLogoutReducers,
  management: managementunit,
  skillsData: SkillsReducer,
  EntitySet: EntitySetReducer,
  AgentAvailability: AgentAvailabilityReducer,
  agentSkill: AgentSkillReducer,
  agentValueMult: AgentValueMultii,
  MoveAgents,
  EntityAssignment: EntityAssignmentReducer,
  UsersAndPermissionss
});

export { rootPersistConfig, rootReducer };
