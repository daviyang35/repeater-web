import React, {useEffect, useState} from "react";
import {Button, Descriptions, Divider, Radio} from "antd";
import styles from "./TrafficDetails.module.less";
import {useHistory} from "react-router-dom";
import {getTrafficDetails} from "@/pages/Traffic/TrafficDetails/service";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

type Details = {
    id?: number;
    gmtCreate?: string;
    gmtRecord?: string;
    appName?: string;
    environment?: string;
    host?: string;
    traceId?: string;
    entranceDesc?: string;
    request?: string;
    response?: string;
    subInvocations?: string;
}

const TrafficDetails = () => {
    let history = useHistory();
    const search = new URLSearchParams(history.location.search);
    const id = search.get("id");
    const appName = search.get("appName");

    const [record, setRecord] = useState<Details>({});
    const [codeBlock, setCodeBlock] = useState("");
    const [currentKey, setCurrentKey] = useState<string>("request");

    useEffect(() => {
        const fetch = async () => {
            if (id && appName) {
                const resp = await getTrafficDetails(id as string, appName as string);
                setRecord(resp.data);
            } else {
                console.log("因为路由处理Bug，fetch 被跳过");
            }
        };

        void fetch();
    }, [id, appName]);

    useEffect(() => {
        const map = new Map(Object.entries(record));
        const code = map.get(currentKey) as string || "";
        setCodeBlock(code);
    }, [record, currentKey]);

    const handleOptionsChanged = (value: string) => {
        setCurrentKey(value);
    };

    return (
        <div className={styles.DetailsPanel}>
            <Descriptions title="基础信息" size="middle" bordered extra={<Button type="primary" onClick={() => {
                history.push("/traffic");
            }}>返回列表</Button>}>
                <Descriptions.Item label="应用名" span={1}>{record.appName}</Descriptions.Item>
                <Descriptions.Item label="流量入口" span={1}>{record.entranceDesc}</Descriptions.Item>
                <Descriptions.Item label="录制机器" span={1}>{record.host}</Descriptions.Item>
                <Descriptions.Item label="TraceId" span={1}>{record.traceId}</Descriptions.Item>
                <Descriptions.Item label="录制时间" span={1}>{record.gmtRecord}</Descriptions.Item>
                <Descriptions.Item label="录制环境" span={1}>{record.environment}</Descriptions.Item>
            </Descriptions>
            <Divider/>
            <div>
                <p className={styles.DetailsTitle}>调用信息</p>
                <Radio.Group className={styles.ButtonGroupPanel} defaultValue="request" buttonStyle="solid"
                             onChange={(e) => {
                                 handleOptionsChanged(e.target.value);
                             }}>
                    <Radio.Button value="request">请求参数</Radio.Button>
                    <Radio.Button value="response">返回结果</Radio.Button>
                    <Radio.Button value="subInvocations">子调用详情</Radio.Button>
                </Radio.Group>
                <CodeBlock value={codeBlock} readOnly/>
            </div>
        </div>
    );
};

export default TrafficDetails;
