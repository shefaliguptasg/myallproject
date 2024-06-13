import EventCapturing from "models/eventcapturingModel";
import { getSettingsFromStore } from "utils/generalUtils";
import HttpClient from "utils/http";
export const pushAllEventsToServer = async () => {
  const savedEvents = EventCapturing.getInstance("")?.props;

  pushEventsToServer(savedEvents?.eventData || []);
  new EventCapturing({
    id: "",
    eventData: [],
  }).$save();
};

export const pushEventsToServer = async (eventsArray: any) => {
  const httpClient = new HttpClient();
  const url = getSettingsFromStore("eventServiceEndPoint");
  if (eventsArray && eventsArray.length) httpClient.post(url, eventsArray);
};
