import {Api} from '../types';
import React, {useState} from 'react';
import './../Css/List.css';
import {Link} from 'react-router-dom';
import configData from '../Config.json';
import {getToken} from '../Logic/Ahut';
import HTTP_CODES from '../Logic/Http_Codes';
import CustomToast from './defaulttoast';
import ConfirmR from './confirmation';

function ListOfItemsIndex(params: Api.ListOfItemsIndexProps) {
  const [ShowConfirm, setShowConfirm] = useState<React.CSSProperties >({visibility: 'hidden'});
  const delatePostcall= () =>{
    fetch(`${configData.ApiBackend}${configData.ApiRoutes.Drafts[0].DelatePost}${params.id}`, {
      headers: {
        Authorization: getToken() as string,
      },
      method: 'DELETE',
    })
        .then((response) => response)
        .then((data: Response) => {
          if (data.status!==200) {
            throw new Error(HTTP_CODES[data.status]);
          }
          CustomToast.okDefaultToast('The draft has been removed');
        })
        .catch((Error) => {
          CustomToast.errorDefaultToast(Error);
          return null;
        });
    const filteredArray = (params.State.Post).filter((item) => item.ID !== params.id);
    params.stateDrafts({'Post': filteredArray});
  };

  const delatePost = () => {
    setShowConfirm({visibility: 'visible'});
  };

  const handledelatePost = React.useCallback(()=> delatePost(), []);

  return (
    <div className="mt-3 mb-3  ListOfItemsIndex">
      <ConfirmR
        Show={ShowConfirm}
        updatShow={setShowConfirm}
        callback={delatePostcall}
        Text={`Are you sure you want to delete this ${params.type}?`}
      />
      <Link to={`/writepost?id=${params.id}&type=${params.type}`}>
        <div>
          <div className=''>
            <h2 className="h3 text-break">{params.Title}</h2>
          </div>
        </div>
        <div>
          <div>
            <p className="mt-1 text-light ml-4 text-break"> {params.Description}</p>
          </div>
        </div>
        <div>
          <p className="text-secondary">{params.Date.toDateString()}</p>
        </div>
      </Link>
      <span className="material-icons" role="button" tabIndex={0} onClick={handledelatePost}>
       delete_forever
      </span>
    </div>
  );
}
export default ListOfItemsIndex;
