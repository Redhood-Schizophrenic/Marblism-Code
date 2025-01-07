var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, useLocation, useParams, useNavigate, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useSearchParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useEffect, useState, createContext as createContext$1, useContext, useRef } from "react";
import Posthog from "posthog-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createTRPCReact as createTRPCReact$1 } from "@trpc/react-query";
import { Result, Button, Flex, Typography, Divider, Layout as Layout$1, Spin, theme, ConfigProvider, message, Menu, Avatar, Tag, Row, Col, Form, Alert, Input, Space, Select, Card, Modal, Carousel } from "antd";
import { LoadingOutlined, TwitterCircleFilled, LinkedinFilled, ArrowRightOutlined, MenuOutlined, CloseOutlined, ArrowDownOutlined, CheckCircleFilled, StarFilled, StarOutlined, LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { ZodError, z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import { enhance, isPrismaClientKnownRequestError } from "@zenstackhq/runtime";
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import { v4 } from "uuid";
import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import * as fs from "fs";
import * as os from "os";
import * as Path from "path";
import { join } from "path";
import { zfd } from "zod-form-data";
import passport from "passport";
import { config } from "dotenv";
import { Strategy } from "passport-google-oauth20";
import Bcrypt from "bcryptjs";
import Mailjet from "node-mailjet";
import * as NodemailerSDK from "nodemailer";
import sharp from "sharp";
import * as _Schema from "@zenstackhq/runtime/zod/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toGeminiSchema } from "gemini-zod";
import OpenaiSDK from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { twMerge } from "tailwind-merge";
import clsx$1, { clsx } from "clsx";
const ABORT_DELAY = 5e3;
function handleRequest$1(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest$1
}, Symbol.toStringTag, { value: "Module" }));
const restoreUrl = (route, params) => {
  let routeRestored = route;
  Object.entries(params).forEach(
    ([key, value]) => routeRestored = routeRestored.replace(value, `:${key}`)
  );
  return routeRestored;
};
const useMessageSend = (isActive = false) => {
  const pathname = useLocation().pathname;
  const params = useParams();
  useEffect(() => {
    if (!isActive) {
      return;
    }
    window.parent.postMessage({ type: "ready" }, "*");
  }, [isActive]);
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const url = `${window.location.origin}${pathname}`;
    const pathPure = restoreUrl(pathname, params);
    window.parent.postMessage({ type: "navigation", url, pathPure }, "*");
  }, [isActive, pathname, params]);
};
const useMessageReceived = (isActive = false) => {
  const router = useNavigate();
  const handleMessage = (event) => {
    var _a2, _b;
    const canContinue = ((_a2 = event == null ? void 0 : event.data) == null ? void 0 : _a2.type) === "navigation";
    if (canContinue) {
      const path = (_b = event.data.path) == null ? void 0 : _b.trim();
      if (path && path !== "") {
        router(path);
      }
    }
  };
  useEffect(() => {
    if (!isActive) {
      return;
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isActive]);
};
const useWorkspace = () => {
  useState(false);
  const isActive = false;
  useMessageSend(isActive);
  useMessageReceived(isActive);
  useEffect(() => {
  }, [isActive]);
  return {};
};
const WorkspaceProvider = ({ children }) => {
  useWorkspace();
  return /* @__PURE__ */ jsx(Fragment, { children });
};
function createTRPCReact(opts) {
  const r = createTRPCReact$1(opts);
  return r;
}
const Api = createTRPCReact();
const transformer = superjson;
const Provider$1 = ({ children }) => {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
          // Disable retries globally for queries
        },
        mutations: {
          retry: false
          // Disable retries globally for mutations
        }
      }
    })
  );
  const [trpcClient] = useState(
    () => Api.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: "/api/trpc"
        })
      ]
    })
  );
  return /* @__PURE__ */ jsx(Api.Provider, { client: trpcClient, queryClient, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }) });
};
const TrpcClient = {
  Provider: Provider$1
};
const UserContext = createContext$1(void 0);
const UserProvider = ({ children }) => {
  const {
    data: session,
    refetch,
    ...querySession
  } = Api.authentication.session.useQuery();
  const user = session == null ? void 0 : session.user;
  const checkRole = (roleName) => {
    return !!((user == null ? void 0 : user.globalRole) === roleName);
  };
  const isLoading = querySession.isLoading;
  const isLoggedIn = !!(session == null ? void 0 : session.user);
  let status = "unauthenticated";
  if (isLoading) {
    status = "loading";
  } else if (isLoggedIn) {
    status = "authenticated";
  }
  return /* @__PURE__ */ jsx(
    UserContext.Provider,
    {
      value: {
        user: session == null ? void 0 : session.user,
        checkRole,
        refetch,
        authenticationStatus: status,
        isLoggedIn,
        isLoading
      },
      children
    }
  );
};
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === void 0) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleReload", () => {
      window.location.reload();
    });
    __publicField(this, "handleGoHome", () => {
      window.location.href = "/";
    });
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }
  render() {
    if (this.state.hasError && this.state.error) {
      return /* @__PURE__ */ jsx(
        Result,
        {
          status: "error",
          title: "Something went wrong in your code.",
          subTitle: "There was an unexpected error in the application. Check the details below for debugging.",
          style: { background: "white" },
          extra: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Button, { type: "primary", onClick: this.handleReload, children: "Reload Page" }),
            /* @__PURE__ */ jsx(Button, { type: "primary", onClick: this.handleGoHome, children: "Back Home" }),
            /* @__PURE__ */ jsxs(Flex, { vertical: true, className: "mt-5", style: { textAlign: "left" }, children: [
              /* @__PURE__ */ jsx(Typography.Title, { level: 5, children: "Error Message" }),
              /* @__PURE__ */ jsx("pre", { style: { whiteSpace: "pre-wrap" }, children: this.state.error.message }),
              /* @__PURE__ */ jsx(Divider, {}),
              /* @__PURE__ */ jsx(Typography.Title, { level: 5, children: "Stack Trace" }),
              /* @__PURE__ */ jsx("pre", { style: { whiteSpace: "pre-wrap" }, children: this.state.error.stack })
            ] })
          ] })
        }
      );
    }
    return this.props.children;
  }
}
const MrbSplashScreen = () => {
  const [isPageInitialised, setPageInitialised] = useState(false);
  useEffect(() => {
    setPageInitialised(true);
  }, []);
  if (!isPageInitialised) {
    return /* @__PURE__ */ jsx("div", {});
  }
  return /* @__PURE__ */ jsx(
    Layout$1,
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ jsx(Spin, { indicator: /* @__PURE__ */ jsx(LoadingOutlined, { spin: true }), size: "large" })
    }
  );
};
const { useToken } = theme;
const MrbHtml = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const { token } = useToken();
  useEffect(() => {
    if (isLoading) {
      setLoading(false);
      return;
    }
    document.documentElement.style.backgroundColor = token.colorBgBase;
    document.documentElement.style.color = token.colorTextBase;
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.color = "";
    };
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Fragment, { children: isLoading ? /* @__PURE__ */ jsx(MrbSplashScreen, {}) : children });
};
const Logo = ({
  height = 50,
  isLabel = false,
  style,
  ...props
}) => {
  const router = useNavigate();
  const goTo = (url) => {
    router(url);
  };
  return /* @__PURE__ */ jsxs(Flex, { align: "center", gap: 10, onClick: () => goTo("/home"), children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/r9slb6-kuvamtemplate1-jC33",
        ...props,
        alt: "Logo",
        height,
        style: {
          borderRadius: "5px",
          cursor: "pointer",
          objectFit: "contain",
          height: `${height}px`,
          ...style
        },
        onError: (event) => {
          const target = event.target;
          target.onerror = null;
          target.src = "https://i.imgur.com/2dcDGIE.png";
        }
      }
    ),
    isLabel && /* @__PURE__ */ jsx(Typography.Title, { level: 4, style: { margin: "0px" }, children: "Kuvam Template 1" })
  ] });
};
const LandingFooter = ({ ...props }) => {
  const socials = [
    {
      name: "X",
      icon: /* @__PURE__ */ jsx(TwitterCircleFilled, {}),
      link: "https://twitter.com/"
    },
    {
      name: "LinkedIn",
      icon: /* @__PURE__ */ jsx(LinkedinFilled, {}),
      link: "https://linkedin.com/"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "relative mt-16", ...props, children: /* @__PURE__ */ jsx("div", { className: "border-t border-neutral-100  dark:border-neutral-800 px-8 pt-20 pb-32 relative bg-white dark:bg-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto  flex sm:flex-row flex-col justify-between items-start ", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mr-4  md:flex mb-4", children: /* @__PURE__ */ jsx(Logo, { height: 50, isLabel: true }) }),
      /* @__PURE__ */ jsx("div", { children: "Copyright © 2024" }),
      /* @__PURE__ */ jsx("div", { className: "mt-2", children: "All rights reserved" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-10 items-start mt-10 md:mt-0", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center space-y-4 flex-col mt-4", children: socials.map((link) => /* @__PURE__ */ jsx(
      Link,
      {
        className: "transition-colors  text-xs sm:text-sm",
        to: link.link,
        children: link.name
      },
      link.name
    )) }) })
  ] }) }) });
};
const Theme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Colors
    colorPrimary: "black",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorTextBase: "black",
    colorLink: "black",
    colorBgBase: "white",
    colorBgContainer: "white",
    colorBorder: "#d4d4d8",
    colorBorderSecondary: "#e4e4e7",
    colorSplit: "rgba(24, 24, 27, 0.07)",
    // Typography
    // fontFamily: `${interFont.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: "underline",
    //Form
    controlItemBgActive: "#f4f4f5",
    controlOutline: "rgba(24, 24, 27, 0.1)",
    controlHeight: 36,
    controlHeightSM: 32,
    // Layout
    padding: 16,
    boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    borderRadius: 6,
    lineType: "solid",
    lineWidth: 1,
    motion: false
  },
  components: {
    Form: {
      itemMarginBottom: "22px"
    },
    Layout: {
      headerBg: "white",
      // topBar background color
      footerBg: "white",
      // footer background color
      siderBg: "white",
      // leftBar background color
      siderBorderRight: "1px solid #e4e4e7",
      // leftBar border right
      headerBorderBottom: "1px solid #e4e4e7"
      // topBar border bottom
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      //topbar menu items
      horizontalItemSelectedColor: "black",
      horizontalItemSelectedBg: "transparent",
      //leftbar menu items
      itemSelectedColor: "black",
      itemSelectedBg: "transparent",
      itemActiveBg: "transparent",
      //topbar and leftbar menu items
      itemHoverColor: "black",
      itemHoverBg: "transparent",
      itemColor: "#909090",
      itemBg: "transparent",
      iconMarginInlineEnd: 8,
      iconSize: 16
    },
    Button: {
      paddingInlineSM: 11,
      fontWeight: 500
    }
  }
};
const DesignSystemContext = createContext$1({
  isMobile: false,
  message: null
});
const useDesignSystem = () => {
  return useContext(DesignSystemContext);
};
const ProviderGeneral = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isMobile, setMobile] = useState(false);
  const isWindow = typeof window !== "undefined";
  const theme2 = Theme;
  useEffect(() => {
    if (!isWindow) {
      return;
    }
    setMobile(window.innerWidth < 992);
    const handleResize = () => {
      setMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    setLoading(false);
    return () => {
      if (!isWindow) {
        return;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (!isWindow) {
      return;
    }
    const setVhVariable = () => {
      document.documentElement.style.setProperty(
        "--100vh",
        `${window.innerHeight}px`
      );
    };
    setVhVariable();
    window.addEventListener("resize", setVhVariable);
    return () => window.removeEventListener("resize", setVhVariable);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx(ConfigProvider, { theme: theme2, children: /* @__PURE__ */ jsx(DesignSystemContext.Provider, { value: { isMobile, message }, children }) });
};
const DesignSystemProvider = ({ children }) => {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(ProviderGeneral, { children: /* @__PURE__ */ jsx(MrbHtml, { children }) }) });
};
const LandingButton = (props) => {
  const {
    href,
    block,
    size = "md",
    type = "primary",
    className,
    children,
    ...remainingProps
  } = props;
  const sizes = {
    lg: "px-5 py-2.5",
    md: "px-4 py-2",
    sm: "px-2 py-1"
  };
  const styles = {
    outline: "bg-white  hover:text-black dark:hover:text-black border-2 border-black hover:bg-gray-100 text-black dark:bg-black dark:text-white dark:border-white",
    primary: "bg-black text-white hover:text-white dark:hover:text-black  hover:bg-slate-800 border-2 border-transparent dark:bg-white dark:text-black dark:hover:bg-gray-200 ",
    inverted: "bg-white text-black hover:text-black dark:hover:text-black border-2 border-transparent hover:bg-gray-100 dark:bg-black dark:text-white",
    muted: "bg-gray-100 hover:text-black dark:hover:text-black hover:bg-gray-200 border-2 border-transparent text-black dark:bg-gray-700 dark:text-white"
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      ...remainingProps,
      className: twMerge(
        "rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200",
        block && "w-full",
        sizes[size],
        styles[type],
        className
      ),
      children
    }
  );
};
var DesignSystemUtility;
((DesignSystemUtility2) => {
  function buildClassNames(...values) {
    return twMerge(clsx(values));
  }
  DesignSystemUtility2.buildClassNames = buildClassNames;
})(DesignSystemUtility || (DesignSystemUtility = {}));
function LandingNavBarItem({
  children,
  href,
  active,
  target,
  className
}) {
  const pathname = useLocation().pathname;
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: href,
      className: DesignSystemUtility.buildClassNames(
        "text-lg flex items-center justify-center   leading-[110%] px-4 py-2 rounded-md hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 ",
        (active || (pathname == null ? void 0 : pathname.includes(href))) && "text-black dark:text-white",
        className
      ),
      target,
      children
    }
  );
}
const LandingDesktopNavbar = ({ navItems }) => {
  const { isLoggedIn } = useUserContext();
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex relative justify-between px-4 py-2 rounded-full bg-transparent transition duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-2 items-center", children: [
      /* @__PURE__ */ jsx(Logo, { isLabel: true, height: 40 }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 pl-8", children: navItems.map((item) => /* @__PURE__ */ jsx(
        LandingNavBarItem,
        {
          href: item.link,
          target: item.target,
          children: item.title
        },
        item.title
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 items-center", children: [
      isLoggedIn && /* @__PURE__ */ jsxs(LandingButton, { size: "sm", href: "/home", children: [
        "Dashboard ",
        /* @__PURE__ */ jsx(ArrowRightOutlined, {})
      ] }),
      !isLoggedIn && /* @__PURE__ */ jsx(LandingButton, { size: "sm", href: "/login", children: "Get Started" })
    ] })
  ] });
};
const LandingMobileNavbar = ({ navItems }) => {
  const { isLoggedIn } = useUserContext();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between  items-center w-full rounded-full px-2.5 py-1.5 transition duration-200", children: [
    /* @__PURE__ */ jsx(Logo, { isLabel: true, height: 40 }),
    /* @__PURE__ */ jsx(
      MenuOutlined,
      {
        className: "text-black dark:text-white h-6 w-6",
        onClick: () => setOpen(!open)
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-start justify-start space-y-10  pt-5  text-xl text-zinc-600  transition duration-200 hover:text-zinc-800", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full px-5", children: [
        /* @__PURE__ */ jsx(Logo, { isLabel: true, height: 40 }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
          CloseOutlined,
          {
            className: "h-8 w-8 text-black dark:text-white",
            onClick: () => setOpen(!open)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start justify-start gap-[14px] px-8", children: navItems.map((navItem, idx) => /* @__PURE__ */ jsx(Fragment, { children: navItem.children && navItem.children.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: navItem.children.map((childNavItem, idx2) => /* @__PURE__ */ jsx(
        Link,
        {
          to: childNavItem.link,
          onClick: () => setOpen(false),
          className: "relative max-w-[15rem] text-left text-2xl",
          children: /* @__PURE__ */ jsx("span", { className: "block text-black", children: childNavItem.title })
        },
        `link=${idx2}`
      )) }) : /* @__PURE__ */ jsx(
        Link,
        {
          to: navItem.link,
          onClick: () => setOpen(false),
          className: "relative",
          children: /* @__PURE__ */ jsx("span", { className: "block text-[26px] text-black dark:text-white", children: navItem.title })
        },
        `link=${idx}`
      ) })) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full items-start gap-2.5  px-8 py-4 ", children: [
        isLoggedIn && /* @__PURE__ */ jsxs(LandingButton, { size: "sm", href: "/home", children: [
          "Dashboard ",
          /* @__PURE__ */ jsx(ArrowRightOutlined, {})
        ] }),
        !isLoggedIn && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(LandingButton, { href: "/register", size: "sm", children: "Sign Up" }),
          /* @__PURE__ */ jsx(LandingButton, { href: "/login", size: "sm", children: "Login" })
        ] })
      ] })
    ] })
  ] });
};
const LandingNavBar = ({ navItems }) => {
  const { isMobile } = useDesignSystem();
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl  pt-4 mx-auto inset-x-0 z-50 w-[95%] lg:w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-full", children: !isMobile && /* @__PURE__ */ jsx(LandingDesktopNavbar, { navItems }) }),
    /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center", children: isMobile && /* @__PURE__ */ jsx(LandingMobileNavbar, { navItems }) })
  ] });
};
const LandingContainer = ({
  navItems,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx("main", { ...props, children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-black dark:bg-black dark:text-slate-200", children: [
    /* @__PURE__ */ jsx(LandingNavBar, { navItems }),
    children,
    /* @__PURE__ */ jsx(LandingFooter, {})
  ] }) });
};
const LandingCTA = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: "bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-white text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 mt-4 text-lg md:text-xl", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "flex mt-10", children: /* @__PURE__ */ jsx(LandingButton, { href: buttonLink ?? "/register", size: "lg", children: buttonText }) })
      ] }) })
    }
  );
};
const LandingFAQ = ({
  title,
  subtitle,
  questionAnswers,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto ", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl lg:text-4xl font-bold lg:tracking-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/2 max-w-xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid divide-y divide-neutral-200 dark:divide-slate-400", children: questionAnswers.map((item, index) => /* @__PURE__ */ jsx("div", { className: "py-5", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex justify-between text-lg items-center font-medium cursor-pointer list-none", children: [
            /* @__PURE__ */ jsx("span", { children: item.question }),
            /* @__PURE__ */ jsx("span", { className: "transition group-open:rotate-180", children: /* @__PURE__ */ jsx(ArrowRightOutlined, {}) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 mt-3 group-open:animate-fadeIn", children: item.answer })
        ] }) }, index)) }) })
      ] }) })
    }
  );
};
const LandingFeatures = ({
  title,
  subtitle,
  features,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto ", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16", children: features.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex  gap-4 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: " bg-black dark:bg-slate-800 rounded-full flex justify-center items-center w-8 h-8 text-white text-lg", children: item.icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 ", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: item.heading }),
            " ",
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 mt-2 leading-relaxed", children: item.description })
          ] })
        ] }, idx + "feature")) })
      ] })
    }
  );
};
const LandingHero = ({
  title,
  subtitle,
  buttonText,
  pictureUrl,
  socialProof = "",
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "py-8 lg:py-44 px-5  max-w-7xl mx-auto  grid lg:grid-cols-2 place-items-center relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-4 md:p-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400 max-w-xl", children: subtitle }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: /* @__PURE__ */ jsx(
            LandingButton,
            {
              href: "/login",
              className: "flex gap-1 items-center justify-center ",
              rel: "noopener",
              size: "lg",
              children: buttonText
            }
          ) }),
          socialProof && /* @__PURE__ */ jsx("div", { className: "mt-6", children: socialProof })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:absolute right-0 top-0 w-4/5 lg:w-1/2 h-full", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: pictureUrl,
            className: "mask-stripes object-cover w-full h-full",
            alt: "Landing cover"
          }
        ) })
      ] })
    }
  );
};
const LandingHowItWorks = ({
  title,
  subtitle = "",
  steps,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("div", { className: "max-w-xl space-y-8 mt-12 mx-auto", children: steps.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl font-bold ", children: idx + 1 }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4 text-left", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg ", children: item.heading }),
            /* @__PURE__ */ jsx("p", { className: "dark:text-slate-400", children: item.description })
          ] })
        ] }, idx)) })
      ] })
    }
  );
};
const RightArrow = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20fill='%23A2A8B5'%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='800px'%20height='800px'%20viewBox='0%200%20403.963%20403.963'%20xml:space='preserve'%3e%3cg%3e%3cpath%20d='M399.908,160.269c-31.824-15.3-64.26-28.152-89.964-52.632c-5.508-4.896-12.24-1.224-12.853,5.508%20c-1.836,15.3-2.448,29.988-2.448,44.676c-29.375-9.18-69.155-3.06-97.308-5.508c-59.976-4.284-119.952-17.748-179.928-15.912%20c-5.508,0-9.792,6.732-6.732,11.628c15.912,23.868,36.108,43.452,55.08,64.26c-20.196,25.093-44.064,45.9-63.648,71.604%20c-4.284,5.508-1.836,13.464,5.508,14.076c103.428,7.956,194.616-64.872,293.76-82.009c-1.836,18.36-1.224,36.721-0.612,55.08%20c0,6.12,7.956,9.792,12.853,5.509c33.048-33.049,63.647-67.32,89.964-105.876C404.804,167.001,402.968,162.105,399.908,160.269z%20M23.528,282.668c17.136-20.195,35.496-40.392,48.96-63.035c3.672,0.611,7.956-3.673,5.508-7.956%20c-14.076-20.809-31.212-39.168-46.512-59.364c47.736,0.612,94.86,9.18,142.596,14.076c43.452,4.896,89.352,7.344,133.416,8.568%20c5.508,0,7.344-7.344,3.06-10.404c-0.611-0.612-1.224-0.612-1.836-1.224c0-12.24,0.612-24.48,1.836-36.108%20c22.645,17.748,48.349,29.376,74.664,41.616c-21.42,29.988-45.288,57.528-70.38,83.844c-0.612-15.301-1.836-30.601-1.224-45.9%20c0-3.672-3.061-5.508-6.12-5.508c-1.224-1.836-3.06-3.06-6.12-2.448C204.68,209.841,120.836,281.445,23.528,282.668z'/%3e%3c/g%3e%3c/svg%3e";
const LandingPainPoints = ({
  title,
  subtitle,
  painPoints,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl mt-4 text-slate-600 dark:text-slate-400 mb-12", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "md:flex justify-center items-center md:space-x-8", children: painPoints == null ? void 0 : painPoints.map((painPoint, idx) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl mb-4", children: painPoint.emoji }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-lg text-gray-900 dark:text-slate-200", children: painPoint.title })
          ] }) }, idx),
          idx < painPoints.length - 1 && /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx(
            "img",
            {
              src: RightArrow,
              width: "50",
              alt: "arrow",
              className: "dark:invert rotate-90 md:rotate-0 mt-5 mb-5 md:mt-0 md:mb-0"
            }
          ) })
        ] })) }),
        /* @__PURE__ */ jsx("div", { className: "text-center pt-20", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-600 dark:text-slate-400 text-lg", children: [
          /* @__PURE__ */ jsx(ArrowDownOutlined, {}),
          " there is an easier way"
        ] }) }) })
      ] })
    }
  );
};
const LandingPricing = ({
  title,
  subtitle,
  packages,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative group overflow-hidden text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-16 md:mt-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12", children: packages.map((item, idx) => /* @__PURE__ */ jsx(PricingCard, { ...item }, idx + "pricingcard")) })
      ] })
    }
  );
};
const PricingCard = (props) => {
  const { title, description, monthly, features, className, type, highlight } = props;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col w-full order-first lg:order-none border py-5 px-6 relative rounded-lg ${highlight ? "border-orange-500 " : "border-slate-400 "}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          highlight && /* @__PURE__ */ jsx("span", { className: "inline-flex absolute px-3 py-1 text-xs -top-3 left-1/2 -translate-x-1/2 font-medium rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white ", children: "Popular" }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-slate-600 dark:text-slate-400", children: title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-4xl font-bold text-black dark:text-white md:text-4xl", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal", children: "$" }),
            monthly,
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-slate-600 dark:text-slate-400", children: "/month" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "grid mt-8 text-left gap-y-4", children: features.map((item, idx) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-slate-600 dark:text-slate-400",
            children: [
              /* @__PURE__ */ jsx(CheckCircleFilled, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ]
          },
          idx + "pricingfeature"
        )) }),
        /* @__PURE__ */ jsx("div", { className: "flex mt-8", children: /* @__PURE__ */ jsx(
          LandingButton,
          {
            href: "/register",
            block: true,
            type: highlight ? "primary" : "outline",
            children: "Get Started"
          }
        ) })
      ]
    }
  ) });
};
const LandingSocialProof = () => {
  const socialProofImages = [
    { url: "https://i.imgur.com/afwBIFK.png" },
    { url: "https://i.imgur.com/LlloOPa.png" },
    { url: "https://i.imgur.com/j8jPb4H.png" },
    { url: "https://i.imgur.com/mJ1sZFv.png" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-center  text-slate-600 dark:text-slate-400", children: "Featured on" }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-8 md:gap-20 items-center justify-center mt-8 flex-wrap", children: socialProofImages.map((socialProofImage, idx) => /* @__PURE__ */ jsx(
      "img",
      {
        className: "h-6 md:h-10",
        src: socialProofImage.url,
        alt: "landing social logo"
      },
      `logo-${idx}`
    )) })
  ] }) });
};
const LandingAvatar = ({
  className,
  src,
  width = 128,
  height = 128,
  size = "medium",
  ...remainingProps
}) => {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      width,
      height,
      className: clsx$1(
        "rounded-full border-2 border-solid border-primary-100",
        size === "small" ? "w-6 h-6" : "",
        size === "medium" ? "h-9 w-9" : "",
        size === "large" ? "h-16 w-16" : "",
        className
      ),
      ...remainingProps,
      alt: "Landing avatar"
    }
  );
};
const LandingRating = ({
  className,
  rating = 5,
  maxRating = 5,
  size = "medium"
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx$1("flex items-center gap-1", className),
      "aria-describedby": `Rating: ${rating} out of ${maxRating}`,
      children: Array.from({ length: maxRating }).map((_, index) => {
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx$1(
              size === "small" ? "h-3 w-3" : "",
              size === "medium" ? "h-4 w-4" : "",
              size === "large" ? "h-5 w-5" : ""
            ),
            // Return half star for half ratings
            children: rating % 1 !== 0 && index === Math.floor(rating) && index + 1 === Math.ceil(rating) ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                StarFilled,
                {
                  className: "absolute top-0 left-0 w-full h-full text-gray-300 fill-gray-300",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                StarOutlined,
                {
                  className: "relative z-10 w-full h-full text-yellow-400 fill-yellow-400",
                  "aria-hidden": "true"
                }
              )
            ] }, index) : /* @__PURE__ */ jsx(
              StarFilled,
              {
                className: clsx$1("w-full h-full", {
                  "text-yellow-400 fill-yellow-400": index < rating,
                  "text-gray-300 fill-gray-300": index >= rating
                }),
                "aria-hidden": "true"
              },
              index
            )
          },
          index
        );
      })
    }
  );
};
const LandingSocialRating = ({
  children,
  numberOfUsers = 100,
  suffixText = "happy users"
}) => {
  const numberText = numberOfUsers > 1e3 ? `${(numberOfUsers / 1e3).toFixed(0)}k` : `${numberOfUsers}`;
  const avatarItems = [
    {
      src: "https://randomuser.me/api/portraits/men/51.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/women/9.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/women/52.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      src: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "group flex flex-wrap gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: avatarItems.map((avatarItem, index) => /* @__PURE__ */ jsx(
      LandingAvatar,
      {
        src: avatarItem.src,
        className: clsx$1(
          "relative",
          index === 1 || index === 2 ? `-ml-4` : "",
          index === 3 ? `-ml-5` : "",
          index > 3 ? `-ml-6` : ""
        )
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-1", children: [
      /* @__PURE__ */ jsx(LandingRating, {}),
      !children ? /* @__PURE__ */ jsxs("p", { className: "text-xs max-w-sm text-slate-600 dark:text-slate-400 ", children: [
        numberText,
        "+ ",
        suffixText
      ] }) : children
    ] })
  ] });
};
const LandingTestimonials = ({
  title,
  subtitle,
  testimonials,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: DesignSystemUtility.buildClassNames("py-16 px-5", className),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 py-16 relative group overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-16 md:mt-0 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-5xl font-bold lg:tracking-tight", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg mt-4 text-slate-600 dark:text-slate-400", children: subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8", children: testimonials.map((testimonial, idx) => /* @__PURE__ */ jsx(TestimonialCard, { ...testimonial }, `testimonial-${idx}`)) })
      ] })
    }
  );
};
const TestimonialCard = ({
  name,
  content,
  designation,
  avatar
}) => {
  return /* @__PURE__ */ jsx("div", { className: "mb-8 sm:break-inside-avoid", children: /* @__PURE__ */ jsxs("blockquote", { className: "rounded-lg bg-gray-50 dark:bg-slate-800 p-6 shadow-sm sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          src: avatar,
          className: "size-14 rounded-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-lg font-medium text-gray-900 dark:text-slate-300", children: name }),
        /* @__PURE__ */ jsx("p", { className: "flex gap-0.5 text-gray-800 dark:text-slate-400", children: designation })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-700 dark:text-slate-400", children: content })
  ] }) });
};
const Leftbar = ({
  keySelected,
  items,
  itemsBottom
}) => {
  var _a2, _b, _c, _d;
  const { isMobile } = useDesignSystem();
  if (isMobile || items.length === 0) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      justify: "space-between",
      className: "py-4",
      style: {
        width: "250px",
        backgroundColor: (_b = (_a2 = Theme.components) == null ? void 0 : _a2.Layout) == null ? void 0 : _b.siderBg,
        borderRight: (_d = (_c = Theme.components) == null ? void 0 : _c.Layout) == null ? void 0 : _d.siderBorderRight
      },
      children: [
        /* @__PURE__ */ jsx(
          Menu,
          {
            mode: "inline",
            inlineIndent: 16,
            items,
            selectedKeys: [keySelected],
            style: { width: "100%" }
          }
        ),
        /* @__PURE__ */ jsx(
          Menu,
          {
            mode: "inline",
            inlineIndent: 16,
            items: itemsBottom,
            selectedKeys: [keySelected],
            style: { width: "100%" }
          }
        )
      ]
    }
  );
};
var Utility;
((Utility2) => {
  function sleep(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
  Utility2.sleep = sleep;
  function isNull(value) {
    return value === null || value === void 0 || typeof value === "string" && value === "";
  }
  Utility2.isNull = isNull;
  function getUUID() {
    return v4();
  }
  Utility2.getUUID = getUUID;
  function isDefined(value) {
    const isEmptyString = typeof value === "string" && value === "";
    return value !== null && value !== void 0 && !isEmptyString;
  }
  Utility2.isDefined = isDefined;
  function openInNewTab(window2, url) {
    window2.open(url, "_blank");
  }
  Utility2.openInNewTab = openInNewTab;
  function sortByString(items, key) {
    return items.sort(
      (a, b) => a[key].localeCompare(b[key])
    );
  }
  Utility2.sortByString = sortByString;
  function removeTrailingSlash(content) {
    const REGEX_SLASH = /\/$/g;
    return content.replace(REGEX_SLASH, "");
  }
  Utility2.removeTrailingSlash = removeTrailingSlash;
  function stringToInitials(content) {
    var _a2;
    if (isNull(content)) {
      return "";
    }
    const words = content.trim().split(" ");
    const isOneWord = words.length === 1;
    if (isOneWord) {
      return (_a2 = words[0].slice(0, 2)) == null ? void 0 : _a2.toUpperCase();
    }
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  Utility2.stringToInitials = stringToInitials;
  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  Utility2.debounce = debounce;
})(Utility || (Utility = {}));
const Mobilebar = ({ keySelected, items }) => {
  var _a2, _b, _c, _d;
  const router = useNavigate();
  const { user, checkRole } = useUserContext();
  const { isMobile } = useDesignSystem();
  if (!isMobile) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Flex,
    {
      align: "center",
      justify: "space-between",
      className: "px-2",
      style: {
        position: "relative",
        backgroundColor: (_b = (_a2 = Theme.components) == null ? void 0 : _a2.Layout) == null ? void 0 : _b.headerBg,
        borderBottom: (_d = (_c = Theme.components) == null ? void 0 : _c.Layout) == null ? void 0 : _d.headerBorderBottom
      },
      children: [
        /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
          user && /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
            Avatar,
            {
              src: user.pictureUrl,
              alt: user.name,
              size: "small",
              onClick: () => router("/profile"),
              style: { cursor: "pointer" },
              children: Utility.stringToInitials(user.name)
            }
          ) }),
          /* @__PURE__ */ jsx(
            Flex,
            {
              align: "center",
              justify: "center",
              style: {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              },
              children: /* @__PURE__ */ jsx(Logo, { height: 40 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
          checkRole("ADMIN") && /* @__PURE__ */ jsx(Tag, { color: "red", bordered: false, children: "Admin" }),
          /* @__PURE__ */ jsx(
            Menu,
            {
              mode: "horizontal",
              items,
              selectedKeys: [keySelected],
              style: { width: 46 },
              overflowedIndicator: /* @__PURE__ */ jsx(MenuOutlined, {})
            }
          )
        ] })
      ]
    }
  ) });
};
const Topbar = ({ keySelected, items }) => {
  var _a2, _b, _c, _d;
  const router = useNavigate();
  const { user, checkRole } = useUserContext();
  const { isMobile } = useDesignSystem();
  if (isMobile) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Flex,
    {
      align: "center",
      className: "px-4 py-2",
      style: {
        backgroundColor: (_b = (_a2 = Theme.components) == null ? void 0 : _a2.Layout) == null ? void 0 : _b.headerBg,
        borderBottom: (_d = (_c = Theme.components) == null ? void 0 : _c.Layout) == null ? void 0 : _d.headerBorderBottom
      },
      children: [
        /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Logo, { height: 40 }) }),
        /* @__PURE__ */ jsx(Flex, { vertical: true, flex: 1, style: { overflowX: "hidden" }, children: /* @__PURE__ */ jsx(
          Menu,
          {
            mode: "horizontal",
            items,
            selectedKeys: [keySelected],
            overflowedIndicator: /* @__PURE__ */ jsx(MenuOutlined, {}),
            style: { flex: 1 }
          }
        ) }),
        /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "middle", children: [
          checkRole("ADMIN") && /* @__PURE__ */ jsx(Tag, { color: "red", bordered: false, children: "Admin" }),
          user && /* @__PURE__ */ jsx(
            Avatar,
            {
              src: user.pictureUrl,
              alt: user.name,
              size: "default",
              onClick: () => router("/profile"),
              style: { cursor: "pointer" },
              children: Utility.stringToInitials(user.name)
            }
          )
        ] })
      ]
    }
  ) });
};
const NavigationLayout = ({ children }) => {
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const params = useParams();
  const goTo = (url) => {
    router(url);
  };
  const items = [
    {
      key: "/home",
      label: "Home Page",
      position: "topbar",
      onClick: () => goTo("/home")
    },
    {
      key: "/about",
      label: "About Us",
      position: "topbar",
      onClick: () => goTo("/about")
    },
    {
      key: "/products",
      label: "Products",
      position: "topbar",
      onClick: () => goTo("/products")
    },
    {
      key: "/services",
      label: "Services",
      position: "topbar",
      onClick: () => goTo("/services")
    },
    {
      key: "/contact",
      label: "Contact Us",
      position: "topbar",
      onClick: () => goTo("/contact")
    }
  ];
  const itemsVisible = items.filter((item) => item.isVisible !== false).map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    position: item.position,
    onClick: item.onClick
  }));
  const itemsTopbar = itemsVisible.filter((item) => item.position === "topbar");
  const itemsLeftbar = itemsVisible.filter((item) => item.position === "leftbar");
  const itemsLeftbottom = itemsVisible.filter(
    (item) => item.position === "leftbar-bottom"
  );
  const itemsMobile = itemsVisible;
  let keySelected = pathname;
  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`);
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Topbar, { keySelected, items: itemsTopbar }),
    /* @__PURE__ */ jsx(Mobilebar, { keySelected, items: itemsMobile }),
    /* @__PURE__ */ jsxs(Flex, { flex: 1, style: { overflowY: "hidden" }, children: [
      /* @__PURE__ */ jsx(
        Leftbar,
        {
          keySelected,
          items: itemsLeftbar,
          itemsBottom: itemsLeftbottom
        }
      ),
      /* @__PURE__ */ jsx(Flex, { flex: 1, vertical: true, style: { overflowY: "hidden" }, children })
    ] })
  ] });
};
const getLayoutBreakpoints = (layout) => {
  const mapping = {
    "full-width": {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
      xxl: { span: 24 }
    },
    narrow: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 16 },
      xl: { span: 14 },
      xxl: { span: 12 }
    },
    "super-narrow": {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 10 },
      xxl: { span: 8 }
    }
  };
  return mapping[layout] ?? mapping["full-width"];
};
const PageLayout = ({
  id,
  children,
  gap,
  layout = "full-width",
  isFlex = false,
  isCentered = false,
  isScrollable = true,
  isLoading = false,
  ...props
}) => {
  const breakpoints = getLayoutBreakpoints(layout);
  const isFlexUsed = isFlex || isCentered || isLoading;
  return /* @__PURE__ */ jsx(
    Row,
    {
      id,
      justify: "center",
      style: {
        flex: 1,
        overflowY: isScrollable ? "auto" : void 0,
        overflowX: "hidden"
      },
      children: /* @__PURE__ */ jsxs(Col, { ...props, ...breakpoints, children: [
        isFlexUsed && /* @__PURE__ */ jsxs(
          Flex,
          {
            vertical: true,
            className: "h-full p-4",
            justify: isCentered || isLoading ? "center" : void 0,
            align: isCentered || isLoading ? "center" : void 0,
            gap,
            children: [
              isLoading && /* @__PURE__ */ jsx(Spin, { indicator: /* @__PURE__ */ jsx(LoadingOutlined, { spin: true }) }),
              !isLoading && children
            ]
          }
        ),
        !isFlexUsed && /* @__PURE__ */ jsx("div", { className: "h-full p-4", children })
      ] })
    }
  );
};
const { Text: Text$5, Title: Title$5 } = Typography;
const AppHeader = ({
  title = "Kuvam Template 1",
  description
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Flex, { justify: "center", children: /* @__PURE__ */ jsx(Logo, { height: "100" }) }),
    /* @__PURE__ */ jsxs(Flex, { vertical: true, align: "center", children: [
      /* @__PURE__ */ jsx(Title$5, { level: 3, style: { margin: 0 }, children: title }),
      description && /* @__PURE__ */ jsx(Text$5, { type: "secondary", children: description })
    ] })
  ] });
};
const isDevelopment = () => process.env.NODE_ENV === "development";
const isProduction$1 = () => process.env.NODE_ENV === "production";
const getBaseUrl = () => {
  const isServer = typeof window !== "undefined";
  const baseUrl = process.env.BASE_URL;
  const port = process.env.PORT ?? 8099;
  if (isServer) {
    return "";
  }
  if (baseUrl) {
    if (baseUrl.startsWith("http")) {
      return baseUrl;
    } else {
      return `https://${baseUrl}`;
    }
  }
  return `http://localhost:${port}`;
};
const getAuthenticationSecret = () => {
  return process.env.SERVER_AUTHENTICATION_SECRET;
};
const Configuration = {
  isDevelopment,
  isProduction: isProduction$1,
  getBaseUrl,
  getAuthenticationSecret
};
const importPostHogProvider = async () => {
  if (typeof window !== "undefined") {
    const value = (await import("posthog-js/react/dist/esm/index.js")).PostHogProvider;
    return value;
  }
};
const AnalyticsProvider = ({ children }) => {
  const { data, isLoading } = Api.configuration.getPublic.useQuery();
  const PostHogProvider = useRef();
  useEffect(() => {
    const isProduction2 = Configuration.isProduction();
    const canActivate = typeof window !== "undefined" && !isLoading && data && isProduction2;
    if (canActivate) {
      const key = data["PUBLIC_POSTHOG_KEY"];
      const host = data["PUBLIC_POSTHOG_HOST"];
      try {
        Posthog.init(key, {
          api_host: host
        });
      } catch (error) {
        console.log(`Could not start analytics: ${error.message}`);
      }
    }
  }, [data, isLoading]);
  useEffect(() => {
    importPostHogProvider().then((value) => PostHogProvider.current = value);
  }, []);
  if (!PostHogProvider.current) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(PostHogProvider.current, { client: Posthog, children });
};
const meta = () => {
  return [
    { title: "Kuvam Template 1" },
    {
      name: "description",
      content: "Kuvam Template 1"
    }
  ];
};
const links = () => {
  const items = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    },
    {
      rel: "stylesheet",
      href: "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
    }
  ];
  return items;
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(DesignSystemProvider, { children: /* @__PURE__ */ jsx(TrpcClient.Provider, { children: /* @__PURE__ */ jsx(AnalyticsProvider, { children: /* @__PURE__ */ jsx(WorkspaceProvider, { children: /* @__PURE__ */ jsx(UserProvider, { children }) }) }) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const { Text: Text$4 } = Typography;
function ResetPasswordTokenPage() {
  const router = useNavigate();
  const { token } = useParams();
  const [form] = Form.useForm();
  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess
  } = Api.authentication.resetPassword.useMutation();
  const handleSubmit = async (values) => {
    try {
      await resetPassword({ token, password: values.password });
    } catch (error) {
      message.error(`Could not reset password: ${error.message}`);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "100px",
        paddingTop: "100px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "Change your password" }),
        isSuccess && /* @__PURE__ */ jsx(
          Alert,
          {
            style: { textAlign: "center" },
            type: "success",
            message: "Your password has been changed."
          }
        ),
        !isSuccess && /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password",
                  name: "password",
                  rules: [{ required: true, message: "Password is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Your new password",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password confirmation",
                  name: "passwordConfirmation",
                  rules: [
                    {
                      required: true,
                      message: "Password confirmation is required"
                    }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Password confirmation",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: isLoading,
                  block: true,
                  children: "Reset Password"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(Flex, { justify: "center", align: "center", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => router("/login"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$4, { children: "Sign in" }) })
            }
          ),
          /* @__PURE__ */ jsx(Text$4, { type: "secondary", children: "or" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => router("/register"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$4, { children: "Sign up" }) })
            }
          )
        ] })
      ]
    }
  ) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPasswordTokenPage
}, Symbol.toStringTag, { value: "Module" }));
const { Text: Text$3 } = Typography;
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [form] = Form.useForm();
  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess
  } = Api.authentication.sendResetPasswordEmail.useMutation();
  const handleSubmit = async (values) => {
    try {
      setEmail(values.email);
      await resetPassword({ email: values.email });
    } catch (error) {
      message.error(`Could not reset password: ${error}`);
    }
  };
  return /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "100px",
        paddingTop: "100px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "You will receive a link" }),
        isSuccess && /* @__PURE__ */ jsx(
          Alert,
          {
            style: { textAlign: "center" },
            message: `We sent an email to ${email} with a link to reset your password`,
            type: "success"
          }
        ),
        !isSuccess && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Email",
                  name: "email",
                  rules: [{ required: true, message: "Email is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "email",
                      placeholder: "Your email",
                      autoComplete: "email"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading: isLoading,
                  block: true,
                  children: "Reset Password"
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(Flex, { justify: "center", align: "center", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => navigate("/login"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$3, { children: "Sign in" }) })
            }
          ),
          /* @__PURE__ */ jsx(Text$3, { type: "secondary", children: "or" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              style: { border: "none" },
              onClick: () => navigate("/register"),
              children: /* @__PURE__ */ jsx(Flex, { gap: "small", justify: "center", children: /* @__PURE__ */ jsx(Text$3, { children: "Sign up" }) })
            }
          )
        ] })
      ]
    }
  ) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPasswordPage
}, Symbol.toStringTag, { value: "Module" }));
const singleton = globalThis;
if (!singleton.prisma) {
  singleton.prisma = new PrismaClient({
    log: ["error"]
  });
}
const Database = singleton.prisma;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const isProduction = process.env.NODE_ENV === "production";
const getCookie = (req, name, options) => {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) {
    return "";
  }
  const cookies = cookie.parse(cookieHeader, options);
  return cookies[name];
};
const setCookie = (resHeaders, name, value, options) => {
  resHeaders.set(
    "Set-Cookie",
    cookie.serialize(name, value, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
const setCookieOnResponse = (response, name, value, options) => {
  response.setHeader(
    "Set-Cookie",
    cookie.serialize(name, value, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
const deleteCookie = (resHeaders, name, options) => {
  resHeaders.set(
    "Set-Cookie",
    cookie.serialize(name, "", {
      maxAge: 0,
      httpOnly: true,
      secure: isProduction,
      path: "/",
      sameSite: "lax",
      ...options
    })
  );
};
const Cookies = {
  get: getCookie,
  set: setCookie,
  setOnResponse: setCookieOnResponse,
  delete: deleteCookie
};
const getSession = async (options) => {
  let user;
  try {
    const token = options.accessToken;
    if (!token) {
      throw new Error();
    }
    const { userId } = Jwt.verify(
      token,
      process.env.SERVER_AUTHENTICATION_SECRET
    );
    user = await Database.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        globalRole: true
      }
    });
    return { user };
  } catch (error) {
    return {};
  }
};
const getPrisma = (session) => {
  const databaseProtected = enhance(Database, { user: session.user });
  return {
    database: databaseProtected,
    databaseUnprotected: Database,
    prisma: databaseProtected,
    masterPrisma: Database
  };
};
const createTrpcContext = async (options) => {
  const accessToken = Cookies.get(options.req, "MARBLISM_ACCESS_TOKEN");
  const session = await getSession({ accessToken });
  const prisma = getPrisma(session);
  return {
    session,
    request: options.req,
    responseHeaders: options.resHeaders,
    ...prisma
  };
};
const createHttpContext = async (options) => {
  const accessToken = Cookies.get(options.request, "MARBLISM_ACCESS_TOKEN");
  const session = await getSession({ accessToken });
  const prisma = getPrisma(session);
  return {
    session,
    ...prisma
  };
};
const createContext = async (options) => {
  return await createTrpcContext(options);
};
const trpcInstance = initTRPC.context().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
const middlewareAuthenticated = trpcInstance.middleware(({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be authenticated"
    });
  }
  return next();
});
const procedurePublic = trpcInstance.procedure;
const procedure = procedurePublic.use(middlewareAuthenticated);
const Trpc = {
  createRouter: trpcInstance.router,
  mergeRouters: trpcInstance.mergeRouters,
  procedurePublic,
  procedure,
  createContext
};
var DateHelper;
((DateHelper2) => {
  function getNow() {
    return /* @__PURE__ */ new Date();
  }
  DateHelper2.getNow = getNow;
  function addMinutes(date, minutes) {
    const dateUpdated = new Date(date.getTime());
    const seconds = minutes * 60;
    const milliseconds = seconds * 1e3;
    dateUpdated.setTime(dateUpdated.getTime() + milliseconds);
    return dateUpdated;
  }
  DateHelper2.addMinutes = addMinutes;
  function isBefore(dateBefore, dateAfter) {
    return dateBefore < dateAfter;
  }
  DateHelper2.isBefore = isBefore;
})(DateHelper || (DateHelper = {}));
class UploadProvider {
  initialise() {
    return;
  }
  ensureFilename(filenameBefore) {
    const filenameClean = filenameBefore.replace(/[^\w.]/gi, "");
    const timestamp = DateHelper.getNow().getTime();
    return `${timestamp}-${filenameClean}`;
  }
}
const ONE_HOUR_IN_SECONDS = 60 * 60;
const _UploadProviderAws = class _UploadProviderAws extends UploadProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "client");
    __publicField(this, "bucketNamePublic");
    __publicField(this, "bucketNamePrivate");
    __publicField(this, "region");
    __publicField(this, "credentials");
    __publicField(this, "marblismApiKey");
    __publicField(this, "bucketKey");
    __publicField(this, "httpClient", axios.create());
    __publicField(this, "httpClientOptions", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }
  async initialise() {
    this.region = process.env.SERVER_UPLOAD_AWS_REGION;
    if (Utility.isNull(this.region)) {
      this.region = "us-west-1";
    }
    try {
      this.marblismApiKey = process.env.SERVER_UPLOAD_MARBLISM_API_KEY;
      if (Utility.isDefined(this.marblismApiKey)) {
        if (_UploadProviderAws.isMarblismInitialised) {
          return;
        }
        await this.initializeWithMarblism();
        console.log(`AWS library (Marblism) active in region ${this.region}`);
        _UploadProviderAws.isMarblismInitialised = true;
        return;
      }
    } catch (error) {
      console.warn(`AWS library (Marblism) failed to start: ${error.message}`);
    }
    try {
      const accessKey = process.env.SERVER_UPLOAD_AWS_ACCESS_KEY;
      const secretKey = process.env.SERVER_UPLOAD_AWS_SECRET_KEY;
      if (!accessKey && !secretKey) {
        throw new Error(
          "Set SERVER_UPLOAD_AWS_ACCESS_KEY && SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate"
        );
      }
      if (!accessKey) {
        throw new Error(
          "Set SERVER_UPLOAD_AWS_ACCESS_KEY in your .env to activate"
        );
      }
      if (!secretKey) {
        throw new Error(
          "Set SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate"
        );
      }
      this.bucketNamePublic = process.env.SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME;
      if (!this.bucketNamePublic) {
        console.warn(
          `Set SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME in your .env to activate a public bucket with infinite urls`
        );
      }
      this.bucketNamePrivate = process.env.SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME;
      if (!this.bucketNamePrivate) {
        console.warn(
          `Set SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME in your .env to activate a private bucket with signed urls`
        );
      }
      this.client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey
        }
      });
      await this.check();
      console.log(`AWS library active in region ${this.region}`);
    } catch (error) {
      console.warn(`AWS library failed to start`);
      throw new Error(error);
    }
  }
  async initializeWithMarblism() {
    const url = `/v1/addons/upload/create-credentials`;
    this.setApiKey(this.marblismApiKey);
    const response = await this.postMarblism(url);
    this.bucketNamePrivate = response.bucketNamePrivate;
    this.bucketNamePublic = `${response.bucketNamePublic}`;
    this.credentials = {
      accessKeyId: response.accessKeyId,
      secretAccessKey: response.secretAccessKey,
      sessionToken: response.sessionToken,
      expiration: new Date(response.expiration)
    };
    this.bucketKey = response.bucketKey;
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.credentials.accessKeyId,
        secretAccessKey: this.credentials.secretAccessKey,
        sessionToken: this.credentials.sessionToken
      }
    });
    await this.check();
  }
  async ensureCredentials() {
    if (!_UploadProviderAws.isMarblismInitialised) {
      return;
    }
    if (this.areCredentialsValid()) {
      return;
    }
    const url = `/v1/addons/upload/refresh-credentials`;
    this.setApiKey(this.marblismApiKey);
    const response = await this.postMarblism(url);
    this.credentials = {
      accessKeyId: response.accessKeyId,
      secretAccessKey: response.secretAccessKey,
      sessionToken: response.sessionToken,
      expiration: new Date(response.expiration)
    };
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.credentials.accessKeyId,
        secretAccessKey: this.credentials.secretAccessKey,
        sessionToken: this.credentials.sessionToken
      }
    });
    await this.check();
  }
  areCredentialsValid() {
    const isTokenDefined = Utility.isDefined(this.credentials);
    const isTokenValid = isTokenDefined && DateHelper.isBefore(DateHelper.getNow(), this.credentials.expiration);
    return isTokenValid;
  }
  async check() {
    const buckets = await this.listBuckets();
    if (this.bucketNamePrivate) {
      console.log(`Checking bucket "${this.bucketNamePrivate}"...`);
      const bucket = buckets.find(
        (bucket2) => bucket2.name === this.bucketNamePrivate
      );
      if (bucket) {
        console.log(`Bucket "${this.bucketNamePrivate}" is active`);
      } else {
        throw new Error(`Bucket "${this.bucketNamePrivate}" was not found`);
      }
    }
    if (this.bucketNamePublic) {
      console.log(`Checking bucket "${this.bucketNamePublic}"...`);
      const bucket = buckets.find(
        (bucket2) => bucket2.name === this.bucketNamePublic
      );
      if (bucket) {
        console.log(`Bucket "${this.bucketNamePublic}" is active`);
      } else {
        throw new Error(`Bucket "${this.bucketNamePublic}" was not found`);
      }
    }
  }
  async uploadPublic(options) {
    await this.ensureCredentials();
    const { file } = options;
    let key = this.ensureFilename(file.name);
    key = this.ensureKey(key);
    const command = new PutObjectCommand({
      Bucket: `${this.bucketNamePublic}`,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    });
    try {
      await this.client.send(command);
      console.log(`File ${file.name} saved (public)`);
      const url = `${this.getBaseUrlPublic()}/${key}`;
      return { url };
    } catch (error) {
      console.error(`${error}`);
      throw new Error(`Could not upload public file with key "${key}"`);
    }
  }
  async uploadPrivate(options) {
    await this.ensureCredentials();
    const { file } = options;
    const key = this.ensureFilename(file.name);
    const command = new PutObjectCommand({
      Bucket: `${this.bucketNamePrivate}`,
      Key: this.ensureKey(key),
      Body: file.buffer,
      ContentType: file.mimetype
    });
    try {
      await this.client.send(command);
      console.log(`File ${file.name} saved (private)`);
      const url = `${this.getBaseUrlPrivate()}/${key}`;
      return { url };
    } catch (error) {
      console.error(`${error}`);
      throw new Error(`Could not upload private file with key "${key}"`);
    }
  }
  async fromPrivateToPublicUrl({
    url,
    expiresInSeconds = ONE_HOUR_IN_SECONDS
  }) {
    if (!this.isUrlPrivate(url)) {
      throw new Error(`${url} must be a private url`);
    }
    await this.ensureCredentials();
    const key = this.extractKeyFromUrlPrivate(url);
    const params = {
      Bucket: `${this.bucketNamePrivate}`,
      Key: this.ensureKey(key)
    };
    const command = new GetObjectCommand(params);
    const urlPublic = await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds
    });
    return { url: urlPublic };
  }
  async getSignedUrl(options) {
    const { key, lifetimeSeconds = ONE_HOUR_IN_SECONDS } = options;
    const keyCleaned = this.ensureKey(key);
    const params = {
      Bucket: `${this.bucketNamePrivate}`,
      Key: keyCleaned
    };
    const headCommand = new HeadObjectCommand(params);
    try {
      await this.client.send(headCommand);
    } catch (error) {
      if (error.name === "NotFound") {
        return null;
      } else {
        throw new Error(`Error in checking object existence: ${error}`);
      }
    }
    const command = new GetObjectCommand(params);
    try {
      const url = await getSignedUrl(this.client, command, {
        expiresIn: lifetimeSeconds
      });
      return { url };
    } catch (error) {
      throw new Error(`Error in getting signed url:${error}`);
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                   PRIVATE                                  */
  /* -------------------------------------------------------------------------- */
  async listBuckets() {
    const result = await this.client.send(new ListBucketsCommand({}));
    const buckets = result.Buckets.map((item) => ({
      name: item.Name,
      dateCreation: item.CreationDate
    }));
    return buckets;
  }
  getBaseUrlPrivate() {
    return `https://${this.bucketNamePrivate}.s3.${this.region}.amazonaws.com`;
  }
  getBaseUrlPublic() {
    return `https://${this.bucketNamePublic}.s3.${this.region}.amazonaws.com`;
  }
  ensureKey(key) {
    let keyClean = key;
    const isPrefixedSlash = keyClean.startsWith("/");
    if (isPrefixedSlash) {
      keyClean = keyClean.slice(1);
    }
    const isPrefixedBucketKey = keyClean.startsWith(this.bucketKey);
    if (!isPrefixedBucketKey) {
      keyClean = `${this.bucketKey}/${keyClean}`;
    }
    return keyClean;
  }
  isUrlPrivate(url) {
    const baseUrlPrivate = this.getBaseUrlPrivate();
    const isPrivate = url.startsWith(baseUrlPrivate);
    return isPrivate;
  }
  extractKeyFromUrlPrivate(url) {
    const baseUrlPrivate = this.getBaseUrlPrivate();
    return url.replace(baseUrlPrivate, "");
  }
  setApiKey(apiKey) {
    this.httpClientOptions.headers["Authorization"] = apiKey;
    this.httpClientOptions["credentials"] = "include";
  }
  async postMarblism(url) {
    const baseUrl = this.getDashboardBaseUrl();
    const response = await this.httpClient.post(`${baseUrl}${url}`, {}, this.httpClientOptions).catch((error) => {
      console.error(error);
      throw new Error(`Could not post to ${url}`);
    });
    return response.data;
  }
  getDashboardBaseUrl() {
    return `https://api.marblism.com/api`;
  }
};
__publicField(_UploadProviderAws, "isMarblismInitialised", false);
let UploadProviderAws = _UploadProviderAws;
var FileHelper;
((FileHelper2) => {
  function getRoot() {
    return process.cwd();
  }
  FileHelper2.getRoot = getRoot;
  function findFileContent(path) {
    return fs.readFileSync(path, "utf-8");
  }
  FileHelper2.findFileContent = findFileContent;
  function writeFolder(path) {
    fs.mkdirSync(path, { recursive: true });
  }
  FileHelper2.writeFolder = writeFolder;
  async function getFileBuffer(file) {
    return Buffer.from(await file.arrayBuffer());
  }
  FileHelper2.getFileBuffer = getFileBuffer;
  function writeFile(path, content) {
    const pathFolder = path.split("/").slice(0, -1).join("/");
    writeFolder(pathFolder);
    return fs.writeFileSync(path, content);
  }
  FileHelper2.writeFile = writeFile;
  function joinPaths(...paths) {
    return join(...paths);
  }
  FileHelper2.joinPaths = joinPaths;
  function createReadStream(path) {
    return fs.createReadStream(path);
  }
  FileHelper2.createReadStream = createReadStream;
  function buildTemporaryPath(path) {
    const pathTemporary = Path.join(os.tmpdir(), "marblism-tmp", path);
    return pathTemporary;
  }
  FileHelper2.buildTemporaryPath = buildTemporaryPath;
  async function createReadStreamFromArrayBuffer(arrayBuffer, filename) {
    const path = buildTemporaryPath(filename);
    const pathFolder = path.split("/").slice(0, -1).join("/");
    deleteFolder(pathFolder);
    writeFolder(pathFolder);
    fs.writeFileSync(path, Buffer.from(arrayBuffer));
    return fs.createReadStream(path);
  }
  FileHelper2.createReadStreamFromArrayBuffer = createReadStreamFromArrayBuffer;
  async function deleteFile(path) {
    fs.unlinkSync(path);
  }
  FileHelper2.deleteFile = deleteFile;
  function deleteFolder(path) {
    try {
      fs.rmdirSync(path, { recursive: true });
    } catch (error) {
    }
  }
  FileHelper2.deleteFolder = deleteFolder;
  function getFileType(filename, buffer) {
    if (filename.endsWith(".csv")) {
      return "csv";
    }
    if (filename.endsWith(".pdf")) {
      return "pdf";
    }
    if (filename.endsWith(".docx") || filename.endsWith(".doc")) {
      return "docx";
    }
    if (Utility.isNull(buffer)) {
      return "unknown";
    }
    const signatures = {
      pdf: [37, 80, 68, 70],
      docx: [80, 75, 3, 4],
      csv: [34, 44, 10]
    };
    for (const [type, signature] of Object.entries(signatures)) {
      if (signature.every((byte, index) => buffer[index] === byte)) {
        return type;
      }
    }
    return "unknown";
  }
  FileHelper2.getFileType = getFileType;
})(FileHelper || (FileHelper = {}));
class UploadProviderLocal extends UploadProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "staticServerUrl");
    __publicField(this, "pathPublicInternal", `./public/upload/public`);
    __publicField(this, "pathPrivateInternal", `./public/upload/private`);
    __publicField(this, "pathPublicExternal", `/upload/public`);
    __publicField(this, "pathPrivateExternal", `/upload/private`);
  }
  initialise() {
    try {
      FileHelper.writeFolder(this.pathPublicInternal);
      this.staticServerUrl = `${Configuration.getBaseUrl()}`;
      console.log(`Upload Local is active`);
    } catch (error) {
      console.error(`Upload Local failed to start: ${error.message}`);
    }
    return;
  }
  async uploadPublic({
    file
  }) {
    const content = file.buffer;
    const filename = this.ensureFilename(file.name);
    const path = FileHelper.joinPaths(this.pathPublicInternal, filename);
    FileHelper.writeFile(path, content);
    const url = `${this.staticServerUrl}${this.pathPublicExternal}/${filename}`;
    return { url };
  }
  async uploadPrivate({
    file
  }) {
    const content = Buffer.from(file.buffer);
    const filename = this.ensureFilename(file.name);
    const path = FileHelper.joinPaths(this.pathPrivateInternal, filename);
    FileHelper.writeFile(path, content);
    const url = `${this.staticServerUrl}${this.pathPrivateExternal}/${filename}`;
    return { url };
  }
  async fromPrivateToPublicUrl({
    url
  }) {
    return { url };
  }
  async getSignedUrl(options) {
    const url = `${this.staticServerUrl}${this.pathPublicExternal}/${options.key}`;
    return { url };
  }
}
let Service$3 = class Service {
  constructor() {
    __publicField(this, "instance");
  }
  async setup() {
    if (this.instance) {
      return;
    }
    try {
      console.log(`Trying using AWS...`);
      const instance = new UploadProviderAws();
      await instance.initialise();
      this.instance = instance;
      return;
    } catch (error) {
      console.warn(`Could not use AWS: ${error.message}`);
    }
    console.log(
      `Falling back on local provider (not recommended for production)`
    );
    try {
      const instance = new UploadProviderLocal();
      await instance.initialise();
      this.instance = instance;
      return;
    } catch (error) {
      console.warn(`Could not use local provider: ${error.message}`);
    }
  }
  async uploadPublic(...files) {
    await this.setup();
    const responses = [];
    for (const file of files) {
      const response = await this.instance.uploadPublic({ file });
      responses.push(response);
    }
    return responses;
  }
  async uploadPrivate(...files) {
    await this.setup();
    const responses = [];
    for (const file of files) {
      const response = await this.instance.uploadPrivate({ file });
      responses.push(response);
    }
    return responses;
  }
  async fromPrivateToPublicUrl(...items) {
    await this.setup();
    const responses = [];
    for (const item of items) {
      const response = await this.instance.fromPrivateToPublicUrl(item);
      responses.push(response);
    }
    return responses;
  }
  async getSignedUrl(options) {
    await this.setup();
    return this.instance.getSignedUrl(options);
  }
};
const UploadService = new Service$3();
const UploadRouter = Trpc.createRouter({
  fromPrivateToPublicUrl: Trpc.procedure.input(
    z.object({
      url: z.string()
    })
  ).mutation(async ({ input }) => {
    const response = await UploadService.fromPrivateToPublicUrl({
      url: input.url
    });
    const url = response[0].url;
    return { url };
  })
});
config();
class Provider {
  constructor() {
    __publicField(this, "name", "google");
    __publicField(this, "strategy");
    this.setup();
  }
  isActive() {
    return !!this.strategy;
  }
  setup() {
    try {
      const clientID = process.env.SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID;
      const clientSecret = process.env.SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET;
      const callbackURL = `${Configuration.getBaseUrl()}/api/auth/google/callback`;
      if (Utility.isNull(clientID) || Utility.isNull(clientSecret)) {
        throw new Error(
          `Set SERVER_AUTHENTICATION_GOOGLE_CLIENT_ID AND SERVER_AUTHENTICATION_GOOGLE_CLIENT_SECRET in your .env to activate the Authentication Google provider`
        );
      }
      this.strategy = new Strategy(
        {
          clientID,
          clientSecret,
          callbackURL
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;
            let user = await Database.user.findFirst({ where: { email } });
            if (!user) {
              user = await Database.user.create({
                data: {
                  email,
                  name: profile.displayName,
                  pictureUrl: profile.photos[0].value
                }
              });
            }
            const payload = {
              accessToken,
              refreshToken,
              user
            };
            done(null, payload);
          } catch (error) {
            done(error);
          }
        }
      );
      console.log(`Authentication Google provider is active`);
    } catch (error) {
      console.error(
        `Could not setup Authentication Google provider: ${error.message}`
      );
    }
  }
}
const GoogleProvider = new Provider();
const providers = [GoogleProvider];
const getProviders = () => {
  return providers.filter((provider) => provider.isActive());
};
const expressSetup = (app) => {
  app.use(passport.initialize());
  getProviders().forEach((provider) => passport.use(provider.strategy));
  app.get("/api/auth/:provider", (req, res, next) => {
    const provider = req.params.provider;
    passport.authenticate(provider, {
      scope: ["profile", "email"],
      // You can customize scope per provider if needed
      session: false,
      prompt: "select_account"
    })(req, res, next);
  });
  app.get(
    "/api/auth/:provider/callback",
    (req, res, next) => {
      const provider = req.params.provider;
      passport.authenticate(provider, { failureRedirect: "/", session: false })(
        req,
        res,
        next
      );
    },
    (req, res) => {
      const provider = req.params.provider;
      const secret = Configuration.getAuthenticationSecret();
      const jwtToken = Jwt.sign(
        {
          userId: req.user["user"].id,
          [`${provider}AccessToken`]: req.user["accessToken"],
          [`${provider}RefreshToken`]: req.user["refreshToken"]
        },
        secret,
        {
          expiresIn: COOKIE_MAX_AGE
        }
      );
      Cookies.setOnResponse(res, "MARBLISM_ACCESS_TOKEN", jwtToken);
      res.redirect("/");
    }
  );
};
const getHttpContext = async (options) => {
  var _a2, _b;
  const context = await createHttpContext(options);
  if (!((_b = (_a2 = context == null ? void 0 : context.session) == null ? void 0 : _a2.user) == null ? void 0 : _b.id)) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return context;
};
const getHttpContextPublic = async (options) => {
  const context = await createHttpContext(options);
  return context;
};
class MailjetProvider {
  constructor() {
    __publicField(this, "client");
    __publicField(this, "templateIds", {});
    this.initialise();
  }
  initialise() {
    const isProduction2 = process.env.NODE_ENV === "production";
    if (!isProduction2) {
      console.warn(`Mailjet is disabled in development`);
      return;
    }
    try {
      const apiKey = process.env.SERVER_EMAIL_MAILJET_API_KEY;
      const secretKey = process.env.SERVER_EMAIL_MAILJET_SECRET_KEY;
      if (!apiKey || !secretKey) {
        console.warn(
          `Set SERVER_EMAIL_MAILJET_API_KEY and SERVER_EMAIL_MAILJET_SECRET_KEY to activate Mailjet`
        );
        return;
      }
      this.client = new Mailjet({ apiKey, apiSecret: secretKey });
      console.log(`Mailjet service active`);
    } catch (error) {
      console.error(`Could not start Mailjet service`);
      console.error(error);
    }
  }
  async send(options) {
    const message2 = this.buildMessage(options);
    return this.client.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          ...message2
        }
      ]
    }).then((result) => {
      console.log(`Emails sent`, result);
    }).catch((error) => {
      console.error(`Could not send emails (${error.statusCode})`);
    });
  }
  buildMessage(options) {
    const from = {
      Email: "no-reply@marblism.com",
      Name: "Marblism"
    };
    const to = options.to.map((item) => ({ Email: item.email, Name: item.name }));
    const message2 = {
      From: from,
      To: to,
      Subject: options.subject,
      HTMLPart: void 0,
      Variables: void 0,
      TemplateLanguage: void 0,
      templateId: void 0
    };
    if (options.templateId) {
      message2.TemplateLanguage = true;
      message2.templateId = options.templateId;
      message2.Variables = options.variables;
    } else {
      message2.HTMLPart = options.content;
    }
    return message2;
  }
}
class NodemailerProvider {
  constructor() {
    __publicField(this, "client");
    this.initialise();
  }
  initialise() {
    try {
      const host = process.env.SERVER_EMAIL_MAILPIT_HOST ?? "localhost";
      const port = Number(process.env.SERVER_EMAIL_MAILPIT_PORT ?? 1022);
      this.client = NodemailerSDK.createTransport({
        host,
        port
      });
      console.log(`Nodemailer is active (${host}:${port})`);
    } catch (error) {
      console.error(`Nodemailer failed to start: ${error.message}`);
    }
  }
  async send(options) {
    for (const to of options.to) {
      await this.client.sendMail({
        from: `Marblism <no-reply@marblism.com>`,
        to: to.email,
        subject: options.subject,
        html: options.content
      }).then((result) => {
        console.log(`Emails sent`);
      }).catch((error) => {
        console.error(`Could not send emails (${error.statusCode})`);
        console.error(error);
      });
    }
  }
}
const TemplateBase = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marblism</title>
    <style>
      {{ style }}
    </style>
  </head>
  <body>
    <div class="card">{{ content }}</div>
  </body>
</html>
  `.trim();
const TemplateComponents = {
  "<Card>": `
      <div class="card">
    `.trim(),
  "</Card>": "</div>",
  "<Card.Header>": `
      <table 
        class="card-header"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  "</Card.Header>": "</tbody></table>",
  "<Card.Body>": `
      <table 
        class="card-body"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%"
      >
        <tbody>
    `.trim(),
  "</Card.Body>": "</tbody></table>",
  "<Card.Footer>": `
      <table 
        class="card-footer"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  "</Card.Footer>": "</tbody></table>",
  "<p>": "<tr><td><p>",
  "</p>": "</p></td></tr>",
  "<h2>": "<tr><td><h2>",
  "</h2>": "</h2></td></tr>",
  "<hr />": "<tr><td><hr /></td></tr>"
};
const TemplateInvitationToOrganization = `
<Card.Header>
  <h2>Welcome to Kuvam Template 1</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>You have been invited to join {{ organization_name }}.</p>
  <p>
    <a href="{{ url_invitation }}" target="_blank">Accept Invitation</a>
  </p>
</Card.Body>

<Card.Footer>
  <p>Sent by Kuvam Template 1</p>
</Card.Footer>
  `.trim();
const TemplateResetPassword = `
<Card.Header>
  <h2>Password Reset</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>We received a request to reset your password.</p>
  <p>Click the button below to reset it</p>
  <p>
    <a href="{{ url_password_reset }}" target="_blank">Reset Password</a>
  </p>
  <p>If you did not request a password reset, ignore this email.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by Kuvam Template 1</p>
</Card.Footer>
  `.trim();
const TemplateStyle = `
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: rgba(41, 41, 41, 1);
  }

  .card {
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-size: 16px;
  }

  h1,
  h2,
  h3 {
    font-weight: 700;
    text-transform: uppercase;
    color: black;
  }

  p {
    width: 100%;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding-top: 28px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .card-body,
  .card-footer {
    padding-bottom: 28px;
  }

  .card-body {
    color: rgba(41, 41, 41, 1);
  }

  .card-footer {
    color: white;
    font-size: 13px;
    background: black;
  }

  hr {
    width: 100%;
    border-top: 1px solid black;
  }

  .badge,
  a {
    color: #4f4f4f;
    background: white;
    font-size: 16px;
    font-weight: 700;
    padding: 12px 16px 12px 16px;
    border: 1px solid grey;
    border-radius: 4px;
    text-decoration: none;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: black;
    border-color: black;
  }

  td {
    width: 100%;
  }
`;
const TemplateVerificationCode = `
<Card.Header>
  <h2>Single-use verification code</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>
    You are receiving this e-mail because a request has been made for a unique
    code
  </p>
  <p>Enter the following code for verification</p>
  <p>
    <span class="badge">{{ code }}</span>
  </p>
  <p>Code expires in {{ expiration }}</p>
</Card.Body>

<Card.Footer>
  <p>Sent by Kuvam Template 1</p>
</Card.Footer>
  `.trim();
const TemplateWelcome = `
<Card.Header>
  <h2>Welcome to Kuvam Template 1</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>Your account is now active.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by Kuvam Template 1</p>
</Card.Footer>
  `.trim();
const templates = {
  resetPassword: TemplateResetPassword,
  verificationCode: TemplateVerificationCode,
  welcome: TemplateWelcome,
  invitationToOrganization: TemplateInvitationToOrganization
};
let Service$2 = class Service2 {
  constructor() {
    __publicField(this, "provider");
    __publicField(this, "templates", templates);
    const isProduction2 = process.env.NODE_ENV === "production";
    if (isProduction2) {
      this.provider = new MailjetProvider();
    } else {
      this.provider = new NodemailerProvider();
    }
  }
  async send(options) {
    const content = templates[options.templateKey] ?? options.content;
    const name = options.name ?? options.email;
    const contentBuilt = this.getTemplate({
      content,
      variables: options.variables
    });
    return this.provider.send({
      content: contentBuilt,
      to: [
        {
          name,
          email: options.email
        }
      ],
      variables: options.variables,
      subject: options.subject
    }).then(() => {
      console.log(`Email sent to ${options.email}`, options);
    });
  }
  getTemplate(options) {
    const values = options.variables ?? { content: options.content };
    const contentBase = TemplateBase;
    const contentCSS = TemplateStyle;
    const contentTemplate = options.content;
    let content = this.buildContent(contentTemplate, values);
    content = this.buildContent(contentBase, { style: contentCSS, content });
    content = this.buildComponents(content);
    return content;
  }
  buildContent(content, values) {
    let contentBuilt = content;
    for (const [key, value] of Object.entries(values)) {
      const token = new RegExp(`{{ ${key} }}`, "g");
      contentBuilt = contentBuilt.replace(token, value);
    }
    return contentBuilt;
  }
  buildComponents(content) {
    let contentUpdated = content;
    for (const [key, value] of Object.entries(TemplateComponents)) {
      const tag = new RegExp(`${key}`, "g");
      contentUpdated = contentUpdated.replace(tag, value);
    }
    return contentUpdated;
  }
};
let Singleton$1 = (_a = class {
}, __publicField(_a, "service", new Service$2()), _a);
const EmailService = Singleton$1.service;
const TemplateKeys = Object.keys(EmailService.templates);
const EmailRouter = Trpc.createRouter({
  send: Trpc.procedure.input(
    z.object({
      userId: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
      subject: z.string(),
      content: z.string().optional(),
      templateKey: z.enum(TemplateKeys).optional(),
      variables: z.record(z.string(), z.string()).optional()
    })
  ).mutation(async ({ input, ctx }) => {
    let user;
    if (input.userId) {
      user = await ctx.database.user.findUniqueOrThrow({
        where: { id: input.userId }
      });
    }
    const email = (user == null ? void 0 : user.email) ?? input.email;
    const name = (user == null ? void 0 : user.name) ?? input.name;
    await EmailService.send({
      templateKey: input.templateKey,
      content: input.content,
      email,
      name,
      subject: input.subject,
      variables: input.variables
    });
    return {};
  })
});
var EmailServer;
((EmailServer2) => {
  EmailServer2.service = EmailService;
  EmailServer2.trpcRouter = EmailRouter;
})(EmailServer || (EmailServer = {}));
let Service$1 = class Service3 {
  /**
   * This function is called when a new user sign up, you can use it to send welcome email for example
   */
  async onRegistration(ctx, userId) {
    const user = await ctx.databaseUnprotected.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return;
    }
  }
};
class Singleton {
}
__publicField(Singleton, "service", new Service$1());
const AuthenticationService = Singleton.service;
const AuthenticationRouter = Trpc.createRouter({
  session: Trpc.procedure.query(async ({ ctx }) => {
    const user = await ctx.database.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id }
    });
    return { user };
  }),
  logout: Trpc.procedurePublic.mutation(async ({ ctx }) => {
    Cookies.delete(ctx.responseHeaders, "MARBLISM_ACCESS_TOKEN");
    ctx.responseHeaders.set("Location", "/login");
    return {
      success: true,
      redirect: "/login"
    };
  }),
  login: Trpc.procedurePublic.input(
    z.object({
      email: z.string().email(),
      password: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { email: input.email }
      });
      const isValid = await Bcrypt.compare(input.password, user.password);
      if (!isValid) {
        return {
          success: false,
          redirect: "/login?error=CredentialsSignin"
        };
      }
      const secret = Configuration.getAuthenticationSecret();
      const jwtToken = Jwt.sign({ userId: user.id }, secret, {
        expiresIn: COOKIE_MAX_AGE
      });
      Cookies.set(ctx.responseHeaders, "MARBLISM_ACCESS_TOKEN", jwtToken);
      return {
        success: true,
        redirect: "/home"
      };
    } catch (error) {
      console.log(error);
      return { success: false, redirect: "/login?error=default" };
    }
  }),
  register: Trpc.procedurePublic.input(
    z.object({
      email: z.string().email(),
      name: z.string(),
      pictureUrl: z.string().optional(),
      password: z.string(),
      globalRole: z.string().refine((value) => value !== "ADMIN", {
        message: "globalRole cannot be ADMIN"
      }).optional(),
      tokenInvitation: z.string().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const payload = checkTokenInvitation(input.tokenInvitation);
    const email = input.email.trim().toLowerCase();
    let user;
    if (payload == null ? void 0 : payload.userId) {
      user = await ctx.databaseUnprotected.user.findUnique({
        where: { id: payload.userId, status: "INVITED" }
      });
      if (!user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User was not found"
        });
      }
    } else {
      const userExisting = await ctx.databaseUnprotected.user.findUnique({
        where: { email }
      });
      if (userExisting) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is not available"
        });
      }
    }
    const passwordHashed = hashPassword(input.password);
    if (user) {
      user = await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { ...input, password: passwordHashed, status: "VERIFIED" }
      });
    } else {
      user = await ctx.databaseUnprotected.user.create({
        data: {
          email: input.email,
          name: input.name,
          pictureUrl: input.pictureUrl,
          password: passwordHashed
        }
      });
    }
    await AuthenticationService.onRegistration(ctx, user.id);
    return { id: user.id };
  }),
  sendResetPasswordEmail: Trpc.procedurePublic.input(z.object({ email: z.string() })).mutation(async ({ ctx, input }) => {
    const email = input.email.trim().toLowerCase();
    const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
      where: { email }
    });
    const payload = { userId: user.id };
    const secret = Configuration.getAuthenticationSecret();
    const TIME_24_HOURS = 60 * 60 * 24;
    const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS });
    const url = Configuration.getBaseUrl();
    const urlResetPassword = `${url}/reset-password/${token}`;
    try {
      await EmailServer.service.send({
        templateKey: "resetPassword",
        email: user.email,
        name: user.name ?? user.email,
        subject: `Reset your password`,
        variables: {
          url_password_reset: urlResetPassword
        }
      });
      return { success: true };
    } catch (error) {
      console.error(error.message);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not send the email"
      });
    }
  }),
  resetPassword: Trpc.procedurePublic.input(z.object({ token: z.string(), password: z.string() })).mutation(async ({ ctx, input }) => {
    checkPassword(input.password);
    const secret = Configuration.getAuthenticationSecret();
    let decoded;
    try {
      decoded = Jwt.verify(input.token, secret);
    } catch (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token is invalid"
      });
    }
    const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
      where: { id: decoded.userId }
    });
    const passwordHashed = hashPassword(input.password);
    await ctx.databaseUnprotected.user.update({
      where: { id: user.id },
      data: {
        password: passwordHashed
      }
    });
    return { success: true };
  })
});
const checkPassword = (password) => {
  const isValid = (password == null ? void 0 : password.length) >= 6;
  if (isValid) {
    return;
  }
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Password must have at least 6 characters."
  });
};
const checkTokenInvitation = (token) => {
  if (Utility.isNull(token)) {
    return;
  }
  const secret = Configuration.getAuthenticationSecret();
  let decoded;
  try {
    decoded = Jwt.verify(token, secret);
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token is invalid"
    });
  }
  return decoded;
};
const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = Bcrypt.genSaltSync(saltRounds);
  const passwordHashed = Bcrypt.hashSync(password, salt);
  return passwordHashed;
};
const AuthenticationServer = {
  createTrpcContext,
  getHttpContext,
  getHttpContextPublic,
  trpcRouter: AuthenticationRouter,
  service: AuthenticationService,
  expressSetup,
  getProviders
};
const MIMETYPE_SUPPORTED = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml"
];
const compressFile = async (file, options = { quality: 70 }) => {
  try {
    const isSupported = MIMETYPE_SUPPORTED.includes(file.type);
    const arrayBuffer = await file.arrayBuffer();
    if (!isSupported) {
      return {
        buffer: Buffer.from(arrayBuffer),
        filename: file.name,
        mimetype: file.type
      };
    }
    const buffer = await compressArrayBuffer(arrayBuffer, options);
    const filename = rename(file.name);
    return { buffer, mimetype: "image/webp", filename };
  } catch (error) {
    throw new Error(`Could not compress image: ${error.message}`);
  }
};
const compressArrayBuffer = async (arrayBuffer, options = { quality: 70 }) => {
  try {
    const { size, quality } = options;
    const buffer = Buffer.from(arrayBuffer);
    const image = sharp(buffer);
    const { height, width } = await image.metadata();
    const sizeBuilt = size ?? width > height ? width : height;
    const bufferCompressed = await sharp(buffer).resize(sizeBuilt).webp({ quality, effort: 6 }).toBuffer();
    return bufferCompressed;
  } catch (error) {
    throw new Error(`Could not compress image: ${error.message}`);
  }
};
const rename = (name = "") => {
  if (name.includes(".")) {
    const nameWithoutExtension = name.split(".").slice(-1).join(".");
    return `${nameWithoutExtension}.webp`;
  }
  return `${name}.webp`;
};
const ImageOptimizeShared = {
  compressFile,
  compressArrayBuffer
};
const uploadPrivateAction = async ({ request }) => {
  await AuthenticationServer.getHttpContext({ request });
  const schema = zfd.formData({
    file: zfd.file()
  });
  try {
    const formData = await request.formData();
    const data = schema.parse({
      file: formData.get("file")
    });
    const { buffer, mimetype, filename } = await ImageOptimizeShared.compressFile(data.file);
    const file = {
      name: filename,
      mimetype,
      buffer
    };
    const urls = await UploadService.uploadPrivate(file);
    return json(urls == null ? void 0 : urls[0]);
  } catch (error) {
    console.log(error);
    return json(`Could not upload file`, { status: 500 });
  }
};
const uploadPublicAction = async ({ request }) => {
  await AuthenticationServer.getHttpContext({ request });
  const schema = zfd.formData({
    file: zfd.file()
  });
  try {
    const formData = await request.formData();
    const data = schema.parse({
      file: formData.get("file")
    });
    const { buffer, mimetype, filename } = await ImageOptimizeShared.compressFile(data.file);
    const file = {
      name: filename,
      mimetype,
      buffer
    };
    const urls = await UploadService.uploadPublic(file);
    return json(urls == null ? void 0 : urls[0]);
  } catch (error) {
    console.log(error);
    return json(`Could not upload file`, { status: 500 });
  }
};
var UploadServer;
((UploadServer2) => {
  UploadServer2.service = UploadService;
  UploadServer2.actionPrivate = uploadPrivateAction;
  UploadServer2.actionPublic = uploadPublicAction;
  UploadServer2.trpcRouter = UploadRouter;
})(UploadServer || (UploadServer = {}));
const action$2 = UploadServer.actionPrivate;
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$4, Text: Text$2 } = Typography;
const { Option } = Select;
const { TextArea } = Input;
function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useUserContext();
  const { data: categories, isLoading: loadingCategories } = Api.category.findMany.useQuery({});
  const { data: products, isLoading: loadingProducts } = Api.product.findMany.useQuery({
    where: {
      categoryId: selectedCategory || void 0,
      name: { contains: searchQuery, mode: "insensitive" }
    },
    include: {
      category: true
    }
  });
  const { mutateAsync: createInquiry } = Api.inquiry.create.useMutation();
  const handleInquiry = async (values) => {
    try {
      await createInquiry({
        data: {
          type: "PRODUCT",
          message: values.message,
          status: "PENDING",
          productId: selectedProduct == null ? void 0 : selectedProduct.id,
          userId: user == null ? void 0 : user.id
        }
      });
      setInquiryModalVisible(false);
      Modal.success({ title: "Inquiry sent successfully!" });
    } catch (error) {
      Modal.error({ title: "Failed to send inquiry" });
    }
  };
  const filteredProducts = products == null ? void 0 : products.filter(
    (product) => {
      var _a2;
      return (_a2 = product.name) == null ? void 0 : _a2.toLowerCase().includes(searchQuery.toLowerCase());
    }
  );
  if (loadingCategories || loadingProducts) {
    return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "50px" }, children: /* @__PURE__ */ jsx(Spin, { size: "large" }) }) });
  }
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "20px" }, children: [
    /* @__PURE__ */ jsxs(Title$4, { level: 2, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-microchip" }),
      " Electronic Products"
    ] }),
    /* @__PURE__ */ jsx(Text$2, { children: "Browse our wide selection of electronic products and request quotes." }),
    /* @__PURE__ */ jsxs(Space, { style: { marginTop: 20, marginBottom: 20 }, size: "middle", children: [
      /* @__PURE__ */ jsx(
        Select,
        {
          style: { width: 200 },
          placeholder: "Select Category",
          onChange: (value) => setSelectedCategory(value),
          allowClear: true,
          children: categories == null ? void 0 : categories.map((category) => /* @__PURE__ */ jsx(Option, { value: category.id, children: category.name }, category.id))
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search products...",
          prefix: /* @__PURE__ */ jsx("i", { className: "las la-search" }),
          onChange: (e) => setSearchQuery(e.target.value),
          style: { width: 300 }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Row, { gutter: [16, 16], children: filteredProducts == null ? void 0 : filteredProducts.map((product) => {
      var _a2;
      return /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ jsx(
        Card,
        {
          hoverable: true,
          cover: /* @__PURE__ */ jsx(
            "img",
            {
              alt: product.name,
              src: product.imageUrl || "https://placeholder.com/300x200",
              style: { height: 200, objectFit: "cover" }
            }
          ),
          actions: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "primary",
                icon: /* @__PURE__ */ jsx("i", { className: "las la-envelope" }),
                onClick: () => {
                  setSelectedProduct(product);
                  setInquiryModalVisible(true);
                },
                children: "Request Quote"
              }
            )
          ],
          children: /* @__PURE__ */ jsx(
            Card.Meta,
            {
              title: product.name,
              description: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Text$2, { type: "secondary", children: (_a2 = product.category) == null ? void 0 : _a2.name }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx(Text$2, { children: product.description }),
                product.specifications && /* @__PURE__ */ jsxs("div", { style: { marginTop: 10 }, children: [
                  /* @__PURE__ */ jsx(Text$2, { strong: true, children: "Specifications:" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx(Text$2, { children: product.specifications })
                ] }),
                product.price && /* @__PURE__ */ jsxs("div", { style: { marginTop: 10 }, children: [
                  /* @__PURE__ */ jsx(Text$2, { strong: true, children: "Price: " }),
                  /* @__PURE__ */ jsx(Text$2, { children: product.price })
                ] })
              ] })
            }
          )
        }
      ) }, product.id);
    }) }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Request Product Quote",
        open: inquiryModalVisible,
        onCancel: () => setInquiryModalVisible(false),
        footer: null,
        children: /* @__PURE__ */ jsxs(Form, { onFinish: handleInquiry, layout: "vertical", children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "message",
              label: "Message",
              rules: [{ required: true, message: "Please enter your message" }],
              children: /* @__PURE__ */ jsx(TextArea, { rows: 4, placeholder: "Enter your inquiry details..." })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "primary",
              htmlType: "submit",
              icon: /* @__PURE__ */ jsx("i", { className: "las la-paper-plane" }),
              children: "Send Inquiry"
            }
          ) })
        ] })
      }
    )
  ] }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductsPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$3, Text: Text$1, Paragraph: Paragraph$3 } = Typography;
function ServicesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { data: services, isLoading } = Api.service.findMany.useQuery({
    include: {
      inquirys: true
    }
  });
  const { mutateAsync: createInquiry } = Api.inquiry.create.useMutation();
  const handleInquirySubmit = async (values) => {
    try {
      await createInquiry({
        data: {
          type: "SERVICE",
          message: values.message,
          status: "PENDING",
          serviceId: values.serviceId
        }
      });
      message.success("Inquiry submitted successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit inquiry");
    }
  };
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "24px" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
      /* @__PURE__ */ jsxs(Title$3, { level: 1, children: [
        /* @__PURE__ */ jsx("i", { className: "las la-cogs", style: { marginRight: 8 } }),
        "Manufacturing Services"
      ] }),
      /* @__PURE__ */ jsx(Paragraph$3, { children: "Discover our comprehensive range of manufacturing services designed to meet your specific needs" })
    ] }),
    isLoading ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: "Loading services..." }) : /* @__PURE__ */ jsx(Row, { gutter: [24, 24], children: services == null ? void 0 : services.map((service) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, lg: 8, children: /* @__PURE__ */ jsx(
      Card,
      {
        hoverable: true,
        cover: service.imageUrl && /* @__PURE__ */ jsx(
          "img",
          {
            alt: service.name,
            src: service.imageUrl,
            style: { height: 200, objectFit: "cover" }
          }
        ),
        actions: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "primary",
              onClick: () => {
                form.setFieldsValue({ serviceId: service.id });
                setIsModalVisible(true);
              },
              children: [
                /* @__PURE__ */ jsx(
                  "i",
                  {
                    className: "las la-envelope",
                    style: { marginRight: 8 }
                  }
                ),
                "Request Service"
              ]
            },
            "inquire"
          )
        ],
        children: /* @__PURE__ */ jsx(
          Card.Meta,
          {
            title: /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx(
                "i",
                {
                  className: "las la-industry",
                  style: { marginRight: 8 }
                }
              ),
              service.name
            ] }),
            description: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Paragraph$3, { ellipsis: { rows: 2 }, children: service.description }),
              /* @__PURE__ */ jsx(Text$1, { strong: true, children: "Process Details:" }),
              /* @__PURE__ */ jsx(Paragraph$3, { ellipsis: { rows: 3 }, children: service.processDetails })
            ] })
          }
        )
      }
    ) }, service.id)) }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Request Custom Manufacturing Solution",
        open: isModalVisible,
        onCancel: () => setIsModalVisible(false),
        footer: null,
        children: /* @__PURE__ */ jsxs(Form, { form, onFinish: handleInquirySubmit, layout: "vertical", children: [
          /* @__PURE__ */ jsx(Form.Item, { name: "serviceId", hidden: true, children: /* @__PURE__ */ jsx(Input, {}) }),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "message",
              label: "Message",
              rules: [
                {
                  required: true,
                  message: "Please describe your requirements"
                }
              ],
              children: /* @__PURE__ */ jsx(
                Input.TextArea,
                {
                  rows: 4,
                  placeholder: "Please describe your specific requirements and expectations..."
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsxs(Button, { type: "primary", htmlType: "submit", block: true, children: [
            /* @__PURE__ */ jsx(
              "i",
              {
                className: "las la-paper-plane",
                style: { marginRight: 8 }
              }
            ),
            "Submit Request"
          ] }) })
        ] })
      }
    )
  ] }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ServicesPage
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = UploadServer.actionPublic;
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$2, Text, Paragraph: Paragraph$2 } = Typography;
function ContactUsPage() {
  const [form] = Form.useForm();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const { data: contacts } = Api.contact.findMany.useQuery({});
  const contact = contacts == null ? void 0 : contacts[0];
  const { mutateAsync: createInquiry } = Api.inquiry.create.useMutation();
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await createInquiry({
        data: {
          type: values.subject,
          message: values.message,
          status: "PENDING",
          userId: user == null ? void 0 : user.id
        }
      });
      message.success("Your inquiry has been submitted successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "24px" }, children: [
    /* @__PURE__ */ jsx(Title$2, { level: 1, children: "Contact Us" }),
    /* @__PURE__ */ jsx(Paragraph$2, { children: "Get in touch with us! Whether you have questions about our products, services, or just want to say hello, we're here to help." }),
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], children: [
      /* @__PURE__ */ jsxs(Col, { xs: 24, md: 8, children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(Title$2, { level: 3, children: "Contact Information" }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("i", { className: "las la-map-marker", style: { marginRight: 8 } }),
              /* @__PURE__ */ jsx(Text, { strong: true, children: "Address:" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(Text, { children: contact == null ? void 0 : contact.address })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("i", { className: "las la-phone", style: { marginRight: 8 } }),
              /* @__PURE__ */ jsx(Text, { strong: true, children: "Phone:" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(Text, { children: contact == null ? void 0 : contact.phone })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("i", { className: "las la-envelope", style: { marginRight: 8 } }),
              /* @__PURE__ */ jsx(Text, { strong: true, children: "Email:" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(Text, { children: contact == null ? void 0 : contact.email })
            ] })
          ] })
        ] }),
        (contact == null ? void 0 : contact.mapCoordinates) && /* @__PURE__ */ jsxs(Card, { style: { marginTop: 16 }, children: [
          /* @__PURE__ */ jsx(Title$2, { level: 3, children: "Our Location" }),
          /* @__PURE__ */ jsx(
            "iframe",
            {
              src: `https://www.google.com/maps/embed?pb=${contact.mapCoordinates}`,
              width: "100%",
              height: "300",
              style: { border: 0 },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(Col, { xs: 24, md: 16, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(Title$2, { level: 3, children: "Send us a Message" }),
        /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            layout: "vertical",
            onFinish: handleSubmit,
            initialValues: { email: user == null ? void 0 : user.email },
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "name",
                  label: "Name",
                  rules: [
                    { required: true, message: "Please enter your name" }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      prefix: /* @__PURE__ */ jsx("i", { className: "las la-user" }),
                      placeholder: "Your name"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "email",
                  label: "Email",
                  rules: [
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      prefix: /* @__PURE__ */ jsx("i", { className: "las la-envelope" }),
                      placeholder: "Your email"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "subject",
                  label: "Subject",
                  rules: [
                    { required: true, message: "Please enter a subject" }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      prefix: /* @__PURE__ */ jsx("i", { className: "las la-heading" }),
                      placeholder: "Subject"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "message",
                  label: "Message",
                  rules: [
                    { required: true, message: "Please enter your message" }
                  ],
                  children: /* @__PURE__ */ jsx(
                    Input.TextArea,
                    {
                      rows: 4,
                      placeholder: "Your message",
                      style: { resize: "none" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "primary",
                  htmlType: "submit",
                  loading,
                  block: true,
                  children: [
                    /* @__PURE__ */ jsx(
                      "i",
                      {
                        className: "las la-paper-plane",
                        style: { marginRight: 8 }
                      }
                    ),
                    "Send Message"
                  ]
                }
              ) })
            ]
          }
        )
      ] }) })
    ] })
  ] }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactUsPage
}, Symbol.toStringTag, { value: "Module" }));
function ProfilePage() {
  const { user, refetch: refetchUser } = useUserContext();
  const { mutateAsync: logout } = Api.authentication.logout.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingLogout, setLoadingLogout] = useState(false);
  const { mutateAsync: updateUser } = Api.user.update.useMutation();
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await updateUser({
        where: { id: user.id },
        data: {
          email: values.email,
          name: values.name,
          pictureUrl: values.pictureUrl
        }
      });
      refetchUser();
    } catch (error) {
      console.error(`Could not save user: ${error.message}`, {
        variant: "error"
      });
    }
    setLoading(false);
  };
  const handleClickLogout = async () => {
    setLoadingLogout(true);
    try {
      await logout();
    } catch (error) {
      console.error(`Could not logout: ${error.message}`, {
        variant: "error"
      });
      setLoadingLogout(false);
    }
  };
  return /* @__PURE__ */ jsxs(PageLayout, { layout: "super-narrow", children: [
    /* @__PURE__ */ jsxs(Flex, { justify: "space-between", align: "center", children: [
      /* @__PURE__ */ jsx(Typography.Title, { level: 1, children: "Profile" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleClickLogout, loading: isLoadingLogout, children: "Logout" })
    ] }),
    /* @__PURE__ */ jsx(Flex, { justify: "center", style: { marginBottom: "30px" }, children: /* @__PURE__ */ jsx(Avatar, { size: 80, src: user == null ? void 0 : user.pictureUrl, children: Utility.stringToInitials(user == null ? void 0 : user.name) }) }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        initialValues: user,
        onFinish: handleSubmit,
        layout: "vertical",
        requiredMark: false,
        children: [
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              name: "name",
              label: "Name",
              rules: [{ required: true, message: "Name is required" }],
              children: /* @__PURE__ */ jsx(Input, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Item,
            {
              label: "Email",
              name: "email",
              rules: [{ required: true, message: "Email is required" }],
              children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" })
            }
          ),
          /* @__PURE__ */ jsx(Form.Item, { label: "Profile picture", name: "pictureUrl", children: /* @__PURE__ */ jsx(Input, {}) }),
          /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Flex, { justify: "end", children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, children: "Save" }) }) })
        ]
      }
    )
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfilePage
}, Symbol.toStringTag, { value: "Module" }));
function RegisterPage() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { mutateAsync: register } = Api.authentication.register.useMutation();
  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  useEffect(() => {
    var _a2;
    const email = (_a2 = searchParams.get("email")) == null ? void 0 : _a2.trim();
    if (Utility.isDefined(email)) {
      form.setFieldsValue({ email });
    }
  }, [searchParams]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const tokenInvitation = searchParams.get("tokenInvitation") ?? void 0;
      await register({ ...values, tokenInvitation });
      login(values);
    } catch (error) {
      console.error(`Could not signup: ${error.message}`, {
        variant: "error"
      });
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "50px",
        paddingTop: "50px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "Welcome!" }),
        /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            autoComplete: "off",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Email",
                  name: "email",
                  rules: [{ required: true, message: "Email is required" }],
                  children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  name: "name",
                  rules: [{ required: true, message: "Name is required" }],
                  label: "Name",
                  children: /* @__PURE__ */ jsx(Input, { placeholder: "Your name" })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password",
                  name: "password",
                  rules: [{ required: true, message: "Password is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Your password",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", loading: isLoading, block: true, children: "Register" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            ghost: true,
            style: { border: "none" },
            onClick: () => router("/login"),
            children: /* @__PURE__ */ jsxs(Flex, { gap: "small", justify: "center", children: [
              /* @__PURE__ */ jsx(Typography.Text, { type: "secondary", children: "Have an account?" }),
              " ",
              /* @__PURE__ */ jsx(Typography.Text, { children: "Sign in" })
            ] })
          }
        )
      ]
    }
  ) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RegisterPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title: Title$1, Paragraph: Paragraph$1 } = Typography;
function AboutUsPage() {
  const { data: partners } = Api.partner.findMany.useQuery({});
  const { data: facilities } = Api.facility.findMany.useQuery({});
  const { data: certifications } = Api.certification.findMany.useQuery({});
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "24px" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
      /* @__PURE__ */ jsxs(Title$1, { level: 1, children: [
        /* @__PURE__ */ jsx("i", { className: "las la-building", style: { marginRight: 8 } }),
        "About Our Company"
      ] }),
      /* @__PURE__ */ jsx(Paragraph$1, { style: { fontSize: 18 }, children: "Discover our journey, mission, and commitment to excellence in manufacturing" })
    ] }),
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: [
      /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
        Card,
        {
          title: /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-history", style: { marginRight: 8 } }),
            "Our History"
          ] }),
          children: /* @__PURE__ */ jsx(Paragraph$1, { children: "Founded in 1995, our company has grown from a small local manufacturer to a global leader in industrial solutions. Through decades of innovation and dedication, we've established ourselves as a trusted partner for businesses worldwide." })
        }
      ) }),
      /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, children: /* @__PURE__ */ jsx(
        Card,
        {
          title: /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("i", { className: "las la-flag", style: { marginRight: 8 } }),
            "Our Mission"
          ] }),
          children: /* @__PURE__ */ jsx(Paragraph$1, { children: "Our mission is to deliver exceptional quality products while maintaining the highest standards of sustainability and innovation. We strive to create value for our customers through cutting-edge manufacturing solutions." })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Title$1, { level: 2, style: { textAlign: "center", marginBottom: 24 }, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-handshake", style: { marginRight: 8 } }),
      "Trusted Partners"
    ] }),
    /* @__PURE__ */ jsx("div", { style: { marginBottom: 48 }, children: /* @__PURE__ */ jsx(Carousel, { autoplay: true, children: partners == null ? void 0 : partners.map((partner) => /* @__PURE__ */ jsxs(
      "div",
      {
        style: { padding: 24, textAlign: "center" },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: partner.logo || "",
              alt: partner.name || "",
              style: { maxHeight: 100, margin: "0 auto" }
            }
          ),
          /* @__PURE__ */ jsx(Title$1, { level: 4, children: partner.name }),
          /* @__PURE__ */ jsx(Paragraph$1, { children: partner.description })
        ]
      },
      partner.id
    )) }) }),
    /* @__PURE__ */ jsxs(Title$1, { level: 2, style: { textAlign: "center", marginBottom: 24 }, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-industry", style: { marginRight: 8 } }),
      "Our Facilities"
    ] }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: facilities == null ? void 0 : facilities.map((facility) => /* @__PURE__ */ jsx(Col, { xs: 24, md: 12, lg: 8, children: /* @__PURE__ */ jsxs(
      Card,
      {
        cover: /* @__PURE__ */ jsx(
          "img",
          {
            alt: facility.name || "",
            src: facility.imageUrl || "",
            style: { height: 200, objectFit: "cover" }
          }
        ),
        children: [
          /* @__PURE__ */ jsx(Title$1, { level: 4, children: facility.name }),
          /* @__PURE__ */ jsx(Paragraph$1, { children: facility.description }),
          /* @__PURE__ */ jsxs(Paragraph$1, { children: [
            /* @__PURE__ */ jsx("strong", { children: "Location:" }),
            " ",
            facility.location
          ] }),
          /* @__PURE__ */ jsxs(Paragraph$1, { children: [
            /* @__PURE__ */ jsx("strong", { children: "Capabilities:" }),
            " ",
            facility.capabilities
          ] })
        ]
      }
    ) }, facility.id)) }),
    /* @__PURE__ */ jsxs(Title$1, { level: 2, style: { textAlign: "center", marginBottom: 24 }, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-certificate", style: { marginRight: 8 } }),
      "Certifications & Standards"
    ] }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], children: certifications == null ? void 0 : certifications.map((cert) => /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 8, lg: 6, children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: cert.imageUrl || "",
          alt: cert.name || "",
          style: { width: "100%", height: 120, objectFit: "contain" }
        }
      ),
      /* @__PURE__ */ jsx(Title$1, { level: 4, style: { marginTop: 16 }, children: cert.name }),
      /* @__PURE__ */ jsx(Paragraph$1, { children: cert.description }),
      /* @__PURE__ */ jsxs(Paragraph$1, { children: [
        /* @__PURE__ */ jsx("strong", { children: "Valid Until:" }),
        " ",
        cert.validUntil
      ] })
    ] }) }, cert.id)) })
  ] }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutUsPage
}, Symbol.toStringTag, { value: "Module" }));
const { Title, Paragraph } = Typography;
function HomePage() {
  const navigate = useNavigate();
  const { data: products } = Api.product.findMany.useQuery({
    take: 4,
    include: {
      category: true
    }
  });
  const { data: services } = Api.service.findMany.useQuery({
    take: 3
  });
  const { data: facilities } = Api.facility.findMany.useQuery({
    take: 3
  });
  return /* @__PURE__ */ jsx(PageLayout, { layout: "full-width", children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 20px" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
      /* @__PURE__ */ jsxs(Title, { level: 1, children: [
        /* @__PURE__ */ jsx("i", { className: "las la-industry" }),
        " Manufacturing Excellence"
      ] }),
      /* @__PURE__ */ jsx(Paragraph, { style: { fontSize: 18 }, children: "Your trusted partner in industrial manufacturing and innovative solutions" })
    ] }),
    /* @__PURE__ */ jsxs(Title, { level: 2, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-box" }),
      " Featured Products"
    ] }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: products == null ? void 0 : products.map((product) => {
      var _a2;
      return /* @__PURE__ */ jsx(Col, { xs: 24, sm: 12, md: 6, children: /* @__PURE__ */ jsx(
        Card,
        {
          hoverable: true,
          cover: /* @__PURE__ */ jsx(
            "img",
            {
              alt: product.name,
              src: product.imageUrl || "https://via.placeholder.com/300",
              style: { height: 200, objectFit: "cover" }
            }
          ),
          onClick: () => navigate("/products"),
          children: /* @__PURE__ */ jsx(
            Card.Meta,
            {
              title: product.name,
              description: (_a2 = product.category) == null ? void 0 : _a2.name
            }
          )
        }
      ) }, product.id);
    }) }),
    /* @__PURE__ */ jsxs(Title, { level: 2, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-tools" }),
      " Manufacturing Capabilities"
    ] }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: facilities == null ? void 0 : facilities.map((facility) => /* @__PURE__ */ jsx(Col, { xs: 24, md: 8, children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(
        "i",
        {
          className: "las la-cog",
          style: { fontSize: 32, marginBottom: 16 }
        }
      ),
      /* @__PURE__ */ jsx(Title, { level: 4, children: facility.name }),
      /* @__PURE__ */ jsx(Paragraph, { children: facility.description })
    ] }) }, facility.id)) }),
    /* @__PURE__ */ jsxs(Title, { level: 2, children: [
      /* @__PURE__ */ jsx("i", { className: "las la-concierge-bell" }),
      " Our Services"
    ] }),
    /* @__PURE__ */ jsx(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: services == null ? void 0 : services.map((service) => /* @__PURE__ */ jsx(Col, { xs: 24, md: 8, children: /* @__PURE__ */ jsx(
      Card,
      {
        hoverable: true,
        cover: /* @__PURE__ */ jsx(
          "img",
          {
            alt: service.name,
            src: service.imageUrl || "https://via.placeholder.com/300",
            style: { height: 200, objectFit: "cover" }
          }
        ),
        onClick: () => navigate("/services"),
        children: /* @__PURE__ */ jsx(
          Card.Meta,
          {
            title: service.name,
            description: service.description
          }
        )
      }
    ) }, service.id)) }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsxs(Row, { gutter: [24, 24], style: { marginBottom: 48 }, children: [
      /* @__PURE__ */ jsxs(Col, { xs: 24, md: 8, children: [
        /* @__PURE__ */ jsxs(Title, { level: 4, children: [
          /* @__PURE__ */ jsx("i", { className: "las la-phone" }),
          " Contact Us"
        ] }),
        /* @__PURE__ */ jsxs(Paragraph, { children: [
          "Need assistance? Our team is here to help.",
          " ",
          /* @__PURE__ */ jsx("a", { onClick: () => navigate("/contact"), children: "Get in touch" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Col, { xs: 24, md: 8, children: [
        /* @__PURE__ */ jsxs(Title, { level: 4, children: [
          /* @__PURE__ */ jsx("i", { className: "las la-info-circle" }),
          " About Us"
        ] }),
        /* @__PURE__ */ jsxs(Paragraph, { children: [
          "Learn more about our company and values.",
          " ",
          /* @__PURE__ */ jsx("a", { onClick: () => navigate("/about"), children: "Read more" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Col, { xs: 24, md: 8, children: [
        /* @__PURE__ */ jsxs(Title, { level: 4, children: [
          /* @__PURE__ */ jsx("i", { className: "las la-catalog" }),
          " Product Catalog"
        ] }),
        /* @__PURE__ */ jsxs(Paragraph, { children: [
          "Browse our complete product range.",
          " ",
          /* @__PURE__ */ jsx("a", { onClick: () => navigate("/products"), children: "View catalog" })
        ] })
      ] })
    ] })
  ] }) });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
const SocialButtons = () => {
  const { data } = Api.configuration.getPublic.useQuery();
  const providers2 = (data == null ? void 0 : data.authenticationProviders) ?? [];
  if (providers2.length === 0) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  const ProviderIcon = (props) => {
    switch (props.name) {
      case "google":
        return /* @__PURE__ */ jsx(GoogleOutlined, {});
      default:
        return /* @__PURE__ */ jsx(LoginOutlined, {});
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Flex, { vertical: true, align: "center", children: providers2.map((provider) => /* @__PURE__ */ jsx(
    "a",
    {
      href: `/api/auth/${provider.name}`,
      className: "w-full",
      children: /* @__PURE__ */ jsxs(
        Button,
        {
          size: "large",
          icon: /* @__PURE__ */ jsx(ProviderIcon, { name: provider.name }),
          block: true,
          children: [
            "Continue with",
            " ",
            /* @__PURE__ */ jsx("span", { style: { textTransform: "capitalize" }, children: provider.name })
          ]
        }
      )
    },
    provider.name
  )) }) });
};
var AuthenticationClient;
((AuthenticationClient2) => {
  AuthenticationClient2.SocialButtons = SocialButtons;
})(AuthenticationClient || (AuthenticationClient = {}));
function LoginPage() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    }
  });
  const errorKey = searchParams.get("error");
  const errorMessage = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in."
  }[errorKey ?? "default"];
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      form.setFieldValue("email", "test@test.com");
      form.setFieldValue("password", "password");
    }
  }, []);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login({ email: values.email, password: values.password });
    } catch (error) {
      console.error(`Could not login: ${error.message}`, { variant: "error" });
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", vertical: true, flex: 1, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      vertical: true,
      style: {
        width: "340px",
        paddingBottom: "50px",
        paddingTop: "50px"
      },
      gap: "middle",
      children: [
        /* @__PURE__ */ jsx(AppHeader, { description: "Welcome!" }),
        errorKey && /* @__PURE__ */ jsx(Typography.Text, { type: "danger", children: errorMessage }),
        /* @__PURE__ */ jsxs(
          Form,
          {
            form,
            onFinish: handleSubmit,
            layout: "vertical",
            requiredMark: false,
            children: [
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Email",
                  name: "email",
                  rules: [{ required: true, message: "Email is required" }],
                  children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", autoComplete: "email" })
                }
              ),
              /* @__PURE__ */ jsx(
                Form.Item,
                {
                  label: "Password",
                  name: "password",
                  rules: [{ required: true, message: "Password is required" }],
                  children: /* @__PURE__ */ jsx(
                    Input.Password,
                    {
                      type: "password",
                      placeholder: "Your password",
                      autoComplete: "current-password"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Flex, { justify: "end", children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "link",
                  onClick: () => router("/reset-password"),
                  style: { padding: 0, margin: 0 },
                  children: "Forgot password?"
                }
              ) }) }),
              /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Button, { type: "primary", htmlType: "submit", block: true, loading: isLoading, children: "Sign in" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AuthenticationClient.SocialButtons, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            ghost: true,
            style: { border: "none" },
            onClick: () => router("/register"),
            children: /* @__PURE__ */ jsxs(Flex, { gap: "small", justify: "center", children: [
              /* @__PURE__ */ jsx(Typography.Text, { type: "secondary", children: "No account?" }),
              " ",
              /* @__PURE__ */ jsx(Typography.Text, { children: "Sign up" })
            ] })
          }
        )
      ]
    }
  ) });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoginPage
}, Symbol.toStringTag, { value: "Module" }));
async function checkMutate(promise) {
  var _a2;
  try {
    return await promise;
  } catch (err) {
    if (isPrismaClientKnownRequestError(err)) {
      if (err.code === "P2004") {
        if (((_a2 = err.meta) == null ? void 0 : _a2.reason) === "RESULT_NOT_READABLE") {
          return void 0;
        } else {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: err.message,
            cause: err
          });
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err.message,
          cause: err
        });
      }
    } else {
      throw err;
    }
  }
}
async function checkRead(promise) {
  try {
    return await promise;
  } catch (err) {
    if (isPrismaClientKnownRequestError(err)) {
      if (err.code === "P2004") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: err.message,
          cause: err
        });
      } else if (err.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: err.message,
          cause: err
        });
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err.message,
          cause: err
        });
      }
    } else {
      throw err;
    }
  }
}
const $Schema$8 = _Schema.default ?? _Schema;
function createRouter$9(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$8.UserInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.createMany(input))),
      create: procedure2.input($Schema$8.UserInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.create(input))),
      deleteMany: procedure2.input($Schema$8.UserInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.deleteMany(input))),
      delete: procedure2.input($Schema$8.UserInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.delete(input))),
      findFirst: procedure2.input($Schema$8.UserInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).user.findFirst(input))),
      findMany: procedure2.input($Schema$8.UserInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).user.findMany(input))),
      findUnique: procedure2.input($Schema$8.UserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).user.findUnique(input))),
      updateMany: procedure2.input($Schema$8.UserInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.updateMany(input))),
      update: procedure2.input($Schema$8.UserInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).user.update(input))),
      count: procedure2.input($Schema$8.UserInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).user.count(input)))
    }
  );
}
const $Schema$7 = _Schema.default ?? _Schema;
function createRouter$8(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$7.CategoryInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.createMany(input))),
      create: procedure2.input($Schema$7.CategoryInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.create(input))),
      deleteMany: procedure2.input($Schema$7.CategoryInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.deleteMany(input))),
      delete: procedure2.input($Schema$7.CategoryInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.delete(input))),
      findFirst: procedure2.input($Schema$7.CategoryInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).category.findFirst(input))),
      findMany: procedure2.input($Schema$7.CategoryInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).category.findMany(input))),
      findUnique: procedure2.input($Schema$7.CategoryInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).category.findUnique(input))),
      updateMany: procedure2.input($Schema$7.CategoryInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.updateMany(input))),
      update: procedure2.input($Schema$7.CategoryInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).category.update(input))),
      count: procedure2.input($Schema$7.CategoryInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).category.count(input)))
    }
  );
}
const $Schema$6 = _Schema.default ?? _Schema;
function createRouter$7(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$6.ProductInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.createMany(input))),
      create: procedure2.input($Schema$6.ProductInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.create(input))),
      deleteMany: procedure2.input($Schema$6.ProductInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.deleteMany(input))),
      delete: procedure2.input($Schema$6.ProductInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.delete(input))),
      findFirst: procedure2.input($Schema$6.ProductInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).product.findFirst(input))),
      findMany: procedure2.input($Schema$6.ProductInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).product.findMany(input))),
      findUnique: procedure2.input($Schema$6.ProductInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).product.findUnique(input))),
      updateMany: procedure2.input($Schema$6.ProductInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.updateMany(input))),
      update: procedure2.input($Schema$6.ProductInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.update(input))),
      count: procedure2.input($Schema$6.ProductInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).product.count(input)))
    }
  );
}
const $Schema$5 = _Schema.default ?? _Schema;
function createRouter$6(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$5.ServiceInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.createMany(input))),
      create: procedure2.input($Schema$5.ServiceInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.create(input))),
      deleteMany: procedure2.input($Schema$5.ServiceInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.deleteMany(input))),
      delete: procedure2.input($Schema$5.ServiceInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.delete(input))),
      findFirst: procedure2.input($Schema$5.ServiceInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).service.findFirst(input))),
      findMany: procedure2.input($Schema$5.ServiceInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).service.findMany(input))),
      findUnique: procedure2.input($Schema$5.ServiceInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).service.findUnique(input))),
      updateMany: procedure2.input($Schema$5.ServiceInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.updateMany(input))),
      update: procedure2.input($Schema$5.ServiceInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.update(input))),
      count: procedure2.input($Schema$5.ServiceInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).service.count(input)))
    }
  );
}
const $Schema$4 = _Schema.default ?? _Schema;
function createRouter$5(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$4.InquiryInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.createMany(input))),
      create: procedure2.input($Schema$4.InquiryInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.create(input))),
      deleteMany: procedure2.input($Schema$4.InquiryInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.deleteMany(input))),
      delete: procedure2.input($Schema$4.InquiryInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.delete(input))),
      findFirst: procedure2.input($Schema$4.InquiryInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).inquiry.findFirst(input))),
      findMany: procedure2.input($Schema$4.InquiryInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).inquiry.findMany(input))),
      findUnique: procedure2.input($Schema$4.InquiryInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).inquiry.findUnique(input))),
      updateMany: procedure2.input($Schema$4.InquiryInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.updateMany(input))),
      update: procedure2.input($Schema$4.InquiryInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).inquiry.update(input))),
      count: procedure2.input($Schema$4.InquiryInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).inquiry.count(input)))
    }
  );
}
const $Schema$3 = _Schema.default ?? _Schema;
function createRouter$4(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$3.PartnerInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.createMany(input))),
      create: procedure2.input($Schema$3.PartnerInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.create(input))),
      deleteMany: procedure2.input($Schema$3.PartnerInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.deleteMany(input))),
      delete: procedure2.input($Schema$3.PartnerInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.delete(input))),
      findFirst: procedure2.input($Schema$3.PartnerInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).partner.findFirst(input))),
      findMany: procedure2.input($Schema$3.PartnerInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).partner.findMany(input))),
      findUnique: procedure2.input($Schema$3.PartnerInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).partner.findUnique(input))),
      updateMany: procedure2.input($Schema$3.PartnerInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.updateMany(input))),
      update: procedure2.input($Schema$3.PartnerInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).partner.update(input))),
      count: procedure2.input($Schema$3.PartnerInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).partner.count(input)))
    }
  );
}
const $Schema$2 = _Schema.default ?? _Schema;
function createRouter$3(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$2.CertificationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.createMany(input))),
      create: procedure2.input($Schema$2.CertificationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.create(input))),
      deleteMany: procedure2.input($Schema$2.CertificationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.deleteMany(input))),
      delete: procedure2.input($Schema$2.CertificationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.delete(input))),
      findFirst: procedure2.input($Schema$2.CertificationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).certification.findFirst(input))),
      findMany: procedure2.input($Schema$2.CertificationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).certification.findMany(input))),
      findUnique: procedure2.input($Schema$2.CertificationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).certification.findUnique(input))),
      updateMany: procedure2.input($Schema$2.CertificationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.updateMany(input))),
      update: procedure2.input($Schema$2.CertificationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).certification.update(input))),
      count: procedure2.input($Schema$2.CertificationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).certification.count(input)))
    }
  );
}
const $Schema$1 = _Schema.default ?? _Schema;
function createRouter$2(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema$1.ContactInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).contact.createMany(input))),
      create: procedure2.input($Schema$1.ContactInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).contact.create(input))),
      deleteMany: procedure2.input($Schema$1.ContactInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).contact.deleteMany(input))),
      delete: procedure2.input($Schema$1.ContactInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).contact.delete(input))),
      findFirst: procedure2.input($Schema$1.ContactInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).contact.findFirst(input))),
      findMany: procedure2.input($Schema$1.ContactInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).contact.findMany(input))),
      findUnique: procedure2.input($Schema$1.ContactInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).contact.findUnique(input))),
      updateMany: procedure2.input($Schema$1.ContactInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).contact.updateMany(input))),
      update: procedure2.input($Schema$1.ContactInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).contact.update(input))),
      count: procedure2.input($Schema$1.ContactInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).contact.count(input)))
    }
  );
}
const $Schema = _Schema.default ?? _Schema;
function createRouter$1(router, procedure2) {
  return router(
    {
      createMany: procedure2.input($Schema.FacilityInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.createMany(input))),
      create: procedure2.input($Schema.FacilityInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.create(input))),
      deleteMany: procedure2.input($Schema.FacilityInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.deleteMany(input))),
      delete: procedure2.input($Schema.FacilityInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.delete(input))),
      findFirst: procedure2.input($Schema.FacilityInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).facility.findFirst(input))),
      findMany: procedure2.input($Schema.FacilityInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).facility.findMany(input))),
      findUnique: procedure2.input($Schema.FacilityInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).facility.findUnique(input))),
      updateMany: procedure2.input($Schema.FacilityInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.updateMany(input))),
      update: procedure2.input($Schema.FacilityInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).facility.update(input))),
      count: procedure2.input($Schema.FacilityInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).facility.count(input)))
    }
  );
}
function db(ctx) {
  if (!ctx.prisma) {
    throw new Error('Missing "prisma" field in trpc context');
  }
  return ctx.prisma;
}
function createRouter(router, procedure2) {
  return router(
    {
      user: createRouter$9(router, procedure2),
      category: createRouter$8(router, procedure2),
      product: createRouter$7(router, procedure2),
      service: createRouter$6(router, procedure2),
      inquiry: createRouter$5(router, procedure2),
      partner: createRouter$4(router, procedure2),
      certification: createRouter$3(router, procedure2),
      contact: createRouter$2(router, procedure2),
      facility: createRouter$1(router, procedure2)
    }
  );
}
const trpcRouter = Trpc.createRouter({
  getPublic: Trpc.procedurePublic.query(async () => {
    const variables = process.env ?? {};
    const authenticationProviders = AuthenticationServer.getProviders().map(
      (provider) => ({ name: provider.name })
    );
    const variablesPublic = {
      authenticationProviders
    };
    for (const [key, value] of Object.entries(variables)) {
      const isPublic = key.startsWith("PUBLIC_");
      if (isPublic) {
        variablesPublic[key] = value;
      }
    }
    return variablesPublic;
  })
});
const ConfigurationServer = {
  trpcRouter
};
class GeminiProvider {
  constructor() {
    __publicField(this, "generativeAI");
    this.initialize();
  }
  fromTextToAudio(text) {
    throw new Error("Method not implemented for this provider.");
  }
  generateImage(prompt) {
    throw new Error("Method not implemented for this provider.");
  }
  initialize() {
    try {
      const apiKey = process.env.SERVER_GEMINI_API_KEY;
      if (!apiKey) {
        console.log(`Set SERVER_GEMINI_API_KEY in your .env to activate Gemini`);
        return;
      }
      this.generativeAI = new GoogleGenerativeAI(apiKey);
      console.log(`Gemini is active`);
    } catch (error) {
      console.error(`Gemini failed to start`, error);
    }
  }
  isActive() {
    return !!this.generativeAI;
  }
  async generateText(options) {
    if (!this.isActive()) {
      return;
    }
    const model = this.generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash"
      /* GEMINI_1_5_FLASH */
    });
    const { prompt, history, context, system } = options;
    const messageOptions = { content: prompt, history, context };
    const messages = this.buildMessages(messageOptions);
    const response = await model.generateContent({
      contents: messages,
      generationConfig: {
        temperature: 0.3
        /* DETERMINISTIC */
      }
    });
    return this.parseResponse(response);
  }
  async generateJson(instruction, content, schema) {
    const geminiSchema = toGeminiSchema(schema);
    const model = this.generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema
      }
    });
    const response = await model.generateContent(content);
    return this.parseResponseJson(response);
  }
  async fromAudioToText(readStream) {
    if (!this.isActive()) {
      return;
    }
    const model = this.generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash"
      /* GEMINI_1_5_FLASH */
    });
    const base64BufferString = await this.readStreamToBase64(readStream);
    const response = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/mp3",
          data: base64BufferString
        }
      },
      { text: "Provide a transcription of the audio." }
    ]);
    return this.parseResponse(response);
  }
  buildMessages(options) {
    const { content, context, history = [] } = options;
    const systemMessage = {
      role: "assistant",
      parts: [{ text: (context == null ? void 0 : context.trim()) || "" }]
    };
    const historyMessages = history.map((message2, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      parts: [{ text: message2 }]
    }));
    const mainMessage = {
      role: "user",
      parts: [{ text: content }]
    };
    const filterEmptyText = (message2) => message2.parts.some((part) => part.text !== "");
    return [systemMessage, ...historyMessages, mainMessage].filter(
      filterEmptyText
    );
  }
  parseResponse(response) {
    const text = response.response.text();
    return text;
  }
  parseResponseJson(response) {
    const text = response.response.text();
    if (!text) {
      return;
    }
    return JSON.parse(text);
  }
  async readStreamToBase64(readStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readStream.on("data", (chunk) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      });
      readStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString("base64"));
      });
      readStream.on("error", (err) => {
        reject(err);
      });
    });
  }
}
class OpenaiProvider {
  constructor() {
    __publicField(this, "api");
    this.initialize();
  }
  initialize() {
    try {
      const apiKey = process.env.SERVER_OPENAI_API_KEY;
      if (!apiKey) {
        console.log(`Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI`);
        return;
      }
      this.api = new OpenaiSDK({ apiKey });
      console.log(`Openai is active`);
    } catch (error) {
      console.error(`Openai failed to start`);
    }
  }
  isActive() {
    if (this.api) {
      return true;
    } else {
      return false;
    }
  }
  async generateText(options) {
    const { prompt, attachmentUrls, history, context } = options;
    const messageOptions = { content: prompt, attachmentUrls, history, context };
    const messages = this.buildMessages(messageOptions);
    const response = await this.api.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });
    const content = this.parseResponseContent(response);
    return content;
  }
  async generateJson(instruction, content, schema, attachmentUrls) {
    const messages = this.buildMessages({ content, attachmentUrls });
    const response = await this.api.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: instruction }, ...messages],
      response_format: zodResponseFormat(schema, "result")
    });
    const json2 = this.parseResponseJson(response);
    return json2;
  }
  async generateImage(prompt) {
    const response = await this.api.images.generate({
      model: "dall-e-3",
      prompt
    });
    const imageUrl = this.parseResponseImage(response);
    return imageUrl;
  }
  async fromAudioToText(readStream) {
    const transcription = await this.api.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1"
      /* AUDIO_TO_TEXT */
    });
    return transcription.text;
  }
  async fromTextToAudio(text) {
    const mp3 = await this.api.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  }
  buildMessages(options) {
    const { content, context, attachmentUrls = [], history = [] } = options;
    const promptSystem = {
      role: "system",
      content: `${context}`.trim()
    };
    const historyMessages = history.map((message2, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: [{ type: "text", text: message2 }]
    }));
    const mainMessage = {
      role: "user",
      content: [
        { type: "text", text: content },
        ...attachmentUrls.map((url) => ({
          type: "image_url",
          image_url: { url }
        }))
      ]
    };
    return [
      promptSystem,
      ...historyMessages,
      mainMessage
    ];
  }
  parseResponseContent(response) {
    return response.choices[0].message.content;
  }
  parseResponseImage(response) {
    return response.data[0].url;
  }
  parseResponseJson(response) {
    return response.choices[0].message.parsed;
  }
}
class AiServiceFactory {
  static create(providerType) {
    let provider;
    switch (providerType) {
      case "openai":
        provider = new OpenaiProvider();
        break;
      case "gemini":
        provider = new GeminiProvider();
        break;
      default:
        throw new Error("Unsupported AI provider");
    }
    if (!provider.isActive()) {
      let message2 = "";
      switch (providerType) {
        case "openai":
          message2 = "Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI";
          break;
        case "gemini":
          message2 = "Set SERVER_GEMINI_API_KEY in your .env to activate Gemini";
          break;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: message2
      });
    }
    return provider;
  }
}
const AiRouter = Trpc.createRouter({
  generateText: Trpc.procedure.input(
    z.object({
      prompt: z.string(),
      attachmentUrls: z.array(z.string()).optional(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const { prompt, attachmentUrls, provider } = input;
    const aiService = AiServiceFactory.create(provider);
    const answer = await aiService.generateText({
      prompt,
      attachmentUrls
    });
    return { answer };
  }),
  /**
   * ? The schema in this function is an example. You should update it to your use-case.
   * ? If you need multiple schemas, you can create one dedicated function for each.
   */
  generateJson: Trpc.procedure.input(
    z.object({
      instruction: z.string(),
      content: z.string(),
      attachmentUrls: z.array(z.string()).optional(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const schema = z.object({
      results: z.array(
        z.object({
          description: z.string()
        })
      )
    });
    const aiService = AiServiceFactory.create(input.provider);
    const json2 = await aiService.generateJson(
      input.instruction,
      input.content,
      schema,
      input.attachmentUrls
    );
    return json2;
  }),
  generateImage: Trpc.procedure.input(
    z.object({
      prompt: z.string(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const aiService = AiServiceFactory.create(input.provider);
    const url = await aiService.generateImage(input.prompt);
    return { url };
  }),
  audioToText: Trpc.procedure.input(
    z.object({
      url: z.string(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const aiService = AiServiceFactory.create(input.provider);
    const arrayBuffer = await axios.get(input.url, { responseType: "arraybuffer" }).then((response) => response.data);
    const readstream = await FileHelper.createReadStreamFromArrayBuffer(
      arrayBuffer,
      "audio.wav"
    );
    const translation = await aiService.fromAudioToText(readstream);
    return { translation };
  }),
  textToAudio: Trpc.procedure.input(
    z.object({
      text: z.string(),
      provider: z.enum(["openai", "gemini"]).default("openai")
    })
  ).mutation(async ({ input }) => {
    const aiService = AiServiceFactory.create(input.provider);
    const buffer = await aiService.fromTextToAudio(input.text);
    const now = DateHelper.getNow();
    const name = `${now.getTime()}__text-to-audio.mp3`;
    const file = {
      name,
      mimetype: "audio/mp3",
      buffer
    };
    const urls = await UploadServer.service.uploadPublic(file);
    const url = urls[0].url;
    return { url };
  })
});
class Service4 {
  constructor() {
    __publicField(this, "openai", new OpenaiProvider());
  }
  async generateText(options) {
    return this.openai.generateText(options);
  }
  async generateJson(instruction, content, schema, attachmentUrls) {
    return this.openai.generateJson(
      instruction,
      content,
      schema,
      attachmentUrls
    );
  }
  async generateImage(prompt) {
    return this.openai.generateImage(prompt);
  }
  async fromAudioToText(readStream) {
    return this.openai.fromAudioToText(readStream);
  }
  async fromTextToAudio(text) {
    return this.openai.fromTextToAudio(text);
  }
  isActive() {
    return this.openai.isActive();
  }
}
const AiService = new Service4();
var AiServer;
((AiServer2) => {
  AiServer2.service = AiService;
  AiServer2.trpcRouter = AiRouter;
})(AiServer || (AiServer = {}));
const appRouter = Trpc.mergeRouters(
  createRouter(Trpc.createRouter, Trpc.procedurePublic),
  // the custom router, add your own routers here
  Trpc.createRouter({
    authentication: AuthenticationServer.trpcRouter,
    configuration: ConfigurationServer.trpcRouter,
    upload: UploadServer.trpcRouter,
    ai: AiServer.trpcRouter,
    email: EmailServer.trpcRouter
  })
);
const handleRequest = async ({
  request
}) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: (options) => Trpc.createContext(options)
  });
};
const loader = handleRequest;
const action = handleRequest;
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function LoggedLayout() {
  const { isLoggedIn, isLoading } = useUserContext();
  const router = useNavigate();
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router("/login");
    }
  }, [isLoading, isLoggedIn]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(MrbSplashScreen, {});
  }
  if (isLoggedIn) {
    return /* @__PURE__ */ jsx(NavigationLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
  }
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoggedLayout
}, Symbol.toStringTag, { value: "Module" }));
function NotFound() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(PageLayout, { isCentered: true, children: /* @__PURE__ */ jsx(
    Result,
    {
      status: "404",
      title: "404",
      subTitle: "Sorry, the page you visited does not exist.",
      extra: /* @__PURE__ */ jsx(Button, { type: "primary", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Back Home" }) })
    }
  ) }) });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
function LandingPage() {
  const features = [
    {
      heading: `End-to-End Manufacturing`,
      description: `From PCB assembly to final product testing, get complete control over your electronics manufacturing process with real-time updates and quality assurance at every step.`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-microchip" })
    },
    {
      heading: `Rapid Prototyping`,
      description: `Transform your designs into functional prototypes in record time with our advanced manufacturing capabilities and experienced engineering team.`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-bolt" })
    },
    {
      heading: `Quality Control`,
      description: `Industry-leading quality management system with rigorous testing protocols ensures your products meet the highest standards every time.`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-check-circle" })
    },
    {
      heading: `Supply Chain Management`,
      description: `Optimize your component sourcing with our global network of verified suppliers and real-time inventory management system.`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-link" })
    },
    {
      heading: `Technical Support`,
      description: `Get expert guidance from our engineering team throughout your manufacturing journey, from design review to production optimization.`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-tools" })
    },
    {
      heading: `Digital Documentation`,
      description: `Access all your manufacturing documentation, compliance certificates, and quality reports in one secure digital platform.`,
      icon: /* @__PURE__ */ jsx("i", { className: "las la-file-alt" })
    }
  ];
  const testimonials = [
    {
      name: `David Chen`,
      designation: `CTO, IoT Solutions Inc`,
      content: `Their manufacturing expertise and digital platform transformed our production process. We reduced time-to-market by 40% while maintaining superior quality.`,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      name: `Sarah Williams`,
      designation: `Procurement Manager, Smart Devices Ltd`,
      content: `The transparency and control we get through their platform is game-changing. Real-time updates and quality tracking give us complete peace of mind.`,
      avatar: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      name: `Michael Rodriguez`,
      designation: `Operations Director, Tech Innovations`,
      content: `We've scaled our production by 300% since partnering with them. Their digital platform and manufacturing expertise made it seamless.`,
      avatar: "https://randomuser.me/api/portraits/men/7.jpg"
    }
  ];
  const navItems = [
    {
      title: `Features`,
      link: `#features`
    },
    {
      title: `Pricing`,
      link: `#pricing`
    },
    {
      title: `FAQ`,
      link: `#faq`
    }
  ];
  const packages = [
    {
      title: `Startup`,
      description: `Perfect for early-stage hardware companies`,
      monthly: 2999,
      yearly: 32989,
      features: [
        `Up to 1000 units/month`,
        `Basic quality control`,
        `Email support`
      ]
    },
    {
      title: `Scale-up`,
      description: `For growing hardware businesses`,
      monthly: 4999,
      yearly: 54989,
      features: [
        `Up to 10,000 units/month`,
        `Advanced quality control`,
        `Priority support`
      ],
      highlight: true
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large-scale production`,
      monthly: 9999,
      yearly: 109989,
      features: [
        `Unlimited production capacity`,
        `Custom quality protocols`,
        `24/7 dedicated support`
      ]
    }
  ];
  const questionAnswers = [
    {
      question: `What types of electronics can you manufacture?`,
      answer: `We specialize in PCB assembly, IoT devices, consumer electronics, and industrial control systems. Our facilities are equipped to handle both simple and complex electronic assemblies.`
    },
    {
      question: `How do you ensure quality control?`,
      answer: `We implement a rigorous quality management system that includes automated optical inspection (AOI), functional testing, and compliance with international standards like ISO 9001.`
    },
    {
      question: `What is your minimum order quantity?`,
      answer: `Our minimum order quantity starts at 100 units for most products. However, we offer flexible solutions for prototyping and small batch production.`
    },
    {
      question: `How long does the manufacturing process take?`,
      answer: `Typical lead times range from 2-4 weeks depending on complexity and quantity. Rush orders can be accommodated for an additional fee.`
    }
  ];
  const steps = [
    {
      heading: `Submit Your Design`,
      description: `Upload your design files and specifications through our secure digital platform.`
    },
    {
      heading: `Design Review`,
      description: `Our engineering team reviews your design for manufacturability and provides optimization suggestions.`
    },
    {
      heading: `Production Setup`,
      description: `We prepare the production line and source components according to your specifications.`
    },
    {
      heading: `Quality Assured Manufacturing`,
      description: `Your products are manufactured with real-time quality monitoring and regular updates.`
    }
  ];
  const painPoints = [
    {
      emoji: `😓`,
      title: `Struggling with quality inconsistencies and production delays`
    },
    {
      emoji: `😟`,
      title: `Losing visibility and control over manufacturing process`
    },
    {
      emoji: `😤`,
      title: `Dealing with communication gaps and coordination challenges`
    }
  ];
  return /* @__PURE__ */ jsxs(LandingContainer, { navItems, children: [
    /* @__PURE__ */ jsx(
      LandingHero,
      {
        title: `Transform Your Electronics Manufacturing with Digital Excellence`,
        subtitle: `Join industry leaders who've achieved 40% faster time-to-market and 99.9% quality consistency with our digital manufacturing platform`,
        buttonText: `Start Manufacturing`,
        pictureUrl: `https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/r9slb6-kuvamtemplate1-HGlc`,
        socialProof: /* @__PURE__ */ jsx(
          LandingSocialRating,
          {
            numberOfUsers: 500,
            suffixText: `successful manufacturing projects delivered`
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(LandingSocialProof, { title: `Trusted By Industry Leaders` }),
    /* @__PURE__ */ jsx(
      LandingPainPoints,
      {
        title: `73% of electronics manufacturers struggle with quality control and production visibility`,
        painPoints
      }
    ),
    /* @__PURE__ */ jsx(
      LandingHowItWorks,
      {
        title: `Your Journey to Manufacturing Excellence`,
        steps
      }
    ),
    /* @__PURE__ */ jsx(
      LandingFeatures,
      {
        id: "features",
        title: `Everything You Need for World-Class Electronics Manufacturing`,
        subtitle: `Streamline your production process with our comprehensive manufacturing platform`,
        features
      }
    ),
    /* @__PURE__ */ jsx(
      LandingTestimonials,
      {
        title: `Success Stories from Industry Leaders`,
        subtitle: `Join hundreds of innovative companies who've transformed their manufacturing process`,
        testimonials
      }
    ),
    /* @__PURE__ */ jsx(
      LandingPricing,
      {
        id: "pricing",
        title: `Scale Your Manufacturing with Confidence`,
        subtitle: `Choose the perfect plan for your production needs`,
        packages
      }
    ),
    /* @__PURE__ */ jsx(
      LandingFAQ,
      {
        id: "faq",
        title: `Common Questions About Our Manufacturing Services`,
        subtitle: `Everything you need to know about working with us`,
        questionAnswers
      }
    ),
    /* @__PURE__ */ jsx(
      LandingCTA,
      {
        title: `Ready to Transform Your Manufacturing?`,
        subtitle: `Join 500+ companies already achieving manufacturing excellence`,
        buttonText: `Start Manufacturing Now`,
        buttonLink: `/register`
      }
    )
  ] });
}
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LandingPage
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CGOYj1zR.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-BPgtOJpV.js", "/assets/index-D27-zpoI.js", "/assets/components-CU3aaf31.js"], "css": ["/assets/entry-CVFQBq_u.css"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-C9Mb-5Jf.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-BPgtOJpV.js", "/assets/index-D27-zpoI.js", "/assets/components-CU3aaf31.js", "/assets/root-BWb1Lzh-.js", "/assets/useUserContext-CftYQF-E.js", "/assets/index-D1nLi7B9.js", "/assets/index-Ch39FAg7.js", "/assets/provider-D-iywQx-.js", "/assets/index-XJOg0AuD.js", "/assets/button-LZ1wP-R8.js", "/assets/index-D8jvKhh2.js", "/assets/index-Dh_9xLWU.js", "/assets/index-BqCDaMrI.js", "/assets/InfoCircleFilled-1rpgKD39.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/CloseOutlined-OJiPlgzE.js"], "css": ["/assets/entry-CVFQBq_u.css"] }, "routes/_auth.reset-password.$token_": { "id": "routes/_auth.reset-password.$token_", "parentId": "root", "path": "reset-password/:token", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route--Wk_BA7d.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-D1nLi7B9.js", "/assets/index-BPgtOJpV.js", "/assets/index-C6iAlcE4.js", "/assets/index-Ch39FAg7.js", "/assets/index-COcNz6bj.js", "/assets/index-BvU7tRN0.js", "/assets/button-LZ1wP-R8.js", "/assets/index-BqCDaMrI.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/row--sIJDtdh.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/index-BQLhnx2g.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/InfoCircleFilled-1rpgKD39.js"], "css": [] }, "routes/_auth.reset-password_": { "id": "routes/_auth.reset-password_", "parentId": "root", "path": "reset-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CvOhPfnT.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-D1nLi7B9.js", "/assets/index-COcNz6bj.js", "/assets/index-BPgtOJpV.js", "/assets/index-C6iAlcE4.js", "/assets/index-Ch39FAg7.js", "/assets/index-BvU7tRN0.js", "/assets/button-LZ1wP-R8.js", "/assets/index-BqCDaMrI.js", "/assets/index-BQLhnx2g.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/row--sIJDtdh.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/InfoCircleFilled-1rpgKD39.js"], "css": [] }, "routes/api.upload.private": { "id": "routes/api.upload.private", "parentId": "root", "path": "api/upload/private", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.upload.private-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged.products_": { "id": "routes/_logged.products_", "parentId": "routes/_logged", "path": "products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-U5kpbUZw.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/useUserContext-CftYQF-E.js", "/assets/index-D1nLi7B9.js", "/assets/index-D3Cy0tzD.js", "/assets/index-Dh_9xLWU.js", "/assets/index-Ch39FAg7.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/EllipsisOutlined-DCEh8J-J.js", "/assets/index-Dy-gNqSH.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/index-C6iAlcE4.js", "/assets/row--sIJDtdh.js", "/assets/index-UZ-Xy0Ce.js", "/assets/button-LZ1wP-R8.js", "/assets/InfoCircleFilled-1rpgKD39.js", "/assets/useClosable-CylV9FcI.js", "/assets/collapse-BbEVqHco.js", "/assets/responsiveObserver-C9MLPLcO.js"], "css": [] }, "routes/_logged.services_": { "id": "routes/_logged.services_", "parentId": "routes/_logged", "path": "services", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DQMlu8YP.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-D1nLi7B9.js", "/assets/index-C6iAlcE4.js", "/assets/row--sIJDtdh.js", "/assets/index-UZ-Xy0Ce.js", "/assets/button-LZ1wP-R8.js", "/assets/index-Dy-gNqSH.js", "/assets/index-BqCDaMrI.js", "/assets/index-D3Cy0tzD.js", "/assets/index-Ch39FAg7.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/EllipsisOutlined-DCEh8J-J.js", "/assets/InfoCircleFilled-1rpgKD39.js", "/assets/useClosable-CylV9FcI.js", "/assets/index-Dh_9xLWU.js"], "css": [] }, "routes/api.upload.public": { "id": "routes/api.upload.public", "parentId": "root", "path": "api/upload/public", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.upload.public-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged.contact_": { "id": "routes/_logged.contact_", "parentId": "routes/_logged", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-xZAVjT3o.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/useUserContext-CftYQF-E.js", "/assets/index-D1nLi7B9.js", "/assets/index-C6iAlcE4.js", "/assets/row--sIJDtdh.js", "/assets/index-UZ-Xy0Ce.js", "/assets/button-LZ1wP-R8.js", "/assets/index-BqCDaMrI.js", "/assets/index-D3Cy0tzD.js", "/assets/index-Ch39FAg7.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/EllipsisOutlined-DCEh8J-J.js", "/assets/InfoCircleFilled-1rpgKD39.js", "/assets/index-Dh_9xLWU.js"], "css": [] }, "routes/_logged.profile_": { "id": "routes/_logged.profile_", "parentId": "routes/_logged", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-B6pi3Tqv.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/useUserContext-CftYQF-E.js", "/assets/index-BzoxnAcz.js", "/assets/index-D1nLi7B9.js", "/assets/index-C6iAlcE4.js", "/assets/index-Ch39FAg7.js", "/assets/button-LZ1wP-R8.js", "/assets/index-CsjVlZJs.js", "/assets/index-D3Cy0tzD.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/row--sIJDtdh.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/index-Dh_9xLWU.js"], "css": [] }, "routes/_auth.register_": { "id": "routes/_auth.register_", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BqpYGSkr.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-BzoxnAcz.js", "/assets/index-D1nLi7B9.js", "/assets/index-COcNz6bj.js", "/assets/index-BPgtOJpV.js", "/assets/index-D27-zpoI.js", "/assets/index-C6iAlcE4.js", "/assets/index-Ch39FAg7.js", "/assets/button-LZ1wP-R8.js", "/assets/index-BQLhnx2g.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/row--sIJDtdh.js", "/assets/responsiveObserver-C9MLPLcO.js"], "css": [] }, "routes/_logged.about_": { "id": "routes/_logged.about_", "parentId": "routes/_logged", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BLBzudJo.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-D1nLi7B9.js", "/assets/row--sIJDtdh.js", "/assets/index-UZ-Xy0Ce.js", "/assets/index-Ch39FAg7.js", "/assets/index-Dh_9xLWU.js", "/assets/index-D3Cy0tzD.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/EllipsisOutlined-DCEh8J-J.js"], "css": [] }, "routes/_logged.home_": { "id": "routes/_logged.home_", "parentId": "routes/_logged", "path": "home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-4yugp9k8.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-D1nLi7B9.js", "/assets/index-BPgtOJpV.js", "/assets/row--sIJDtdh.js", "/assets/index-UZ-Xy0Ce.js", "/assets/index-D8jvKhh2.js", "/assets/index-D3Cy0tzD.js", "/assets/index-Ch39FAg7.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/EllipsisOutlined-DCEh8J-J.js", "/assets/index-Dh_9xLWU.js"], "css": [] }, "routes/_auth.login_": { "id": "routes/_auth.login_", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-DHtS2PVB.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-D1nLi7B9.js", "/assets/index-COcNz6bj.js", "/assets/index-Ch39FAg7.js", "/assets/button-LZ1wP-R8.js", "/assets/index-BPgtOJpV.js", "/assets/index-D27-zpoI.js", "/assets/index-C6iAlcE4.js", "/assets/index-BQLhnx2g.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/collapse-BbEVqHco.js", "/assets/row--sIJDtdh.js", "/assets/responsiveObserver-C9MLPLcO.js"], "css": [] }, "routes/api.trpc.$": { "id": "routes/api.trpc.$", "parentId": "root", "path": "api/trpc/*", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.trpc._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_logged": { "id": "routes/_logged", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_logged-CZpde8bT.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/useUserContext-CftYQF-E.js", "/assets/provider-D-iywQx-.js", "/assets/index-Ch39FAg7.js", "/assets/EllipsisOutlined-DCEh8J-J.js", "/assets/index-D1nLi7B9.js", "/assets/collapse-BbEVqHco.js", "/assets/index-BzoxnAcz.js", "/assets/index-BQLhnx2g.js", "/assets/index-BPgtOJpV.js", "/assets/index-CsjVlZJs.js", "/assets/useClosable-CylV9FcI.js", "/assets/button-LZ1wP-R8.js", "/assets/MenuOutlined-C8hMCcGm.js", "/assets/index-XJOg0AuD.js", "/assets/index-D8jvKhh2.js", "/assets/index-Dh_9xLWU.js", "/assets/index-BqCDaMrI.js", "/assets/InfoCircleFilled-1rpgKD39.js", "/assets/pickAttrs-BwSQLAVK.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/responsiveObserver-C9MLPLcO.js"], "css": [] }, "routes/$404.$": { "id": "routes/$404.$", "parentId": "root", "path": ":404/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_404._-D9OS19Fw.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-XJOg0AuD.js", "/assets/button-LZ1wP-R8.js", "/assets/components-CU3aaf31.js", "/assets/index-D3Cy0tzD.js", "/assets/index-Ch39FAg7.js", "/assets/index-D27-zpoI.js", "/assets/index-BPgtOJpV.js", "/assets/row--sIJDtdh.js", "/assets/responsiveObserver-C9MLPLcO.js", "/assets/index-Dh_9xLWU.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C4DVusxU.js", "imports": ["/assets/index-DRMtkY8T.js", "/assets/index-BQLhnx2g.js", "/assets/components-CU3aaf31.js", "/assets/index-Ch39FAg7.js", "/assets/provider-D-iywQx-.js", "/assets/useUserContext-CftYQF-E.js", "/assets/index-BPgtOJpV.js", "/assets/MenuOutlined-C8hMCcGm.js", "/assets/CloseOutlined-OJiPlgzE.js", "/assets/button-LZ1wP-R8.js", "/assets/index-D1nLi7B9.js", "/assets/index-D27-zpoI.js", "/assets/index-XJOg0AuD.js", "/assets/index-D8jvKhh2.js", "/assets/index-Dh_9xLWU.js", "/assets/index-BqCDaMrI.js", "/assets/InfoCircleFilled-1rpgKD39.js", "/assets/pickAttrs-BwSQLAVK.js"], "css": [] } }, "url": "/assets/manifest-4ce7ea69.js", "version": "4ce7ea69" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": true };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_auth.reset-password.$token_": {
    id: "routes/_auth.reset-password.$token_",
    parentId: "root",
    path: "reset-password/:token",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_auth.reset-password_": {
    id: "routes/_auth.reset-password_",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/api.upload.private": {
    id: "routes/api.upload.private",
    parentId: "root",
    path: "api/upload/private",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_logged.products_": {
    id: "routes/_logged.products_",
    parentId: "routes/_logged",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_logged.services_": {
    id: "routes/_logged.services_",
    parentId: "routes/_logged",
    path: "services",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/api.upload.public": {
    id: "routes/api.upload.public",
    parentId: "root",
    path: "api/upload/public",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_logged.contact_": {
    id: "routes/_logged.contact_",
    parentId: "routes/_logged",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_logged.profile_": {
    id: "routes/_logged.profile_",
    parentId: "routes/_logged",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_auth.register_": {
    id: "routes/_auth.register_",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_logged.about_": {
    id: "routes/_logged.about_",
    parentId: "routes/_logged",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_logged.home_": {
    id: "routes/_logged.home_",
    parentId: "routes/_logged",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_auth.login_": {
    id: "routes/_auth.login_",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/api.trpc.$": {
    id: "routes/api.trpc.$",
    parentId: "root",
    path: "api/trpc/*",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_logged": {
    id: "routes/_logged",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/$404.$": {
    id: "routes/$404.$",
    parentId: "root",
    path: ":404/*",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route16
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
