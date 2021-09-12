const Database = require('../db/config')

/*
let data = [
    {
        id: 1,
        name: "Pizaria Guloso",
        'daily-hours': 2,
        'total-hours': 1,
        createdAt: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
        'daily-hours': 3,
        'total-hours': 47,
        createdAt: Date.now(),
    },
]
*/

module.exports = {
    async get() {
        const db = await Database()

        // db.run() NÃO funciona com SELECT
        // db.get() traz apenas UM elemento
        // logo, utiliza-se db.all()
        const jobs = await db.all(`SELECT * from jobs`)

        db.close()

        // map = retorna um novo array de objetos
        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            'daily-hours': job.daily_hours,
            'total-hours': job.total_hours,
            createdAt: job.created_at
        }))
    },

    async update(updatedJob, jobId) {
        // data = newJob

        const db = await Database()

        await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob['daily-hours']},
            total_hours = ${updatedJob['total-hours']}

            WHERE id = ${jobId}
        `)

        await db.close()
    },

    async delete(id) {
        // filter = devolve um novo array eliminando os elementos com retorno FALSE
        // "vai procurar algo pra tirar do array"
        // data = data.filter(job => Number(job.id) !== Number(id))

        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },

    async create(newJob) {
        // data.push(newJob)
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob["createdAt"]}
        )`)

        await db.close()
    }
}