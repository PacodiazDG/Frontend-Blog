import './../Css/Tags.css';
import React from 'react';

function Tags(params: {
  tag: String;
}) {
  return <span className="badge bg-dark Tags ">{params.tag}</span>;
}

export default Tags;
