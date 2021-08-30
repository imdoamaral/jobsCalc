/*
    [atalho] recolher todos os blocos (todos mesmo): ctrl + k + 0
*/
const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

// object literals 'Profile'
const Profile = {
    data: {
        name: 'Israel',
        avatar: 'https://github.com/imdoamaral.png',
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + 'profile', { profile: Profile.data})
        },
        update(req, res) {
            // req.body para pegar os dados
            const data = req.body

            // definir quantas semanas tem num ano: 52
            const weeksPerYear = 52

            // remover as semanas de ferias do ano, para pegar quantas semanas tem em 1 mes
            const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

            // quantas horas por semana estou trabalhando
            const weekTotalHours = data['hours-per-day'] * data['days-per-week']

            // total de horas trabalhadas no mes
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            // qual sera o valor da minha hora?
            const valueHour = data['monthly-budget'] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                'value-hour': valueHour
            }

            return res.redirect('/profile')
        },
    }
}

// object literals 'Job'
const Job = {
    data: [
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
    ],

    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {
                // ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    // "javascript, pega tudo que tem aqui dentro e espalhe num novo objeto"
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
                }
            })
        
            res.render(views + 'index', { jobs: updatedJobs })
        },

        create(req, res) {
            return res.render(views + 'job')
        },

        save(req, res) {
                // req.body = { name: 'asd', 'daily-hours': '4', 'total-hours': '44' }
                const lastId = Job.data[Job.data.length - 1]?.id || 0
            
                Job.data.push({
                    id: lastId + 1,
                    name: req.body.name,
                    'daily-hours': req.body['daily-hours'],
                    'total-hours': req.body['total-hours'],
                    createdAt: Date.now() // atribuindo a data de hoje
                })
            
                return res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send('Job not found')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

            return res.render(views + 'job-edit', { job })
        },

        update(req, res) {
            const jobId = req.params.id

            // find = procura um valor e retorna VERDADEIRO se o valor for encontrado
            // senao retorna FALSO
            const job = Job.data.find( job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send('Job not found')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                'total-hours': req.body['total-hours'],
                'daily-hours': req.body['daily-hours']
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }
                return job
            })

            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id

            // filter = devolve um novo array eliminando os elementos com retorno FALSE
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        },
    },

    services: {
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
    },
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create) // criação do job
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes
