"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const basic_auth_middleware_1 = require("./middlewares/basicAuth/basic-auth.middleware");
const benchmarks_middleware_1 = require("./middlewares/benchmarks/benchmarks.middleware");
const ip_filter_middleware_1 = require("./middlewares/ipFilter/ip-filter.middleware");
const white_list_middleware_1 = require("./middlewares/whiteList/white-list.middleware");
const router_1 = require("./routes/router");
/**
 * express設定
 */
const app = express();
app.use(ip_filter_middleware_1.default); // IP制限
app.use(basic_auth_middleware_1.default); // ベーシック認証
app.use(helmet()); // セキュリティー対策
app.use(white_list_middleware_1.default); // 許可設定
app.use(benchmarks_middleware_1.default); // ベンチマーク的な
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', `${__dirname}/views`); // view設定
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/../public`)); // server
app.use(express.static(`${__dirname}/../../client/${process.env.NODE_ENV}`)); // client
router_1.default(app);
module.exports = app;
//# sourceMappingURL=app.js.map