module.exports = {
    remainingDays(job) {
        // subtrair da data futura,
        // o numero de dias restantes baseado na data de hoje
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
    
        const createdDate = new Date(job.createdAt)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)
    
        // data de vencimento menos a data atual, em milissegundos
        const timeDiffInMs = dueDateInMs - Date.now()
    
        // transformar milissegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
    
        // diferença em dias, arredondado pra baixo
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
        // restam x dias
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job['total-hours'],
}