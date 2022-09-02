const SkillsReducer = (state = [], action) => {
  switch (action.type) {
    case 'get_skills':
      return action.payload;
    case 'add_skills':
      return [...state, action.payload];
    case 'disable_skills': {
      const allSkills = [...state];
      const updatedVal = allSkills.filter((skills) => skills.id !== action.payload.id);
      return updatedVal;
    }
    case 'update_skills': {
      const allSkills = [...state];
      const updatedVal = allSkills.map((skills) => {
        if (skills.id === action.payload.id) {
          skills.skill_name = action.payload.skill_name;
          skills.acd_param.param_name = action.payload.acd_param.param_name;
          skills.id = action.payload.id;
          skills.queue.queue_name = action.payload.queue.queue_name;
        }
        return skills;
      });
      return updatedVal;
    }
    default:
      return state;
  }
};

export default SkillsReducer;
