const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {

    create(req, res) {
        return res.render('job')
    },

    async save(req, res) {
        // const jobs = await Job.get()
        // const lastId = jobs[jobs.length - 1]?.id || 0

        await Job.create({
            // id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            createdAt: Date.now() // atribuindo a data de hoje
        })
    
        return res.redirect('/')
    },

    async show(req, res) {
        const jobId = req.params.id
        const jobs = await Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send('Job not found')
        }

        const profile = await Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render('job-edit', { job })
    },

    async update(req, res) {
        const jobId = req.params.id

        /*
        const jobs = await Job.get()

        // find = procura um valor e retorna VERDADEIRO se o valor for encontrado
        // senao retorna FALSO
        const job = jobs.find( job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send('Job not found')
        }
        */

        const updatedJob = {
        //    ...job,
           name: req.body.name,
           'total-hours': req.body['total-hours'],
           'daily-hours': req.body['daily-hours']
        }
        
        /*
        const newJob = jobs.map(job => {
            if(Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            return job
        })
        */

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    async delete(req, res) {
        const jobId = req.params.id

        // filter = devolve um novo array eliminando os elementos com retorno FALSE
        // Job.data = Job.get().filter(job => Number(job.id) !== Number(jobId))

        await Job.delete(jobId)

        return res.redirect('/')
    },
}