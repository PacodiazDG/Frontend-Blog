interface Map {
  [key: number]: string;
}
const HTTP_CODES: Map = {
  501: 'Not Implemented',
  500: 'Internal server error',
  404: 'Not Found',
  403: 'Authentication required',
  401: 'Not Authorized',
  202: 'Ok',
};

export default HTTP_CODES;
