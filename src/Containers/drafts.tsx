import React, {useEffect, useState} from 'react';
import CustomToast from '../Componets/defaulttoast';
import ListOfItemsIndex from '../Componets/list';
import './../Css/Drafts.css';
import configData from '../Config.json';
import {Api} from '../types';
import Qfetch from '../Logic/Http_Ferch';
import {responseJson} from '../Logic/ToolkitFerch';

const thisPage: boolean = false;

function Drafts() {
  const [Iems, setIems] = useState<Api.FeedArray>({'Post': []});
  let count = 1;

  const httpRqst = (Endpoint: string) => {
    return Qfetch.ahutRqst(`${configData.ApiBackend}/v1/drafts/${Endpoint}`)
        .then((response) => response)
        .then((R)=>responseJson(R))
        .catch((Error) => {
          CustomToast.errorDefaultToast(Error);
          return null;
        });
  };


  const initPost= React.useCallback(()=>{
    Qfetch.ahutRqst(configData.ApiBackend+configData.ApiRoutes.Admin[0].initialize)
        .then((r)=>{
          CustomToast.okDefaultToast('The draft has been created successfully.');
          fetchMyAPI();
          return responseJson(r);
        }).catch((e)=>{
          CustomToast.errorDefaultToast(e);
        });
  }, []);
  /**
   * Get the scroll position and get the following drafts
   */
  const scroll = async () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height =document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = winScroll / height;
    if (scrolled === 1) {
      scrolled = 0;
      const Results: Api.FeedArray = await httpRqst('GetMyDrafts?next=' + count);
      if (Results.Post === null) {
        return;
      }
      setIems((prevState) => ({Post: [...prevState.Post, ...Results.Post]}));
      count++;
    }
  };


  function fetchMyAPI() {
    Qfetch.ahutRqst(`${configData.ApiBackend}/v1/drafts/GetMyDrafts`)
        .then((r)=>responseJson(r))
        .then((r:Api.FeedArray)=>{
          setIems((prevState) => ({...prevState, Post: r.Post}));
        },
        )
        .catch((e)=>{
          CustomToast.errorDefaultToast(e);
        });
  }

  useEffect(() => {
    if (!thisPage) {
      fetchMyAPI();
      window.addEventListener('scroll', scroll);
    }
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [thisPage]);

  return (
    <div className=" MenuPading">
      <div className=" container ContainerOfItemFeed">
        <h1>Your stories</h1>
        <div>
          <button type="button" className="border  border-light btn btn-outline-light " onClick={initPost}>Create Post</button>
        </div>
        <div className="mt-4">
          { Iems.Post!=null? Iems.Post.map((item, key) => (
            <ListOfItemsIndex
              key={key}
              Title={item.Title}
              Description={item.Description}
              Tags={item.Title}
              Date={new Date(item.Date)}
              id={item.ID}
              stateDrafts={setIems}
              State={Iems}
              type="draft" />
          )):null
          }
        </div>
      </div>
    </div>
  );
}

export default Drafts;
