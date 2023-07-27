import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser'

export function setEnvironment(app) {
    if(process.env.NODE_ENV !== 'production') {
        setDevEnv(app)
    } else {
        setProdEnv(app)
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    process.env.MONGO_URI = 'mongodb://localhost:27017/vue-db'
    process.env.TOKEN_SECRET = 'v7148fb9y5H5kv7-2Sce1fuEF8KdwSf8lzYdFPaHZFsag9pFifVk3d9VYlZqlu4XLyDiTEHMk7TyUIOHOJ5Xqc6w_ZUh5iwHuSJRaf_Qs0k6bHzrctR0sncc5GH_Ry9eencz0c9uoEA9Z7lit66Mae6O6ziXZJIbjgzi8vyalfF4QGesBz2E_a2rVwe5zl2XUeTue3fchqJkq8OsxMTUmUhGrgJsMzrUai3xJT8Xopji0RhK98hK4hzJR7lzWan1zWKlUjDG3xJUeyYxHoQFTE6aXAzQKd3XaVlul7uAHPalnNlFQ6QD2CGYZtUlXP1lSh_PNbn2_xi7MM4rdvOB3A'
    app.use(bodyParser.json()) 
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    process.env.MONGO_URI = 'mongodb+srv://admin:CQZgTdqK9R1eVlqw@cluster0.z4wn07j.mongodb.net/?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET = 'v7148fb9y5H5kv7-2Sce1fuEF8KdwSf8lzYdFPaHZFsag9pFifVk3d9VYlZqlu4XLyDiTEHMk7TyUIOHOJ5Xqc6w_ZUh5iwHuSJRaf_Qs0k6bHzrctR0sncc5GH_Ry9eencz0c9uoEA9Z7lit66Mae6O6ziXZJIbjgzi8vyalfF4QGesBz2E_a2rVwe5zl2XUeTue3fchqJkq8OsxMTUmUhGrgJsMzrUai3xJT8Xopji0RhK98hK4hzJR7lzWan1zWKlUjDG3xJUeyYxHoQFTE6aXAzQKd3XaVlul7uAHPalnNlFQ6QD2CGYZtUlXP1lSh_PNbn2_xi7MM4rdvOB3A'
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/../../dist'))
}