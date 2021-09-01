const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get()
        const profile = Profile.get()

        let statusCount = {
            total: jobs.length,
            progress: 0,
            done: 0,
        }

        let jobTotalHoursPerDay = 0
    
        const updatedJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            // status -> done || progress
            // Somando a quantidade de status
            statusCount[status] += 1

            // total de horas por dia de cada job em progresso
            jobTotalHoursPerDay = status == 'progress' ? jobTotalHoursPerDay + job['daily-hours'] : jobTotalHoursPerDay

            // if(status == 'progress') {
            //     jobTotalHoursPerDay += job['daily-hours']
            // }
    
            return {
                // "javascript, pega tudo que tem aqui dentro e espalhe num novo objeto"
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
        })

        // qtd de horas que quero trabalhar por dia (Profile)
        // MENOS 
        // qtd de horas de cada job com status 'progress'
        const freeHours = profile['hours-per-day'] - jobTotalHoursPerDay
    
        res.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}
