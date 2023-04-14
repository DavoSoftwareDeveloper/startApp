import { v4 as uuidv4 } from 'uuid';

export const openMenu = (state, ref) => {
    setstate(toggle => !toggle)
    state ? ref.current.className = "menu2" : ref.current.className = "menu"
  }

  export const set = { 
    id: uuidv4(),
    views:[
        {
            id: uuidv4(),
            backgroundUrl: "https://img.freepik.com/foto-gratis/piedras-zen-apiladas-fondo-arena-arte-concepto-equilibrio_53876-110629.jpg?w=2000&t=st=1681492270~exp=1681492870~hmac=e8d33f5a3bf9956b1f31feee587cea5d9ffe9c65b36fd48f3a9b3eab69d8bf4b",
            blocks: [
                {
                    id: uuidv4(),
                    modify: false,
                    content:{
                        title:"Bienvenido" ,
                        text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario"
                    }
                },
            ] 
        },
    ]
}
export const viewPage = {
    id: uuidv4(),
    backgroundUrl: "https://img.freepik.com/foto-gratis/piedras-zen-apiladas-fondo-arena-arte-concepto-equilibrio_53876-110629.jpg?w=2000&t=st=1681492270~exp=1681492870~hmac=e8d33f5a3bf9956b1f31feee587cea5d9ffe9c65b36fd48f3a9b3eab69d8bf4b",
    blocks: [
        {
            id: uuidv4(),
            modify: false,
            content:{
                title:"Bienvenido" ,
                text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario"
            }
        },
    ]
}
export const block = {
    id: uuidv4(),
    modify: false,
    content:{
        title:"Bienvenido" ,
        text: "Empieza rellenando uno de los bloques con una frase motivadora corta y una pequeña explicación si es necesario"
    }

}