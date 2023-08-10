import React from 'react';
import {useState} from 'react';
import './../Css/FileDropDiv.css';
import Qfetch from '../Logic/Http_Ferch';

function DropFile() {
  const [BackgraundDrop, setBackgraundDrop] = useState('rgb(105, 105, 105)');
  const dropHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setBackgraundDrop('rgb(105, 105, 105)');
    ev.dataTransfer.items[0].getAsFile()?.arrayBuffer().then((e)=>Qfetch.uploadFile((e)));
  };
  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setBackgraundDrop('rgb(0, 17, 255)');
    event.preventDefault();
  };
  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const id = (event.target as HTMLDivElement).id;
    event.dataTransfer.setData('text', id);
  };

  return (
    <div
      draggable="true"
      className="drop-area mt-3 mb-2 p-3"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragStart={dragStartHandler}
      style={{borderColor: BackgraundDrop}}
    >
      <div>
        <form className="my-form">
          <p >
              Upload multiple files with the file dialog or by dragging and
              dropping images onto the dashed region
          </p>
          <input type="file" id="fileElem" multiple accept="image/*" />
        </form>
      </div>
    </div>
  );
}


export default DropFile;
