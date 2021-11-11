import { Editor, Viewer } from '@toast-ui/react-editor';
import React, { useRef, useEffect } from 'react';
import axios from "axios";
import '@toast-ui/editor/dist/toastui-editor.css';

const MyEditor = ({initialValue, isViewer, setContent}) => {
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
      const getContent_html = editorInstance.getHTML();
  
      console.log("markdown--");
      console.log(getContent_md);
      console.log("html--");
      console.log(getContent_html);
  
      var _finalImageList = [...getContent_md.matchAll(re)];
      var finalImageList = [];
      _finalImageList.forEach((finalImage) => finalImageList.push(finalImage.groups.filename));
      
      console.log("final image list: ", finalImageList);
    }
    
    return (
        isViewer?
        <div>
               <Viewer 
                    initialValue={initialValue}
                    height="600px"
               />
               <script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.js"></script>
        </div>
        :
        <>
            <Editor
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                ref={editorRef}
                initialValue={initialValue}
                onChange={() => {
                  const editorInstance = editorRef.current.getInstance();
                  const getContent_html = editorInstance.getHTML();
                  console.log(getContent_html);
                  setContent(getContent_html);
                }}
                />
           
        </>
      
    );
  
  }

  export default MyEditor;

