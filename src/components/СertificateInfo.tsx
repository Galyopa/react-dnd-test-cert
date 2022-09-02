import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const CertificateInfo: FC = () => {
  const { cerId } = useParams();
  const certificates = useAppSelector(
    (state) => state.certificates.certificates
  );
  const cerContent = certificates.find((cer) => cer.id === cerId);

  return (
    <div className="cert__info">
      <p>{cerContent?.commonName}</p>
      <p>{cerContent?.issuerName}</p>
      <p>{cerContent?.validFrom}</p>
      <p>{cerContent?.validTo}</p>
    </div>
  );
};
