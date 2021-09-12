const Database = require('./config')

// async = AVISA que uma estrutura possui 'await'
// await = ESPERA a funçao terminar de rodar antes de passar pra proxima linha

const initDb = {
    async init() {
        // abrindo a conexao
        // guarda o resultado da inicializaçao na variavel 'db'
        const db = await Database()

        // campo TIPO
        // PRIMARY KEY -> campo identificador da tabela, nao se repete
        // No Banco de Dados, os campos NÃO podem ter traços '-' nem espaços ' '

        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`)

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Israel",
            "https://github.com/imdoamaral.png",
            3000,
            4,
            4,
            5,
            70
        )`)

        await db.run(`INSERT INTO Jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1631019840689
        )`)

        await db.run(`INSERT INTO Jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projetc",
            3,
            47,
            1631019840689
        )`)

        await db.close()
    }
}

initDb.init()