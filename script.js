const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector ('.app__image')
const botaoImagem = document.querySelector('.app__card-primary-butto-icon')
const imagemPausar = ('/imagens/pause.png')
const imagemComecar = ('/imagens/play_arrow.png')
const titulo = document.querySelector ('.app__title')
const botoes = document.querySelectorAll ('.app__card-button')
const startPauseBt = document.querySelector ('#start-pause')
const musicaFocoInput = document.querySelector ('#alternar-musica')
const iniciarOuPausarBt = document.querySelector ('#start-pause span')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const AudioPlay = new Audio('/sons/play.wav')
const AudioPause = new Audio('/sons/pause.mp3')
const AudioTempoFinalizado = new Audio('/sons/beep.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 5
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})



focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            
            break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada?
                <strong class="app__title-strong"> Faça uma pausa curta!</strong>
                `
            break;
            case 'descanso-longo':
                titulo.innerHTML = `
                Hora de voltar à superfície.
                <strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `    
                break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //AudioTempoFinalizado.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar, AudioPlay.play)

function iniciarOuPausar () {
    if(intervaloId){
        AudioPause.play();
        zerar()
        return
    }
    AudioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    botaoImagem.setAttribute('src', imagemPausar)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    botaoImagem.setAttribute('src', imagemComecar)
    intervaloId = null
}