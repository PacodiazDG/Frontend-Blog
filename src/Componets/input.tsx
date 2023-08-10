import React from 'react';


function InputWspan(params:{
  Name:string,
  e:React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="me-1  border-bottom p-1 bg-transparent   text-white border-primary">{params.Name}</span>
        </div>
        <input type="text" className="border rounded-start form-control text-white bg-transparent" onChange={params.e} />
      </div>
    </div>
  );
}

export default InputWspan;
