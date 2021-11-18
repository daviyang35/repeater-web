import React, {useEffect, useState} from "react";
import styles from "./ReplayResult.module.less";
import {Descriptions, Divider, Radio} from "antd";
import service, {ReplayResultVO} from "./service";
import {useHistory} from "react-router-dom";

const ReplayResult: React.FC = () => {
    let history = useHistory();
    const search = new URLSearchParams(history.location.search);
    const repeatId = search.get("repeatId");
    const appName = search.get("appName");

    const [dataSource, setDataSource] = useState<ReplayResultVO>();

    useEffect(() => {
        const fetch = async () => {
            if (appName && repeatId) {
                const resp = await service.replayResult({appName: appName!, repeatId: repeatId!});
                setDataSource(resp.data);
            } else {
                console.log("因路由意外触发，跳过fetch");
            }
        };
        void fetch();
    }, [appName, repeatId]);


    return (
        <div className={styles.Panel}>
            <div>
                <p className={styles.CallPanel}>调用快照</p>
                <Radio.Group className={styles.ButtonGroupPanel} defaultValue="basic" buttonStyle="solid"
                             onChange={(e) => {
                             }}>
                    <Radio.Button checked value="basic">基础信息</Radio.Button>
                    <Radio.Button value="request">请求参数</Radio.Button>
                    <Radio.Button value="response">返回结果</Radio.Button>
                    <Radio.Button value="subInvocations">子调用详情</Radio.Button>
                </Radio.Group>
                <Descriptions size="small" bordered>
                    <Descriptions.Item label="应用名" span={1}>{dataSource?.appName}</Descriptions.Item>
                    <Descriptions.Item label="流量入口" span={1}>{dataSource?.ip}</Descriptions.Item>
                    <Descriptions.Item label="录制机器" span={1}>{dataSource?.ip}</Descriptions.Item>
                    <Descriptions.Item label="TraceId" span={1}>{dataSource?.traceId}</Descriptions.Item>
                    <Descriptions.Item label="录制时间" span={1}>{dataSource?.ip}</Descriptions.Item>
                    <Descriptions.Item label="录制环境" span={1}>{dataSource?.environment}</Descriptions.Item>
                </Descriptions>
                <Divider/>
            </div>

            <div>
                <p className={styles.ResultPanel}>回放结果</p>
                <Radio.Group className={styles.ButtonGroupPanel} defaultValue="basic" buttonStyle="solid"
                             onChange={(e) => {
                             }}>
                    <Radio.Button checked value="basic">基础信息</Radio.Button>
                    <Radio.Button value="expect">差异节点</Radio.Button>
                    <Radio.Button value="diff">结果Diff</Radio.Button>
                    <Radio.Button value="mock">MOCK</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
};

export default ReplayResult;
