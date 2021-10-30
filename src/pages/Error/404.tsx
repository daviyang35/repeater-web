import React, {FC} from "react";
import {Result} from "antd";

const Error404: FC = () => (
    <Result
        style={{marginTop: "10%"}}
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在！"
    />
);

export default Error404;
