import React from 'react';
import './../Css/List.css';
import configData from '../Config.json';

function Footerweb() {
  return (
    <footer>
      <div className="mt-5 pt-5 pb-5 skydark">
        <div className="container text-center">
          <div className="row  ">
            <div className="col">
              <div className="p-3">
                <p className='fw-bold'>{configData.NameSite}</p>
              </div>
            </div>
            <div className="col ">
              <div className="p-3 ">
                <p className='fw-bold'>ABOUT US</p>
              </div>
              <div className="p-3 "><a href='https://github.com/PacodiazDG' className='link-light'>Github</a></div>
              <div className="p-3"><a href='https://github.com/PacodiazDG/Backend-blog' className='link-light'>Project Repository</a></div>
            </div>
            <div className="col">
              <div className="p-3">
                <p className='fw-bold'>About Blog Engine</p>
              </div>
              <div className="p-3">
                <a href='https://github.com/PacodiazDG/Backend-blog' className='link-light'>Requirements</a></div>
              <div className="p-3">
                <a href='https://github.com/PacodiazDG/Backend-blog' className='link-light'>Installation</a></div>
              <div className="p-3">
                <a href='https://github.com/PacodiazDG/Backend-blog' className='link-light'>Documentation</a></div>

            </div>
            <div className="col">
              <div className="p-3">Subscribe for blogs, news and more</div>
              <form className="form-floating ">
                <input type="email" className="form-control bg-dark text-light" id="floatingInputValue" placeholder="name@example.com"/>
                <label htmlFor=" floatingInputValue bg-dark text-light">Email</label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footerweb;
