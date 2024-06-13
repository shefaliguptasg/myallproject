export interface ObFormData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  designation: string;
  manager: string;
  location: string;
  info: string;
  education: string;
  life_style: string;
  past_detail: string;
  wish_text: string;
  id: string;
}

export interface ObFormErrObj {
  image: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  designation: string;
  manager: string;
  location: string;
  info: string;
  education: string;
  life_style: string;
  past_detail: string;
  wish_text: string;
}

export type ObFormProps = {
  errors: ObFormErrObj;
  formData: ObFormData;
  isEdit: boolean;
  handleDropDown: (value: { key: string }) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ObFormUserData = {
  addEditObUser: ObFormData;
  obUserInfo: ObFormData;
  errors: ObFormErrObj;
  isEdit: boolean;
};

interface ObFormAttributes {
  first_name: string;
  __typename: string;
}

interface ObFormEntity {
  id: string;
  attributes: ObFormAttributes;
  __typename: string;
}

interface ObFormEntityResponse {
  data: ObFormEntity;
  __typename: string;
}

export interface CreateObFormResponse {
  createOnboarding: ObFormEntityResponse;
}

export interface UpdateObFormResponse {
  updateOnboardingUser: ObFormEntityResponse;
}
