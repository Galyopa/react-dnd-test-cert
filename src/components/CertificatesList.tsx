import classNames from "classnames";
import { FC } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) =>
  classNames("cert__link", { "cert__link--active": status.isActive });

export const CertificatesList: FC = () => {
  const certificates = useAppSelector(
    (state) => state.certificates.certificates
  );
  const { pathname } = useLocation()

  return (
    <>
      <aside className="cert__aside">
        <ul className="cert__list">
          {certificates.map((certificate) => (
            <li className="cert__item" key={certificate.id}>
              <NavLink className={getActiveClasses} to={certificate.id}>
                <h2>{certificate.commonName}</h2>
              </NavLink>
            </li>
          ))}
        </ul>
        {pathname === '/add' ? (
          <Link
            className={classNames("cert__btn", {
              "cert__btn--active": pathname === '/add',
            })}
            to="/"
          >
            Скасувати
          </Link>
        ) : (
          <Link
            className="cert__btn"
            to="/add"
          >
            Додати
          </Link>
        )}
      </aside>

      <div className="cert__left-side">
        <Outlet />
      </div>
    </>
  );
};
