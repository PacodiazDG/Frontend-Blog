import React, {Suspense, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import './../../Css/writepost.css';
import configData from '../../Config.json';
import DropFile from '../../Componets/filedropdiv';
import {getParamswithoutSlash} from '../../Logic/Toolkit';
import {useNavigate} from 'react-router-dom';
import CustomToast from '../../Componets/defaulttoast';
import {CustomRenders} from '../../Componets/rendermarkdown';
import Qfetch from '../../Logic/Http_Ferch';
import {Api} from '../../types';
import {ButtonType1} from '../../Componets/custombuttons';
import {responseJson} from '../../Logic/ToolkitFerch';
import rehypeSanitize from 'rehype-sanitize';
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'));
function Writepost() {
  const [Preview, setPreview] = useState(false);
  const Markref = React.useRef<HTMLDivElement | null>(null);
  const initApi:Api.ApiPost={
    Post: {
      Title: '',
      Content: '',
      Visible: true,
      Tags: [],
      Imagen: '',
      Status: '',
      Description: '',
      Password: '',
    },
  };
  const [Api, setApi] = useState<Api.ApiPost>(initApi);
  const id = getParamswithoutSlash(
      window.location.href,
      'id');
  const type = getParamswithoutSlash(window.location.href, 'type');
  const history = useNavigate();
  // deprecated
  useEffect(() => {
    let route;
    if (type === 'post') {
      route = configData.ApiRoutes.Blog[0].GetPost;
    } else if (type === 'draft') {
      route = configData.ApiRoutes.Drafts[0].GetPost;
    } else {
      CustomToast.errorDefaultToast('Invalid edit type');
      history('/');
      return;
    }
    Qfetch.ahutRqst(`${configData.ApiBackend}${route}${id}?type=${type}`)
        .then((e)=>responseJson(e))
        .then((data:Api.ApiPost)=>{
          setApi(data);
        }).catch((e)=>{
          CustomToast.errorDefaultToast(e);
        });
  }, []);
  // deprecated
  const Drop=( ev: ClipboardEvent)=>{
    const items: FileList | undefined=ev.clipboardData?.files;
    if ( items?.length===undefined ||
      ev.clipboardData?.files.length===0 ) {
      return;
    }
    for (let index = 0; index < items?.length; index++) {
      if (ev.clipboardData?.types[index]!==undefined) {
        ev.preventDefault();
        ev.clipboardData?.files[index].arrayBuffer().then((e)=>{
          Qfetch.uploadFile(e).then((es)=>{
            if (es.status!==200) {
              CustomToast.errorDefaultToast('Error uploading the file');
            }
            es.json().then((e)=>{
              setApi((prevState ) => ({
                ...prevState,
                Post: {
                  ...Api.Post,
                  Content: Api.Post.Content+`\n![Name](${e['Url']})\n`,
                },
              }));
            });
          }).catch((e)=>{
            CustomToast.errorDefaultToast(e);
          });
        });
      };
    }
  };

  useEffect(() => {
    if (Markref && Markref.current) {
      Markref.current.addEventListener('paste', Drop );
      return () => {
        if (Markref && Markref.current) {
          Markref.current.removeEventListener('paste', Drop);
        }
      };
    };
  }, [Api]);

  // Creating globals for every single test is too slow.
  // However caching them between runs won't work for the same attribute names
  const tagsProcessor = (e: string) => {
    setApi((prevState ) => ({
      ...prevState,
      Post: {
        ...Api.Post,
        Tags: e.split(' '),
      },
    }));
  };

  // Creating globals for every single test is too slow.
  // However caching them between runs won't work for the same attribute names
  const Handlepreview = () => {
    setPreview(!Preview);
  };

  const sendData = (Endpoint: string) => {
    let method:string='Post';
    const updated =Endpoint===configData.ApiRoutes.Blog[0].UpdatePost||Endpoint===configData.ApiRoutes.Drafts[0].UpdatePost;
    if (updated) {
      method='PUT';
      Endpoint=Endpoint+id;
    }
    Qfetch.ahutRqst(`${configData.ApiBackend}${Endpoint}`, undefined, {method: method, body: JSON.stringify(Api.Post)})
        .then((e)=>{
          responseJson(e);
          if (e.status===200 ) {
            CustomToast.okDefaultToast('Action performed successfully');
          } else {
            CustomToast.errorDefaultToast(e.statusText);
          }
        })
        .catch((e)=>CustomToast.errorDefaultToast(e));
  };

  return (
    <div className="container">
      <div className="Editor">
        <div className="textEditor pb-5">
          <div>
            <input
              className="form-control noborder inputTMercy titleInputMercy display-3"
              onInput={ React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                setApi((prevState ) => ({
                  ...prevState,
                  Post: {
                    ...Api.Post,
                    Title: event.target.value,
                  },
                }));
              }, [Api])}
              placeholder="Title"
              value={Api.Post.Title}
            />
          </div>
          <div>
            <input
              className="inputTMercy textedit noborder mt-3 mb-1"
              placeholder="Image"
              value={Api.Post.Title === '' ? ' Cover Image URL' : Api.Post.Imagen}
              onInput={ React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                setApi((prevState ) => ({
                  ...prevState,
                  Post: {
                    ...Api.Post,
                    Imagen: event.target.value,
                  },
                }));
              }, [Api])}
            >
            </input>
          </div>
          <div>
            <input
              className="inputTMercy textedit noborder mt-3 mb-1"
              onChange={ React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                setApi((prevState ) => ({
                  ...prevState,
                  Post: {
                    ...Api.Post,
                    Description: event.target.value,
                  },
                }));
              }, [Api])}
              placeholder="Write a description..."
              value={Api.Post.Description}
            />
          </div>
          <label className="form-check-label" />
          <div className="tools mb-4">
            <ButtonType1 Text={Preview === false ? 'Show final preview' : 'Show Editor'} callback={Handlepreview}></ButtonType1>
          </div>
          <div>
            {Preview === false ? (
              <div ref={Markref} contentEditable="inherit">

                <Suspense fallback={<div>Loading...</div>}>
                  <section>
                    <MDEditor
                      value={Api.Post.Content}
                      height={700}
                      preview='edit'
                      previewOptions={{
                        components: {
                          img: CustomRenders.img,
                        },
                        rehypePlugins: [rehypeSanitize],
                      }}
                      onChange={(e)=>{
                        setApi((prevState) => ({
                          ...prevState,
                          Post: {
                            ...Api.Post,
                            Content: (e as string),
                          },
                        }));
                      }}
                    />
                  </section>
                </Suspense>
              </div>
            ) : (
              <ReactMarkdown skipHtml={false} components={{code: CustomRenders.Code, img: CustomRenders.img}}>{Api.Post.Content}</ReactMarkdown>
            )}
          </div>
          <hr />
          <div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={React.useCallback(() => setApi((prevState ) => ({
                  ...prevState,
                  Post: {
                    ...Api.Post,
                    Visible: !Api.Post.Visible,
                  },
                })), [Api])}
                checked={Api.Post.Visible}
              />
              <label className="form-check-label">Visble Post</label>
            </div>
          </div>
          <div>
            <p>Tags: </p>
            <input
              className="inputTMercy textedit noborder mt-3 mb-1"
              onChange={ React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                tagsProcessor(event.target.value);
              }, [Api])}
              placeholder="Tags"
            >
            </input >
            <div className="mb-2">
              {(Api.Post.Tags).map((object, key) => (
                <span className="badge bg-light text-dark tags" key={key}>{object}</span>
              ))}
            </div>

            <div>
              <DropFile />
            </div>
          </div>
          <hr />
          <div>
            <p>Password</p>
            <input
              className="inputTMercy textedit  mt-1 mb-1  border border-light"
              onChange={ React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
                setApi((prevState ) => ({
                  ...prevState,
                  Post: {
                    ...Api.Post,
                    Password: event.target.value,
                  },
                }));
              }, [Api])}
              placeholder="Password"
            />
          </div>
          <hr />
          <div>
          </div>
          <div className="mt-4">
            {type === 'draft' ? (
              <div className='d-flex flex-row'>
                <ButtonType1 Text='Publish' callback={()=>sendData(configData.ApiRoutes.Blog[0].InsertPost)}></ButtonType1>
                <div className='ps-2'>
                  <ButtonType1 Text='Update Draft' callback={()=>sendData(configData.ApiRoutes.Drafts[0].UpdatePost)}></ButtonType1>
                </div>
              </div>
            ) : (
            <div>
              <ButtonType1 Text='Update' callback={()=>sendData(configData.ApiRoutes.Blog[0].UpdatePost)}></ButtonType1>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Writepost;
