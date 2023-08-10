import React from 'react';


export function Customizedinput1(params: {
  name: string;
  values: (e:string) => void;
  text:string;
  type?:string;
}) {
  let type='text';
  if (params.type=='password') {
    type='password';
  }
  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="border border-0  input-group-text bg-dark text-white" id="inputGroup-sizing-sm text-white">{params.name}</span>
        </div>
        <input type={type} className=" border border-0  form-control bg-dark text-white " placeholder={params.text} onChange={ React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
          params.values(e.target.value);
        }, [])}></input>
      </div>
    </div>
  );
}


export function CustomizedChecks1(customizedChecks: { label: string, defaultchecked:boolean, callback: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <div className="form-check m-2">
        <div className="row">
          <div className="col">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {customizedChecks.label}
            </label>
          </div>
          <div className="col">
            <input className="form-check-input" defaultChecked={customizedChecks.defaultchecked} onChange={customizedChecks.callback} type="checkbox" value="" id="flexCheckDefault"/>
          </div>
        </div>
      </div>

    </div>
  );
}


