import React, {useEffect, useState} from 'react';
import {CardRender} from '../Componets/cards';
import './../Css/index.css';
import config from '../Config.json';
import {Api} from '../types';
import CustomToast from '../Componets/defaulttoast';
import isMobile from 'is-mobile';
import {scrollAcction} from '../Logic/Toolkit';
import {responseJson} from '../Logic/ToolkitFerch';
import SpinerB from '../Componets/spiner';


function indexcardRender(args: Api.Feed[]): JSX.Element[] | undefined {
  args= isMobile() ? args:args.slice(1);
  if (args !== null) {
    return args.map((item: Api.Feed, index) => (
      <div className="col" key={index}>
        <CardRender.Card3
          Imagen={item.Imagen}
          Title={item.Title}
          Content={item.Description}
          Date={(item.Date).toString()}
          id={`./Pages?id=${item.ID}`}
        />
      </div>
    ));
  }
}


function Index() {
  const [Cards, setCards] = useState<Api.Feed[]>([]);
  const [Cols, setCols] = useState('·');
  let cardsControl = 0;
  let awaitFetch = false;
  const fetchApi = (item: Number) => {
    fetch(`${config.ApiBackend}${config.ApiRoutes.Blog[0].GetFeed}?next=${item}`)
        .then((response) => responseJson(response))
        .then((Feed: Api.FeedArray) => {
          if (Feed.Post === null) {
            document.removeEventListener('scroll', ScrollAction);
            return;
          }
          setCards((prevFeed) => [...prevFeed, ...Feed.Post]);
          awaitFetch = true;
          cardsControl++;
        })
        .catch((e) => {
          CustomToast.errorDefaultToast(e);
        });
  };

  const ScrollAction = () => {
    scrollAcction(() => {
      if (awaitFetch) {
        awaitFetch = false;
        fetchApi(cardsControl);
      }
    });
  };

  useEffect(() => {
    fetchApi(0);
    document.addEventListener('scroll', ScrollAction);
    isMobile() ? setCols('row row-cols-1') : setCols('row  row-cols-3');
    return () => {
      document.removeEventListener('scroll', ScrollAction);
    };
  }, []);
  return (
    <div className="container MenuPading">
      <div className="Cards">
        <p className="fw-light fs-5">Latest Publications.
          {Cards.length==0 && <div className='vh-100'><SpinerB/>
          </div>}
        </p>
        {
          Cards.length!==0 && !isMobile() && (
            <div className="d-flex flex-row mb-4">
              <div>
                <CardRender.Card2
                  Imagen={Cards[0].Imagen}
                  Title={Cards[0].Title}
                  Content={Cards[0].Description}
                  Date={((Cards[0].Date).toString())}
                  id={`/Pages?id=${Cards[0].ID}`}/>
              </div>
            </div>
          )
        }

        <div className={Cols}>
          { indexcardRender(Cards)}
        </div>
      </div>
    </div>
  );
}

export default Index;
