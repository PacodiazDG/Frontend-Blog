import React from 'react';

export default function IconsToolKit(params: {
  Name: string;
  Description: string;
  Id: string | null;
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className=" ">
        <span className="material-icons" title={params.Description}>
          {params.Name}
        </span>
      </div>
    </div>
  );
}
