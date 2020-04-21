const connectionSetting = {
    host : 'localhost',
    port:'3306',
    user : 'root',
    password : 'Zaky13152096!',
    database : 'rolling_glory'
}

const connectionPool = {
    min:5,
    max:100
}

module.exports={
    connectionSetting,
    connectionPool
}