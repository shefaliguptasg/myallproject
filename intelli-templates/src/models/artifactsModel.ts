import { BaseModel } from "redux-store/index";

interface IArtifacts {
  [key: string]: string;
}
export default class Artifacts extends BaseModel<IArtifacts> {
  static resource = "artifacts";
}
