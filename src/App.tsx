import "./App.css";
import * as React from "react";
import {Route, Switch} from "react-router-dom";
import PageLoading from "./components/base/page-loading";

import {ConfigProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

const Layouts = React.lazy(() => import("@/layouts"));
const Login = React.lazy(() => import("@/pages/Login"));

const App: React.FC = () => {
    window.addEventListener("error", function (e) {
        console.log("ooops inf loop", e);
        if (e.message === "ResizeObserver loop limit exceeded") {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    });

    return (
        <ConfigProvider locale={zh_CN}>
            <React.Suspense fallback={<PageLoading/>}>
                <Switch>
                    <Route key="login" path="/login" component={Login}/>
                    <Route key="/" path="/" component={Layouts}/>
                </Switch>
            </React.Suspense>
        </ConfigProvider>
    );
};

export default App;
