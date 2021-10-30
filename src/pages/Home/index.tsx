import React, {FC, useEffect} from "react";

import {Card, Col, Row, Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";


// import services from "@/services/Account";

const {Countdown} = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const Home: FC = () => {


    useEffect(() => {
        // const res = services.getMenu('1');

        // services.addUser({
        //     officerNumber: '003',
        //     name: '003',
        //     mobile: '003',
        //     username: '003',
        //     password: '003',
        //     deptId: '003',
        //     deptScope: ['02'],
        //     roleScope: ['02']
        // });
        // console.log(res);
    }, []);
    return (
        <div className="home" style={{padding: 20}}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<ArrowUpOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{color: "#cf1322"}}
                            prefix={<ArrowDownOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24} style={{marginTop: 20}}>
                    <Card>
                        <Countdown
                            title="Day Level"
                            value={deadline}
                            format="D 天 H 时 m 分 s 秒"
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12} style={{marginTop: 20}}>
                </Col>
                <Col span={12} style={{marginTop: 20}}>
                    <Card>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
