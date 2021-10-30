import React from "react";
import {Spin} from "antd";

const loadingWrap: React.CSSProperties = {
    paddingTop: "100px",
    textAlign: "center",
};

const PageLoading: React.FC = () => {
    return (
        <div style={loadingWrap}>
            <Spin size="large"/>
        </div>
    );
};
export default PageLoading;
