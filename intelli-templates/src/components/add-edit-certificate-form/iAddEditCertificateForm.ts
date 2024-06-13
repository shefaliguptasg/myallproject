export interface CertificateFormData {
  id: number;
  first_name: string;
  last_name: string;
  certificate_name: string;
  certificate_date: string;
}

export interface CertificateErrObj {
  first_name: string;
  last_name: string;
  certificate_name: string;
  certificate_date: string;
}
export type userCertificateFormProps = {
  errors: CertificateErrObj;
  formData: CertificateFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
interface ItalkCertificateAttributes {
  first_name: string;
  __typename: string;
}

interface ItalkCertificateEntity {
  id: number;
  attributes: ItalkCertificateAttributes;
  __typename: string;
}

interface ItalkCertificateEntityResponse {
  data: ItalkCertificateEntity;
  __typename: string;
}

export interface UpdateItalkCertificateResponse {
  updateItalkCertificate: ItalkCertificateEntityResponse;
}
export interface CreateItalkCertificateResponse {
  createItalkCertificate: ItalkCertificateEntityResponse;
}
