import React, {useEffect, useState} from 'react';
import './../Css/Page.css';
import ReactMarkdown from 'react-markdown';
import {CustomRenders} from '../Componets/rendermarkdown';
import config from '../Config.json';
import {Api} from '../types';
import Toolkit from '../Componets/tool';
import CustomToast from '../Componets/defaulttoast';
import SpinerB from '../Componets/spiner';
import {dateFormatShort, timeout, wordPerMinute} from '../Logic/Toolkit';
import Tags from '../Componets/tags';
import Apiv1 from '../Logic/Api/Api';
import {responseJson} from '../Logic/ToolkitFerch';
import {CardRender} from '../Componets/cards';
import ResetScroll from '../Componets/resetscroll';
import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faTwitter, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {useNavigate} from 'react-router-dom';


const intialState: Api.PageResults = {
  Title: '',
  Imagen: '',
  Date: '',
  Content: '',
  Tags: [],
  Description: '',
  ID: '',
};
function indexcardRender(args: Api.Feed[]): JSX.Element[] | undefined {
  if (args !== null) {
    return args.map((item: Api.Feed, index) => (
      <div className="col" key={index}>
        <CardRender.Card3
          Imagen={item.Imagen}
          Title={item.Title}
          Content={item.Description}
          Date={(item.Date).toString()}
          id={`/Pages?id=${item.ID}`}
        />
      </div>
    ));
  }
}

function Page() {
  const ThisUrl: string = window.location.href;
  const url = new URL(ThisUrl.replace('#', ''));
  const Params = new URLSearchParams(url.search);
  const [Posts, setPost] = useState<Api.PageResults>(intialState);
  const [Recommended, setRecommended] = useState<Api.Feed[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect( () => {
    const hash = Params.get('Hash');
    fetch(`${config.ApiBackend}${config.ApiRoutes.Blog[0].GetPost}${Params.get('id')}?Hash=${hash}`)
        .then((response) =>{
          if (response.status === 404) {
            navigate('/404');
            throw new Error('Post Not found'); ;
          }
          return responseJson(response);
        })
        .then((data:Apiv1.Post.postFullStructure) => {
          setPost(data.Post);
        })
        .catch((e) => {
          CustomToast.errorDefaultToast(e);
        });

    fetch(`${config.ApiBackend}${config.ApiRoutes.Blog[0].RecommendedPost}/${Params.get('id')}`)
        .then((response) => responseJson(response))
        .then((Feed: Api.FeedArray) => {
          setRecommended(Feed.Post);
        })
        .catch((e) => {
          CustomToast.errorDefaultToast(e);
        });
    timeout(500);
  }, [location]);
  return (
    <div>
      <ResetScroll/>
      <div
        className="container mb-5"
        style={{paddingInline: '7%', wordBreak: 'break-all'}}
      >
        <div className="PostContent" style={{marginTop: '7%'}}>
          <div style={{width: '100%'}}>
            <div>
              <p className="titleArticle fw-bold ">{Posts.Title}</p>
            </div>
            <div className='m-2'>
              <div className="d-flex flex-row">
                <div className="p-2">
                  <p className="h6 material-icons d-inline">calendar_month</p>
                  <p className='h6 fw-bold d-inline '> {(new Date(Posts.Date)).toLocaleDateString(undefined, dateFormatShort)}</p>
                </div>
                <div className="p-2">
                  <span className="h6 material-icons">
                    schedule
                  </span>
                  <div className=' d-inline'>
                    <p className=' h6 ml-4 d-inline fw-bold' >  {wordPerMinute(Posts.Content)} minutos de lectura</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src={Posts.Imagen} className='rounded-3 coverPage'></img>
            </div>
          </div>
        </div>
        <div className="textArticle">
          {Posts.Content === '' ? (
            <SpinerB />
          ) : (
            <><ReactMarkdown
              components={{code: CustomRenders.Code, img: CustomRenders.img, a: CustomRenders.Link}}
            >{Posts.Content}</ReactMarkdown></>
          )}
        </div>
        <div>
          <div className="p-2">
            <p > {Posts.Tags !== null ?
            Posts.Tags.map((object, key) => <Tags tag={object} key={key}/>) :
            null}</p>
          </div>
        </div>
        <div className='d-flex justify-content-center  rounded-4 m-1 p-5' >
          <div className='  bg-dark p-4 d-flex flex-column'>
            <span className="fs-3 text-center">Share this article</span>
            <div className='d-flex mb-3 justify-content-center fs-1'>
              <a className="link-light" href='https://www.facebook.com/'>
                <FontAwesomeIcon className='p-4' icon={faFacebookF} />
              </a>
              <a className='link-light' href='https://twitter.com'>
                <FontAwesomeIcon className='p-4' icon={faTwitter} />
              </a>
              <a className='link-light' href={'https://www.linkedin.com/'} >
                <FontAwesomeIcon className='p-4' icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className='fs-3'>Recommended </p>
            <div className='d-flex flex-row bd-highlight mb-3'>
              {indexcardRender(Recommended)}
            </div>
          </div>
        </div>
        <Toolkit Id={Params.get('id')} />
      </div>
    </div>
  );
}

export default Page;
