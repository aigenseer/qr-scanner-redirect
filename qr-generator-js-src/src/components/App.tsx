import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling                          from "qr-code-styling";



export interface IAppProps{
  url: string|null;
  size: string|null;
  jsonOptions: string|null;
}

export default function App(props: IAppProps)
{
  const [url] = useState<string|null>(props.url);
  const [size]   = useState<number|null>(formatPropToNumber(props.size));
  const [parameter]   = useState<object>(getParameterByJSON(props.jsonOptions));
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300
  });

  function formatPropToNumber(value: string|null): number|null
  {
    if(value !== null){
      return parseInt(value);
    }
    return null;
  }

  function getParameterByJSON(json: string|null): object
  {
    try {
      if(json === null) return {};
      return JSON.parse(json);
    }catch (e){
      return {};
    }
  }

  useEffect(() => {
    if(ref.current) qrCode.append(ref.current);
    if(size !== null && url !== null){
      qrCode.update(Object.assign({
        data: url,
        width: size,
        height: size
      }, parameter));
    }
  });

  return (
      <div ref={ref} />
  );
}


