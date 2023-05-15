# Entidades para la base de datos

users {
    email,
    username,
    password,
    fullname
    rol (numerico),
    bd-date
}
game_types{
    code,
    name,
    description
}
results{
    game_id,
    players:[
        {
            id,
            score,
            posicion
            time (pendiente, puede ponerse el punteo en funcion del tiempo que se tardo en completar el juego)
        }
    ],
}

game {
    user,
    game_type,
    codigo,
    descripcion,
    name,
    time,
    model
}

quiz{

    data:[
        {
            question,
            respuestas: [
                {
                    descripcion,
                    is_correct
                }
            ],
        }
    ]
}

ahorcado: {

    data:[
        {
            pregunta,
            palabra
        }
    ]
}

memory{
    data:[
        {
            first,
            second
        }
    ]
}

letter_soup{
    data:[
        palabra
    ]
}