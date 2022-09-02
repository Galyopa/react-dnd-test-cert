import { FC, useState } from "react";
import { addCertificate } from "../app/features/certificates";
import { useAppDispatch } from "../app/hooks";
import { v4 } from "uuid";
import { Certificate } from "../react-app-env";
import "./drag-area.scss";
const ASN1 = require("@lapo/asn1js");
const Base64 = require("@lapo/asn1js/base64");

export const AddCertificate: FC = () => {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

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

    const files = [...event.dataTransfer.files];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file as Blob);

      reader.onerror = function () {
        if (reader.error?.message) {
          setError(reader.error.message);
        }
      };

      reader.onload = function () {
        if (file.type !== "application/x-x509-ca-cert") {
          setError('Сертифікат миє бути ".cer"');
        } else {
          setError("");
        }

        const key = reader.result?.toString().split(",")[1];
        let result;

        if (key && error) {
          try {
            result = ASN1.decode(Base64.unarmor(key));

            const tbsCertificate = result.sub[0];

            const id = v4();
            const issuerName: string =
              tbsCertificate.sub[3].sub[0].sub[0].sub[1].content();
            const commonName: string =
              tbsCertificate.sub[5].sub[1].sub[0].sub[1].content();
            const validFrom: string = tbsCertificate.sub[4].sub[0].content();
            const validTo: string = tbsCertificate.sub[4].sub[1].content();

            const newCertificate: Certificate = {
              id,
              issuerName,
              commonName,
              validFrom,
              validTo,
            };

            dispatch(addCertificate(newCertificate));
          } catch (error) {
            setError(error as string);
          }
        }
      };
    });
  };

  return (
    <>
      {drag ? (
        <div
          className="drag-area drag-area--active"
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={dragDropHandler}
        >
          Відпустіть файли для завантаження
        </div>
      ) : (
        <div
          className="drag-area"
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
        >
          {error ? (
            <p className="drag-area__error">{error}</p>
          ) : (
            "Перетягніть файл сертифікату у поле"
          )}
        </div>
      )}
    </>
  );
};
