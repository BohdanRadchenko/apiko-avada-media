import { ActionType } from "../actionType";

export const handlerAuthentication = state => ({
  type: ActionType.AUTHENTICATION_HANDLER,
  payload : state
});
