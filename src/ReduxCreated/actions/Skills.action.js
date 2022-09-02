export function GetSkillsAction(data) {
  return {
    type: 'get_skills',
    payload: data
  };
}
export function PostSkillsAction(data) {
  return {
    type: 'add_skills',
    payload: data
  };
}

export function DisableSkillsAction(data) {
  return {
    type: 'disable_skills',
    payload: data
  };
}

export function UpdateSkillsAction(data) {
  return {
    type: 'update_skills',
    payload: data
  };
}
