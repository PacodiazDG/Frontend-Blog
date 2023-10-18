import {LightAsync as SyntaxHighlighter} from 'react-syntax-highlighter';
import {xt256} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React, {useEffect, useRef, useState} from 'react';
import configData from '../Config.json';

export const CustomRenders = {
  Code({className, children}:
     { className?: string | undefined, children: any } ) {
    if ( className===undefined ) {
      className='text';
    }
    return (
      <div className='rounded'>
        <SyntaxHighlighter
          style={xt256}
          language={ className.replace('language-', '')}>
          {children}
        </SyntaxHighlighter>
      </div>
    );
  },
  //
  img({node, inline, className, children, ...props}:any) {
    const [Width, setWidth] = useState(0);
    const elementRef = useRef(null as null | HTMLDivElement);
    useEffect(() => {
      if (elementRef.current && elementRef.current.clientHeight) {
        const clientWidth = elementRef.current.clientWidth;
        setWidth(clientWidth);
      }
    }, []);
    if (/^(www|http:|https:)+[^\s]+[\w]$/.test(props.src)) {
      return (
        <div ref={elementRef}>
          <a href={`${props.src}`} target='_blank' rel="noreferrer">
            <img
              className="textArticleimg rounded-3"
              loading="lazy"
              alt={props.alt}
              src={`${props.src}?rs=${Width}`}
              title={props.title}
            /></a>
        </div>
      );
    } else {
      return (
        <div ref={elementRef}>
          <a href={`${configData.ImgSoruce}${props.src}`} target='_blank' rel="noreferrer">
            <img
              className="textArticleimg rounded-3"
              loading="lazy"
              alt={props.alt}
              src={`${configData.ImgSoruce}${props.src}?rs=${Width}`}
              title={props.title}
            /></a>
        </div>
      );
    }
  },
  Link({...props}:any) {
    return (
      <a href={props.href} target='_blank' rel="noreferrer">{props.href}</a>
    );
  },
};
