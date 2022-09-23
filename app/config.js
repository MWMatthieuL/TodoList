const username = "borin";
const password = "manouche92";
const cluster = "cluster0.usabb";
const dbname = "todolist";

module.exports = {
    development: {
        express: {
            port: 3002
        },
        mongodb: {
            host: `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        }
    },
    production: {
        express: {
            port: 3000
        },
        mongodb: {
            host: `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        }
    }
}
