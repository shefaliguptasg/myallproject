import { BaseModel } from "redux-store/index";

export interface ISettings {
  clientDetails: IClientConfig;
}

export interface IClientConfig {
  locale: string;
  isForgetPasswordRedirect: boolean;
  apiEndPoint: string;
  eventServiceEndPoint: string;
  assetsBasePath: string;
  customerBasePath: string;
  tenantId: string;
}

export class Settings extends BaseModel<ISettings> {
  static resource = "Settings";
}
