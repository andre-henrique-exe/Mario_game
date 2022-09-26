kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,0]
})

let isJumping = true
let isBig = false

////////////////////////Chamada de imagem online////////////////////////////////

loadRoot("https://i.imgur.com/")

loadSprite('bloco','M6rwarW.png')
loadSprite('goomba','KPO3fR9.png')
loadSprite('surpresa','gesQ1KP.png')
loadSprite('unboxed','bdrLpi6.png')
loadSprite('moeda','wbKxhcd.png')
loadSprite('cogumelo','0wMd92p.png')
loadSprite('nuvem', 'kv7jDG5.png')
loadSprite('bloco-invisivel', '4r7H2xm.png')

//OzrEnBy.png
loadSprite('mario', 'yraS48q.jpg',{
    sliceX: 3.9,
    anims: {
        idle: {
            from: 0,
            to: 0,
        },
        move: {
            from: 1,
            to: 2,
        }
    }
})

loadSprite('tijolo', 'pogC9x5.png')//tijolo
loadSprite('tubo-top-left', 'ReTPiWY.png')//tubo esquerdo
loadSprite('tubo-top-right', 'hj2GK4n.png')//tubo direito
loadSprite('tubo-bottom-left', 'c1cYSbt.png')//tubo parte de baixo esquerda
loadSprite('tubo-bottom-right', 'nqQ79eI.png')//tubo parte de baixo direita

loadSprite('blue-bloco', 'fVscIbn.png')//bloco azul
loadSprite('blue-tijolo', '3e5YRQd.png')//tijolo azul
loadSprite('blue-aco', 'gqVoI2b.png')//aço azul
loadSprite('blue-goomba', 'SvV4ueD.png')//goomba azul
loadSprite('fire', 'csvEVOD.png')
loadSprite('flower','uaUm9sN.png')
loadSprite('bush','xkvBdrS.png')
loadSprite('bush2','ayAzBjZ.png')
loadSprite('little_bush','JxtnIPe.png')
loadSprite('little_bush2','vmWmPSR.png')
//J
loadSprite('right-grass', 'awKf4pD.png')
loadSprite('left-grass', 'YaYfC2u.png')
loadSprite('small-ground', 'ugxAWoY.png')
loadSprite('middle-ground', 'NB2GrJh.png')
loadSprite('big-ground', '6VAWm7T.png')
loadSprite('small-large-ground', 'pdjRHsc.png')
loadSprite('big-large-ground', 'BIXTQGl.png')
loadSprite('small-grass', 'CsMnRZ4.png')
loadSprite('medium-grass', 'phnK3TR.pngO')
loadSprite('large-grass', '6aDfggh.png')
loadSprite('big-grass', 'G1FHs2x.png')

/////////////////////////////////////////////////////////////////////////




////////////////////////////criação de cenário e objetos/////////////////////////////////

scene("game", ({ level, score, big, sec,}) => {
    layer(["bg", "obj", "ui"], "obj")

    const maps = [
        [
            '1   m                                 1',
            '1                                     1',
            '1                              n      1',
            '1                                     1',
            '1                                     1',
            '1                                     1',
            '1                                     1',
            '1                                     1',
            '1                                     1',
            '1                                     1',
            '1 q                {{{{{              1',
            '1                                     1',
            '1                                     1',
            '1          %{%{*                      1',
            '1                     e               1',
            '1                                   -+1',
            '1   t            ^  t ^  ^   t t    ()1',
            '=======================================',
            '=======================================',
        ],
        [
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                       x  x         //',
            '/                    x  x  x  x    -+//',
            '/             ^ ^  ^ x  x  x  x    ()//',
            '///////////////////////////////////////',
            '///////////////////////////////////////',
        ],
        [
            '/                                    //',
            '/                                    //',
            '/                                    //',
            '/                                  -+//',
            '/                                  ()//',
            '/     ///%%/////%%////////%%///////()//',
            '/                                  ()//',
            '/                                  ()//',
            '////%%///////%%/////////%%/////    ()//',
            '/                                  ()//',
            '/                                  ()//',
            '/   /////%%/////////%%//////%%/////()//',
            '/                                  ()//',
            '/           ^    ^                 ()//',
            '/////%%///////%%//////%%////////   ()//',
            '/                                  ()//',
            '/             ^   ^     ^   ^      ()//',
            '///////////////////////////////////////',
            '///////////////////////////////////////',
        ],
        [
            '=      m                             =',
            '=                                    =',
            '=                                    =',
            '=                                m   =',
            '=                                    =',
            '=                                    =',
            '=                                    =',
            '=                                    =',
            '=                                    =',
            '=                                    =',
            '=                                    =',
            '=                                    =',
            '=          {{{{{{{{                  =',
            '=                                    =',
            '=   %%%%%            %%%%%           =',
            '=                                  -+=',
            '=                                  ()=',
            '======================================',
        ],
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        'q': [sprite('bush'),scale(4)],
        'w': [sprite('bush2'),scale(3)],
        'e': [sprite('little_bush'),scale(4)],
        'r': [sprite('little_bush2'),scale(4)],
        't': [sprite('flower'),scale(1)],
        '=': [sprite('bloco'), solid(),'wall'],
        '$': [sprite('moeda'), 'moeda'],
        '%': [sprite('surpresa'), solid(), 'moeda-surpresa','wall'],
        '*': [sprite('surpresa'), solid(), 'cogumelo-surpresa','wall'],
        '{': [sprite('unboxed'), solid(),'wall'],
        '^': [sprite('goomba'), 'dangerous',{ dir: -1, timer:0 },'goomba',body(),pos(),solid()],
        '#': [sprite('cogumelo'), 'cogumelo',body()],

        '~': [sprite('tijolo'), solid(),'wall'],
        '(': [sprite('tubo-bottom-left'), solid(), scale(0.5),'wall'],
        ')': [sprite('tubo-bottom-right'), solid(), scale(0.5),'wall'],
        '-': [sprite('tubo-top-left'), solid(), 'tubo', scale(0.5),'wall'],
        '+': [sprite('tubo-top-right'), solid(), 'tubo', scale(0.5),'wall'],
        '!': [sprite('blue-bloco'), solid(), scale(0.5),'wall'],
        '/': [sprite('blue-tijolo'), solid(), scale(0.5),'wall'],
        'z': [sprite('blue-goomba'), body(), scale(0.5)],
        'x': [sprite('blue-aco'), solid(), scale(0.5),'wall'],
        'm': [sprite('nuvem'), 'flyc',{ dir: -1, timer:0 }, scale(0.5)],
        'n': [sprite('nuvem'), 'flyc', scale(0.5)],
        '1': [sprite('bloco-invisivel'),solid(),'wall'],//Bloco invisível
        '2': [sprite('right-grass'),solid(),'wall'],
        '3': [sprite('left-grass'),solid(),'wall'],
        '4': [sprite('small-ground'),solid(),'wall'],
        '5': [sprite('middle-ground'),solid(),'wall'],
        '6': [sprite('big-ground'),solid(),'wall'],
        '7': [sprite('small-large-ground'),solid(),'wall'],
        '8': [sprite('big-large-ground'),solid(),'wall'],
        '9': [sprite('small-grass'),solid(),'wall'],
        '0': [sprite('medium-grass'),solid(),'wall'],
        ':': [sprite('large-grass'),solid(),'wall'],
        '!': [sprite('big-grass'),solid(),'wall'],
    }

    ///////////////////////////////////////////////////////////////////////


    ///////////////////////////personagens e elemntos/////////////////////////////

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text('Moedas:' + score, 10),
        pos(12,5),
        layer('ui'),
        {
            value: score
        }
    ])

    const timing = add([
        text('Timer: ' + sec, 10),
        pos(12,35),
        layer('ui'),
        {
            value: sec
        }
    ])

    //Inf player.pos
    
    /*
    const eix = add([
        text('X: ' + 0 + 'Y: ' + 0, 10),
        pos(12,50),
        layer('ui'),
        {
            value1: 0,
            value2: 0
        }
    ])
    */

    const levening = add([text('Level: ' +parseInt(level + 1), 10), pos(12,20)])

    const player = add([
        sprite('mario', {
            animsSpeed: 0.1,
            frame: 0
        }), 
        solid(),
        body(),
        big(),
        pos(20,350),
        origin('bot'),
        {
            speed: 120,
            guntime: 0,
            dir:1,
            dirnuvemx:1,
            dirnuvemy:1
        }
    ])


    //////////////////////////////////////////////////////////////

    function big(){
        return{
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                isBig = false
            },
            biggify(){
                this.scale = vec2(1.5)
                isBig = true
            }
        }
    }

    if(isBig){
        player.biggify
    }

    //////////////////////Control loop//////////////////////
    loop(1, () => {
        timing.value--
        timing.text = 'Timer: ' + timing.value
        timing.color = rgb(1, 0, 0)
        scoreLabel.color = rgb(0, 0, 1)
        levening.color = rgb(1, 1, 0)
        player.guntime--;
        if(timing.value<1){
            go("lose", ({score: scoreLabel.value}))
        }
    })

    loop(2, () => {
        player.dirnuvemy = -player.dirnuvemy;
    })

    loop(40, () => {
        player.dirnuvemx = -player.dirnuvemx;
    })

    //Inf player.pos
    
    /*
    loop(0.1, () => {
        eix.value1 = player.pos.x;
        eix.value2 = player.pos.y;
        eix.text = 'X: ' + eix.value1 + 'Y: ' + eix.value2;
        eix.color = rgb(0, 0, 1)
    })
    */

    ////////////////////////////////////////////////////////



    //////////////////////////Tecla/Movimento//////////////////////////////

    keyDown('left', () => {
        player.flipX(true)
        player.move(-120,0)
        player.dir = -1;
    })
    
    keyDown('right', () => {
        player.flipX(false)
        player.move(120,0)
        player.dir = 1;
    })

    keyPress('space', () => {
        if(player.grounded()){
            player.jump(390)
            isJumping = true
        }
    })

    //Animar o Mário
    keyPress('left', () => {
        player.flipX(true)
        player.play('move')
    })

    keyPress('right', () => {
        player.flipX(false)
        player.play('move')
    })

    // Gun //

    keyPress('e', () => {
        if (player.guntime <= 0) {

            const fire = add([
                sprite('fire'),
                pos(player.pos.x+12*player.dir,player.pos.y-10),
                scale(2),
                'fire1',
            ])

            action('fire1',(f) => {
                pos(fire.pos.x+12*player.dir,fire.pos.y-10)
                fire.move(300*player.dir,0)
                loop(1, ()=> {
                if (player.guntime<0){destroy(f)}
                })
            })

            player.guntime = 2.5;
        }
    })

    collides('fire1','wall', (f,g)=>{
        destroy(f)
    })

    collides('fire1','goomba', (f,g)=>{
        destroy(g)
        destroy(f)
    })

    // Animar Parado //
    keyRelease('left', () => {
        player.play('idle')
    })

    keyRelease('right', () => {
        player.play('idle')
    })
    ///////////////////////////////////////////////////////////////////


    /////////////////////////////action/////////////////////////////////////

    action('goomba',(g) => {

        //Perseguição aleatória

        //if (player.pos.y>260)
        //{
            if (player.pos.x-g.pos.x>0)
            {
                g.move(30+(player.pos.x-g.pos.x)/10,0);
            }
            else if (player.pos.x-g.pos.x<0) 
            {
                g.move(-30+(player.pos.x-g.pos.x)/10,0);
            }
            else
            {
                g.move(0,0);
            }
        /*}
        else if (player.pos.y<=260) 
        {
            g.move(30*g.dir,0);
            g.timer -= dt();
            if(g.timer<=0)
            {
                g.dir = -g.dir;
                g.timer = rand(5);
            }
        }
        else
        {
            g.move(0,0);
        }*/
    })

    //codigo reciclado
    //collides('goomba','bloco-invisivel',(g) => {
    //    g.dir = -g.dir
    //})

    action('flyc',(obj) => {
        obj.move(5*player.dirnuvemx,-5*player.dirnuvemy)
    })

    player.action(() => {
        if(player.grounded()){
            isJumping = false
        }
        //camPos(player.pos)
        //Ativação da camera
    })

    player.on('headbutt', (obj) => {
        if(obj.is('moeda-surpresa')){
            gameLevel.spawn('$', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('{', obj.gridPos.sub(0,0))
        }

        if(obj.is('cogumelo-surpresa')){
            gameLevel.spawn('#', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('{', obj.gridPos.sub(0,0))
        }
    })

    action('cogumelo', (obj) => {
        obj.move(40,0)
    })

    player.collides('cogumelo',(obj) => {
        destroy(obj)
        player.biggify()
    })


    player.collides('dangerous', (obj) => {
        if(isJumping)
        {
            destroy(obj)
        }
        else
        {
            if(isBig)
            {
                player.smallify()
            }
            else
            {
                go("lose", ({score: scoreLabel.value}))
            }
        }
    })

    player.collides('moeda', (obj) =>{
        destroy(obj)
        scoreLabel.value++
        scoreLabel.text = 'Moedas: ' +scoreLabel.value
    })

    player.collides('tubo', () => {
        keyPress('down', () => {
            if (level>-1 && level<1){
                go("game", {level: (level + 1) % maps.length,score: scoreLabel.value ,Big:isBig ,sec:30 })
                document.body.style.background = 'linear-gradient(#000000,#1D545F)';
            }
            if (level>0 && level<2){
                go("game", {level: (level + 1) % maps.length,score: scoreLabel.value ,Big:isBig ,sec:100 })
            }
            if (level>1 && level<3){
                go("game", {level: (level + 1) % maps.length,score: scoreLabel.value ,Big:isBig ,sec:30 })
            }
        })
    })
})

scene("lose", ({score}) => {
    add([ text('Voce Morreu', 18), origin('center'), pos(width()/2, height()/2)])
    add([ text('score: ' +score, 17), origin('center'), pos(width()/1.5, height()/1.5) ])
    document.body.style.background = 'Black';
    keyPress('space', () => {
        document.body.style.background = 'linear-gradient(#87CEEB, #E0F6FF)';
        go("game", { level:0, score:0, big:isBig , sec:30 })
    })
})

go("game", ({ level: 0, score: 0, big: isBig, sec:30 }))