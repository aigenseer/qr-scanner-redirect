/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
import React, {useEffect, useState} from 'react';


export interface IFileDialogProps {
    open: boolean;
    onSelectFile(file: File|null): void;
}


export default function FileDialog(props: IFileDialogProps) {
    let inputFile: HTMLInputElement | null;

    useEffect(() => {
        if(props.open) handleFileDialog()
    });

    function handleFileDialog()
    {
        if(inputFile === null) return;
        inputFile.click();
    }

    function selectFiles(files: FileList, event: any)
    {
        let file = files[0];
        if (!file || inputFile === null) {
            event.target.value = '';
            props.onSelectFile(null);
            return;
        }
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

    if(!props.open){
        return null;
    }

    return (
        <div style={{'display': 'none'}}  >
            <input type='file' ref={e => inputFile = e} accept=".png, .jpg, .jpeg" onChange={handleFileInputClicked} onClick={handleClickedFileInput}  capture="camera"/>
        </div>
    );
}
