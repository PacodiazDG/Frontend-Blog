import React from 'react';


function ConfirmR(params: {
  Show: React.CSSProperties;
  updatShow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  callback:() => void;
  Text:string;
}) {
  const visible: React.CSSProperties = params.Show;
  const handlebuttonYes = React.useCallback(() => {
    params.callback();
    params.updatShow({visibility: 'hidden'});
  }, []);

  const handlebuttonNo = React.useCallback(()=>params.updatShow({visibility: 'hidden'}), []);

  return (
    <div className="Confirmation" style={visible}>
      <div className="ConfirmationButtons">
        <div className="row">
          <p className="h3 mb-3">{params.Text}</p>
          <div className="col-sm">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg"
              onClick={handlebuttonYes}
            >
              Yes, delete
            </button>
          </div>
          <div className="col-sm">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={handlebuttonNo}
            >
              No, Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmR;
