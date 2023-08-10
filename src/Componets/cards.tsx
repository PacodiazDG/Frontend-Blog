import ReactMarkdown from 'react-markdown';
import React, {NavLink} from 'react-router-dom';
import './../Css/Cards.css';
import {CustomRenders} from './rendermarkdown';
import {Api} from '../types';
import {useState, useRef, useEffect} from 'react';
import {dateFormatShort} from '../Logic/Toolkit';

interface Size {
  clientWidth: number;
  clientheight: number;
}

const CardRender = {
  Card3(props: Api.CardsObj) {
    const [divSizeImage, setWidth] = useState<Size>({clientheight: 0, clientWidth: 0});
    const elementRef = useRef(null as null | HTMLDivElement);
    useEffect(() => {
      if (elementRef.current && elementRef.current.clientHeight) {
        const DivWidth = elementRef.current.clientWidth;
        const Divheight= elementRef.current.clientHeight;
        setWidth({
          clientWidth: DivWidth,
          clientheight: Divheight,
        });
      }
    }, []);
    return (
      <div className="col-sm Card1">
        <NavLink
          to={props.id}
          style={{color: 'inherit', textDecoration: 'inherit'}}
          isActive={(match: { params: { id: string; }; }, location: any) => {
            console.log(match);
            if (!match) {
              return false;
            }
            const eventID = parseInt(match.params.id);
            return !isNaN(eventID) && eventID % 2 === 1;
          }}
        >
          <div className="" ref={elementRef}>
            <img
              className="rounded-3 Imagecard w-100 "
              src={props.Imagen+'?rs='+divSizeImage.clientWidth}
              alt=""
              loading="lazy"
              width={divSizeImage.clientWidth}
              height={divSizeImage.clientWidth/2}
            ></img>
          </div>
          <p className="fs-4 fw-bolder"> {props.Title}</p>
          <p className="text-justify ">
            <ReactMarkdown
              components={{code: CustomRenders.Code}}
              skipHtml={true}
            >
              {props.Content}
            </ReactMarkdown>
          </p>

          <p className="fs-6 fw-bold text-white-50">{(new Date(props.Date)).toLocaleDateString(undefined, dateFormatShort)}</p>
        </NavLink>
      </div>
    );
  },

  Card1(props: Api.CardsObj): JSX.Element {
    return (
      <div className=" mt-5">
        <div>
          <NavLink to={`/Pages?id=${props.id}`}>{props.Title}</NavLink>
        </div>
        <div>
          <p className=""> {props.Content}</p>
        </div>
        <p className="">{props.Date}</p>
      </div>
    );
  },
  Card2(props: Api.CardsObj): JSX.Element {
    const [divSizeImage, setWidth] = useState<Size>({clientheight: 0, clientWidth: 0});
    const elementRef = useRef(null as null | HTMLDivElement);
    useEffect(() => {
      if (elementRef.current && elementRef.current.clientHeight) {
        const DivWidth = elementRef.current.clientWidth;
        const Divheight= elementRef.current.clientHeight;
        setWidth({
          clientWidth: DivWidth,
          clientheight: Divheight,
        });
      }
    }, []);
    return (
      <NavLink
        to={props.id}
        style={{color: 'inherit', textDecoration: 'inherit'}}
      >
        <div className="d-flex">
          <div className="p-2 w-50" ref={elementRef}>
            <img
              className="rounded-3 Imagecard w-100  h-100"
              src={props.Imagen+'?rs='+divSizeImage.clientWidth}
              alt=""
              loading="lazy"
            ></img>
          </div>
          <div className='p-4 align-self-center'>
            <p className="display-6 fw-bolder">{props.Title}</p>
            <p className="text-justify ">
              <ReactMarkdown
                components={{code: CustomRenders.Code}}
                skipHtml={true}
              >
                {props.Content}
              </ReactMarkdown>
            </p>
            <div className='pb-4'>
              <button type="button" className="border border-0 btn skblue btn-sm  text-light">READ MORE</button>
            </div>
            <p className="fs-6 fw-bold text-white-50">{(new Date(props.Date)).toLocaleDateString(undefined, dateFormatShort)}</p>
          </div>


        </div>
      </NavLink>);
  },
};
export {CardRender};
