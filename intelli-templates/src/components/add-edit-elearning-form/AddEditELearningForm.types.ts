export interface ELearningCertificateFormData {
  id: number;
  first_name: string;
  last_name: string;
  certificate_name: string;
  certificate_date: string;
}

export interface ELearningCertificateErrObj {
  first_name: string;
  last_name: string;
  certificate_name: string;
  certificate_date: string;
}
interface ELearningCertificateAttributes {
  first_name: string;
  __typename: string;
}

interface ELearningCertificateEntity {
  id: string;
  attributes: ELearningCertificateAttributes;
  __typename: string;
}

interface ElearningCertificateEntityResponse {
  data: ELearningCertificateEntity;
  __typename: string;
}

export interface UpdateELearningCertificateResponse {
  updateLearningCertificate: ElearningCertificateEntityResponse;
}

export interface CreateElearningCertificateResponse {
  createLearningCertificate: ElearningCertificateEntityResponse;
}
