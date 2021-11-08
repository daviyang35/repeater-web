const CONFIG_BASE = {
    htmlTitle: "Admin - {title}",
};

// 开发配置
const CONFIG_DEV = {
    domain: "http://localhost:8001/",
    needLogin: false,
};

// 测试配置
const CONFIG_TEST = {
    domain: "/",
    needLogin: true,
};

// 生产配置
const CONFIG_PRO = {
    domain: "/",
    needLogin: true,
};

const ENV_CONFIG_MAP = {
    development: CONFIG_DEV,
    test: CONFIG_TEST,
    production: CONFIG_PRO,
};

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

// eslint-disable-next-line
export default {...CONFIG_BASE, ...ENV_CONFIG_MAP[process.env.NODE_ENV!]};
