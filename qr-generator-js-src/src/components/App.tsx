import React , { useState, useEffect }  from 'react';
import QRCode                           from "qrcode";


export interface IAppProps{
    url: string|null;
    size: string|null;
}

export default function App(props: IAppProps)
{
    const [base64, setBase64]   = useState<string|null>(null);
    useEffect(() => updateProps(props));
    const [size, setSize]   = useState<number|null>(formatPropToNumber(props.size));

    function updateProps(props: IAppProps)
    {
        updateBase64(props.url);
        setSize(formatPropToNumber(props.size));
    }

    function updateBase64(url: IAppProps["url"])
    {
        if(url === null) return;
        QRCode.toDataURL(url).then(url => setBase64(url)).catch(e => setBase64(null));
    }

    function formatPropToNumber(value: string|null): number|null
    {
        if(value !== null){
            return parseInt(value);
        }
        return null;
    }

    if(base64 === null || props.url === null){
        return null;
    }

    if(size !== null){
        return <img src={base64} alt={props.url} width={size} />
    }

    return (
        <img src={base64} alt={props.url}  />
    );
}
