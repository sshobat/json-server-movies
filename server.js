const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");
const { body, validationResult, sanitizeBody } = require("express-validator");

server.use(middlewares);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post(
    "/movies",
    [body("title").isString().withMessage("Movie title must be string and it's required!"), body("rank").isInt().withMessage("Movie rank must be number and it's required!")],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    },
);

server.post(
    "/comments",
    [body("body").isString().withMessage("Comment body is required!"), body("movieId").isString().withMessage("movieId is required!"), body("userId").isString().withMessage("userId is required!")],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    },
);

server.use(router);

server.listen(4000, () => {
    console.log("JSON Server is running");
});
