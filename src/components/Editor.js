import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef, useEffect } from 'react';
import axios from "axios";

const MyEditor = () => {
    const editorRef = useRef();
    let imageList = [];
    var re = /(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/g;
  
    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.getInstance().removeHook("addImageBlobHook");
        editorRef.current
          .getInstance()
          .addHook("addImageBlobHook", (blob, callback) => {
            (async () => {
              let formData = new FormData();
              formData.append("file", blob);
  
              axios.defaults.withCredentials = true;
              const { data: url } = await axios.post(
                `/api/upload`,
                formData,
                {
                  header: { "content-type": "multipart/formdata" },
                }
              );
              imageList.push(url);
              callback(url, "alt text");
            })();
  
            return false;
          });
      }
  
      return () => {};
    }, [editorRef]);
  
    const btnClickListener = () => {
      const editorInstance = editorRef.current.getInstance();
      const getContent_md = editorInstance.getMarkdown();
  
      console.log("markdown--");
      console.log(getContent_md);
  
      var _finalImageList = [...getContent_md.matchAll(re)];
      var finalImageList = [];
      _finalImageList.forEach((finalImage) => finalImageList.push(finalImage.groups.filename));
      
      console.log("final image list: ", finalImageList);
    }
    
    return (
      <>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />
        <button onClick={btnClickListener}>내용 확인</button>
      </>
    );
  
  }

  export default MyEditor;