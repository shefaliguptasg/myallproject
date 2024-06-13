class CommonConstants {
  static readonly regExpression = {
    numberRegExp: /^\d*$/,
    stringRegExp: /^[a-zA-Z\s]*$/,
    phoneNumberRegExp: /^(1)?(\d{3})(\d{3})(\d{4})$/,
    addressRegExp: /^[a-zA-Z0-9\s\,\'\/-]*$/,
  };
}
export default CommonConstants;
