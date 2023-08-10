import React, {useEffect, useState} from 'react';
import {Api} from '../../types';
import config from '../../Config.json';
import CustomToast from '../defaulttoast';
import InputWspan from '../input';
import Qfetch from '../../Logic/Http_Ferch';
import {responseJson} from '../../Logic/ToolkitFerch';
import {CustomizedChecks1} from '../inputs';


function DumpUsers() {
  const init:Api.ListUsers={
    Status: [
      {
        Username: '',
        FirstName: '',
        LastName: '',
        Permissions: '',
        Email: '',
        ID: '',
        Image: '',
        Password: '',
        Banned: false,
      },
    ],
  };
  const UserAc:Api.ApiMyUserCreate={
    Username: '',
    FirstName: '',
    LastName: '',
    Permissions: '',
    Email: '',
    Image: '',
    Password: '',
  };
  // eslint-disable-next-line no-unused-vars
  const Query = {'Next': 0, 'Query': ''};
  const [Users, setUsers] = useState<Api.ListUsers>(init);
  /**
 *
 */
  useEffect(() => {
    update();
  }, []);
  const Next= React.useCallback(()=>{
    Query[`Next`] =Query.Next+1;
    update();
  }, []);


  const onChangeid= React.useCallback((e:React.FormEvent<HTMLInputElement>)=>{
    Query['Query'] = e.currentTarget.value as string;
    update();
  }, []);

  // deleteAcount Elimina la cuenta
  const deleteAcount=(id:string)=>{
    Qfetch.ahutRqst(`${config.ApiBackend+config.ApiRoutes.Admin[0].DelateAcount}/${id}`)
        .then((e)=>e.status===200?update():CustomToast.errorDefaultToast('Error Eliminando la cuenta')).
        catch((e)=>CustomToast.errorDefaultToast(e));
  };
  /**
   *
   */
  const createUser= React.useCallback(()=>{
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.Admin[0].CreateAcount}`, undefined,
        {method: 'POST', body: JSON.stringify(UserAc)})
        .then((e)=>e.status===200?update():CustomToast.errorDefaultToast('Error Creando la cuenta')).
        catch((e)=>CustomToast.errorDefaultToast(e));
  }, []);

  function banUser(status:Boolean, id:string) {
    let Route: string=config.ApiBackend+config.ApiRoutes.Admin[0].Ban;
    if (status) {
      Route=config.ApiBackend+config.ApiRoutes.Admin[0].Unban;
    }
    Qfetch.ahutRqst((`${Route}/${id}`)).then((response)=>{
      response.json().then(()=>{
        update();
      });
    }).catch(()=>{
      CustomToast.errorDefaultToast('Error trying to ban the user');
    });
  };

  /**
   *
   */
  const update=()=>{
    Qfetch.ahutRqst(`${config.ApiBackend}${config.ApiRoutes.User[0].DumpUsers}?next=${Query.Next}&Username=${encodeURIComponent(Query.Query)}`)
        .then((response) => responseJson(response))
        .then((result:Api.ListUsers)=>{
          if (result.Status===null) {
            setUsers(init);
            return;
          }
          setUsers(result);
        })
        .catch((err) => {
          CustomToast.errorDefaultToast(err);
        });
  };

  return (
    <div className="pr-4 w-100">
      <h5><span className="material-icons">
      settings
      </span> User management</h5>
      <div className=''>
        <div className='pt-2 pb-1'>
          <div>
            <h6>List of users </h6>
          </div>
          <div className='p-4'>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text bg-dark border-0 text-white" id="">Username</span>
              </div>
              <input type="text" className="form-control bg-dark text-light border-0 " onChange={onChangeid} />
            </div>
          </div>
          <div className=''>

          </div>
          <div className='table-responsive rounded'>
            <table className="table table-primary">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Permissions</th>
                  <th scope="col">Email</th>
                  <th scope="col">Banned</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  Users.Status.map((x, index) => {
                    return (<tr key={index}>
                      <th scope="row">{x.ID}</th>
                      <td>{x.Username}</td>
                      <td>{x.Permissions}</td>
                      <td>{x.Email}</td>
                      <td>{x.Banned?'true':'false'}</td>
                      <td>
                        <div className='d-flex flex-row'>
                          <div className='p-1'><button type="button" className="btn btn-light btn-sm" onClick={()=>{
                            banUser((x.Banned), x.ID);
                          }}>{x.Banned?'Unban':'Ban'}</button></div>
                          <div className='p-1'><button type="button" className="btn btn-light btn-sm" onClick={ ()=>{
                            deleteAcount(x.ID);
                          }}>Delate Account</button></div>
                        </div>

                      </td>
                    </tr>);
                  })
                }
              </tbody>
              <button className='btn btn-outline-light text-info btn-block mt-2' onClick={Next}>Next page</button>
            </table>
          </div>
          <div className='p-5'>
            <div>
              <p className='fs-4'>Create user</p>
            </div>
            <InputWspan Name='First Name' e={React.useCallback((e)=>{
              UserAc.FirstName= e.target.value;
            }, [])}></InputWspan>
            <InputWspan Name='Last Name' e={React.useCallback((e)=>{
              UserAc.LastName=e.target.value;
            }, [])} ></InputWspan>
            <InputWspan Name='Username' e={React.useCallback((e)=>{
              UserAc.Username= e.target.value;
            }, [])} ></InputWspan>
            <InputWspan Name='Image' e={React.useCallback((e)=>{
              UserAc.Image= e.target.value;
            }, [])} ></InputWspan>
            <InputWspan Name='Password' e={React.useCallback((e)=>{
              UserAc.Password= e.target.value;
            }, [])}></InputWspan>
            <InputWspan Name='Email' e={React.useCallback((e)=>{
              UserAc.Email= e.target.value;
            }, [])} ></InputWspan>
            <p>Permisson management</p>
            <div className='w-50'>
              <CustomizedChecks1 label={'Write Post '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='W';
                } else {
                  UserAc.Permissions= (UserAc.Permissions).replaceAll('W', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Update Post '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='U';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('U', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Delate Post '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='R';
                } else {
                  UserAc.Permissions= UserAc.Permissions.replace('R', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Site Config  '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='X';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('X', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'User Management  '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='G';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('G', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Ban User'} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='B';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('B', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Publish Post  '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='P';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('P', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Upload Files  '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='L';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('L', '');
                }
              }, [])}/>
              <CustomizedChecks1 label={'Modify other blogs '} defaultchecked={false} callback={React.useCallback((e) =>{
                if (e.target.checked) {
                  UserAc.Permissions+='O';
                } else {
                  UserAc.Permissions=UserAc.Permissions.replace('O', '');
                }
              }, [])}/>
            </div>
            <div className='m-4'>
              <button type="button" className="btn btn-outline-info" onClick={createUser}>Create user</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default DumpUsers;
