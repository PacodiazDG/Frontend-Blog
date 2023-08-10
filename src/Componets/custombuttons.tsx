import React from 'react';

export function MenuSlidePanelButton(params: {
  Icon: string;
  Text: string;
  TextVisible: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className=" mb-1 p-2 "
      onClick={params.onClick}
    ><div className='d-flex ps-4 flex-row bd-highlight btn'>
        <div className="col-md-auto">
          <span className="material-icons text-nowrap font-weight-light text-white">
            {params.Icon}
          </span>
        </div>
        <div className="ms-2">
          <div className='mr-2 me-4'>
            <p className="text-left text-nowrap text-white " style={{alignItems: 'center', marginRight: '1%'}}>
              {params.TextVisible === true ? params.Text : null}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export function ButtonMenuM(params:{
  Icon: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div role="button" className='justify-content-center' onClick={params.onClick}>
      <span
        className="material-symbols-outlined text-center"
      >
        {params.Icon}
      </span>
    </div>
  );
}


function ButtonType1(parms:{
  callback:() => void;
  Text:string;
}) {
  const handlebutton =()=>parms.callback();

  return (<div>
    <button
      type="button"
      className=" btn btn-outline-light  btn-block mt-2  border-success"
      onClick={handlebutton}>
      {parms.Text}
    </button>
  </div>);
}

export {
  ButtonType1,
};
