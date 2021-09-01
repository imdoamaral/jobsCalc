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

module.exports = {
    get() {
        return data
    },

    update(newjob) {
        data = newJob
    },

    delete(id) {
        // filter = devolve um novo array eliminando os elementos com retorno FALSE
        // "vai procurar algo pra tirar do array"
        data = data.filter(job => Number(job.id) !== Number(id))
    }
}