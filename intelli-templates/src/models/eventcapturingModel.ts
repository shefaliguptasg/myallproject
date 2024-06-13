import { BaseModel } from "redux-store/index";

interface IEventData {
  offerId: string | number;
  eventType: string;
  eventPayload: any;
  timestamp: string;
}

interface IEventCapturing {
  eventData: IEventData[];
}
export default class EventCapturing extends BaseModel<IEventCapturing> {
  static resource = "EventCapturing";
}
