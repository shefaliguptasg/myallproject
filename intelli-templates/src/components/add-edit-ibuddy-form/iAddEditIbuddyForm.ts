export type IBuddyFormData = {
  id: string | Blob;
  joinee_first_name: string;
  joinee_last_name: string;
  from_date: string;
  to_date: string;
  buddy_text: string;
};

export type IBuddyErrObj = {
  buddyBackground: string;
  joineeBackground: string;
  joinee_first_name: string;
  joinee_last_name: string;
  from_date: string;
  to_date: string;
  buddy_text: string;
};
export type addEditIBuddyUserType = {
  buddyBackground: string;
  joineeBackground: string;
  isEdit: boolean;
  iBuddyUserInfo: IBuddyFormData;
  errors: IBuddyErrObj;
};

export type userIBuddyFormProps = {
  errors: IBuddyErrObj;
  formData: IBuddyFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type Pagination = {
  total: number;
  pageCount: number;
  page: number;
  pageSize: number;
  __typename: string;
};
type ResponseCollectionMeta = {
  pagination: Pagination;
  __typename: string;
};
type IntelliBuddyAttributes = {
  hr_approval: boolean | null;
  marketing_approval: boolean | null;
  joinee_first_name: string;
  joinee_last_name: string;
  createdAt: string;
  __typename: string;
};
type IntelliBuddyEntity = {
  id: string;
  attributes: IntelliBuddyAttributes;
  __typename: string;
};
type IntelliBuddyEntityResponse = {
  data: IntelliBuddyEntity;
  __typename: string;
};

type IntelliBuddyEntityResponseCollection = {
  meta: ResponseCollectionMeta;
  data: IntelliBuddyEntity[];
  __typename: string;
};
export type UpdateIntelliBuddyResponse = {
  updateIntelliBuddy: IntelliBuddyEntityResponse;
};
export interface CreateIntelliBuddyResponse {
  createIntelliBuddy: IntelliBuddyEntityResponse;
}

type IntelliBuddiesResponse = {
  data: {
    intelliBuddies: IntelliBuddyEntityResponseCollection;
  };
};
