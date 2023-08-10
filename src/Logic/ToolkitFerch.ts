

function getjson(Response:Response) {
  return Response.json().then((e)=>e.Stauts);
};
export async function responseJson(Response:Response) {
  if (Response.status!==200) {
    throw new Error(await getjson(Response));
  }
  return Response.json();
};
