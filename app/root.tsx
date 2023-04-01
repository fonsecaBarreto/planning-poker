import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { WsProvider } from "./contexts/WebSocket";
import { UserProvider } from "./contexts/User";
import { json, LinksFunction, LoaderArgs } from "@remix-run/node";
import globalStylesUrl from "./styles/global.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <UserProvider>
          <WsProvider>
            <Outlet />
          </WsProvider>
        </UserProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    }
  ];
};