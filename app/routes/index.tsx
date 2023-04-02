import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import indexStylesUrl from "~/styles/index.css";

export default function Index() {
  return (
    <div className="index-layout">
      <h1>
        <small> Lucas Fonseca | Fck© </small>
        <span>
          Planning <br /> p<i style={{fontSize: 148}}>&clubs;</i>ker
        </span>
      </h1>
      <nav>
        <br />
        <ul>
          <li>
            <Link to="tasks" className="button">
              Iniciar
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Planning poker" }];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: indexStylesUrl,
    },
  ];
};
