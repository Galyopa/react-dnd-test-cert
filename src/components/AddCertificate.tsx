import { FC, useState } from "react";
const ASN1 = require('@lapo/asn1js');
const Base64 = require('@lapo/asn1js/base64')

export const AddCertificate: FC = () => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
  };

  const dragDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);

    const files = event.dataTransfer.files;
    console.log(files);
    const result = ASN1.decode(files.item(0)?.stream());

    if (result.typeName() !== 'SEQUENCE') {
      throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
    }

    const tbsCertificate = result.sub[0];

    console.log(tbsCertificate);
  };

  return (
    <div>
      {drag ? (
        <div
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={dragDropHandler}
        >
          Відпустіть файли для завантаження
        </div>
      ) : (
        <div
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
        >
          Перетягніть файл сертифікату у поле
        </div>
      )}
    </div>
  );
};
