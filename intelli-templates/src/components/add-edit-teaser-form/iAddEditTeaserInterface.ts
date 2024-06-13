export interface ITeaserFormData {
  header_text: string;
  teaserSection: Array<string>;
  backgroundImgUrl: string;
  headerLogoImageUrl: string;
  salutation: string;
  signature: string;
  errors: ITeaserFormErrorData;
}
export interface ITeaserFormErrorData {
  header_text: string;
  teaserSection: Array<string>;
  backgroundImage: string;
  headerLogoImage: string;
  salutation: string;
  signature: string;
}
