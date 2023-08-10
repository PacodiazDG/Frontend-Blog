/* eslint-disable valid-jsdoc */

import config from '../Config.json';
import {getToken} from './Ahut';
const Qfetch={
  uploadFile(Data:ArrayBuffer): Promise<Response> {
    const form = new FormData();
    form.append('file', new Blob([new Uint8Array(Data)], {type: 'application/octet-stream'}));
    const requestHeaders = {
      'Authorization': getToken() as string,
    };
    return fetch(`${config.ApiBackend}${config.ApiRoutes.Blog[0].UploadImage}`,
        {
          method: 'POST',
          headers: requestHeaders,
          body: form,
        },
    );
  },


  ahutRqst(Fullurl:string, OptionalHeaders:HeadersInit | undefined=undefined, OptionalRequestInit:RequestInit | undefined=undefined):Promise<Response> {
    let finalheaders:RequestInit={
      headers: {
        'Authorization': getToken() as string,
      },
    };
    if (OptionalHeaders !== undefined) {
      finalheaders = {
        headers: {...OptionalHeaders},
      };
    }
    if (OptionalRequestInit !== undefined) {
      Object.assign(finalheaders, OptionalRequestInit);
    }
    return fetch(`${Fullurl}`, finalheaders);
  },
};
export default Qfetch;
