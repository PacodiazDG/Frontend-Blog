import React, {useEffect, useState} from 'react';
import {getParamswithoutSlash} from '../Logic/Toolkit';
import config from '../Config.json';
import {Api} from '../types';
import {CardRender} from '../Componets/cards';

interface search {
  Post: Api.Feed[];
}

function Search() {
  const query = getParamswithoutSlash(window.location.href, 'q');
  const [Query, setQuery] = useState(query);
  const [state, setstate] = useState<search>();
  useEffect(() => {
    fetch(`${config.ApiBackend}${config.ApiRoutes.Blog[0].FindPost}?q=${Query}`)
        .then((data) => data.json())
        .then((data: search) => {
          setstate(data);
        }).catch;
  }, [Query]);
  return (
    <div className="container w-100">
      <p>Search:</p>
      <div className="input-group mb-3">
        <input
          type="email"
          className=" rounded-bottom form-control bg-dark text-white "
          placeholder=""
          value={Query as string}
          onChange={React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }, [])}
        />
        <div className="input-group-prepend">
          <span
            className="material-symbols-outlined input-group-text bg-dark text-white btn border border-white">search</span>
        </div>
      </div>

      <div>
        {state?.Post !== null && state?.Post !== undefined ? (
          state.Post.map((number, key) => (
            <CardRender.Card1
              key={key}
              Title={number.Title}
              id={number.ID}
              Date={new Date(number.Date).toDateString()}
              Imagen={number.Imagen}
              Content={number.Description}
            />
          ))
        ) : (
          <p>did not match any documents.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
