import React, {useState} from 'react';
import IconsToolKit from './IconsToolKit';
import {useNavigate} from 'react-router-dom';
import config from '../Config.json';
import ConfirmR from './confirmation';
import {getToken} from '../Logic/Ahut';
import CustomToast from './defaulttoast';
import Qfetch from '../Logic/Http_Ferch';

function ToolKit(params: {
  Id: string | null;
}) {
  const history = useNavigate();
  const Token = getToken();
  const Callback=()=>{
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.Blog[0].DelatePost}${params.Id}`, undefined, {method: 'DELETE'}).catch(() =>
      CustomToast.errorDefaultToast(
          'there was an error when trying to delete the document',
      ));
    CustomToast.okDefaultToast('Post delated');
    history(`/`);
  };
  const [ShowConfirm, setShowConfirm] = useState< React.CSSProperties>({visibility: 'hidden'});
  const delatePost = () => {
    setShowConfirm({visibility: 'visible'});
  };
  const handleEditPost= React.useCallback(()=>history(`/WritePost?id=${params.Id}&type=post`), []);
  const handledivlookPost = React.useCallback(()=> CustomToast.warnDefaultToast('We are working on it'), []);
  const handledivdelatePost = React.useCallback(()=> delatePost(), []);

  if (Token !== null) {
    return (
      <div className="ml-4 mr-4 ">
        <ConfirmR
          Show={ShowConfirm}
          updatShow={setShowConfirm}
          callback={Callback}
          Text={`Are you sure you want to delete this post?`}
        />
        <div className="row justify-content-md-center ">
          <div
            className=" col  border border-dark"
            onClick={handleEditPost}
            style={{cursor: 'pointer'}}
          >
            <IconsToolKit Name="mode_edit" Description="Edit" Id={params.Id} />
          </div>
          <div
            className="border border-dark col"
            onClick={handledivlookPost}
            style={{cursor: 'pointer'}}
          >
            <IconsToolKit Name="lock_open" Description="lock" Id={params.Id} />
          </div>
          <div
            className="border border-dark col "
            onClick={handledivdelatePost}
            style={{cursor: 'pointer'}}
          >
            <IconsToolKit Name="delete" Description="delete" Id={params.Id} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
export default ToolKit;
