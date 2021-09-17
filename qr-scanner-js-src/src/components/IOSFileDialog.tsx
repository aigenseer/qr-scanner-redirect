/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
import React from 'react';


export interface IFileDialogProps {
    onSelectFile(file: File|null): void;
}


export default function IOSFileDialog(props: IFileDialogProps) {
    function selectFiles(files: FileList, event: any)
    {
        let file = files[0];
        if (!file) {
            props.onSelectFile(null);
            return;
        }
        event.target.value = '';
        props.onSelectFile(file);
    }

    function handleFileInputClicked(event: any){
        window.removeEventListener('focus', handleFocusBack);
        if(event.target.files !== undefined){
            event.persist()
            selectFiles(event.target.files, event);
        }
    }

    function handleFocusBack(){
        window.removeEventListener('focus', handleFocusBack);
    }

    function handleClickedFileInput(){
        props.onSelectFile(null);
        window.addEventListener('focus', handleFocusBack);
    }

    return (
        <div>
            <input type='file' accept=".png, .jpg, .jpeg" onChange={handleFileInputClicked} onClick={handleClickedFileInput}  capture="camera"/>
        </div>
    );
}
