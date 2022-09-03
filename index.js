let sayı = 5
let super1_sayac = 0
let godlike = false
let superguc = 0
let ı = 0
let vurulandusman = 0;
const powerups = []
const canvas = document.getElementById("c")
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight
const projectiles = []
let a = true
const span = document.getElementById("skordegil")

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        this.opacity = 1
        const image = new Image()
        image.src = "./spaceship.png"
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 100
            }
        }
    }
    draw() {


        ctx.save();
        ctx.globalAlpha = this.opacity
        ctx.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )

        ctx.rotate(this.rotation)

        ctx.translate(
            -(player.position.x + player.width / 2),
            -(player.position.y + player.height / 2)
        )

        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        ctx.restore()



    }
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }




    }

}
class Invader {
    constructor({ position }) {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = "./invader.png"
        image.onload = () => {
            const scale = 0.9999999
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    update({ velocity }) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }

    }
    shoot(inv_projectiles, powerup) {
        this.powerup = powerup
        inv_projectiles.push
            (new Inv_projectile({
                position: {
                    x: this.position.x + this.width / 2
                    , y: this.position.y + this.height
                }
                ,
                velocity: {
                    x: 0
                    , y: 5
                }
            }))








    }

}
class Grid {
    constructor() {
        this.velocity = {
            x: 3,
            y: 0
        }
        this.position = {
            x: 0,
            y: 0
        }
        this.invaders = [

        ]
        // while (ı == 6) {
        //     ı++
        // }
        let satir = Math.floor(Math.random() * 5 + 1)
        let sutun = Math.floor(Math.random() * 10 + 10)
        this.width = sutun * 30
        for (let i = 0; i < sutun; i++) {
            for (let e = 0; e < satir; e++) {
                this.invaders.push(new Invader({
                    position: {
                        y: 30 * e,
                        x: 30 * i
                    }
                }))

            }



        }

    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0
        if (this.position.x >= canvas.width - this.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}
class Particle {
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position;
        this.velocity = velocity;
        this.fades = fades
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
    }

    draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.fades) this.opacity -= 0.025



    }
}








class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 3

    }
    draw() {
        if (godlike) {
            ctx.strokeStyle = "red"
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
        } else {
            ctx.strokeStyle = "white"
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }



    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


    }
}
class Powerup {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 8
    }
    draw() {

        ctx.strokeStyle = "red"
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();


    }
    update() {

        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }

}



class Inv_projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.width = 5
        this.height = 10
    }
    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)


    }
    update() {

        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
}


const particles = []

const player = new Player()
const grids = []
const keys = {
    a: { pressed: false },
    d: { pressed: false }
}
const inv_projectiles = []
let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);
const game = {
    over: false,
    active: true
}

function create_particles(object, color) {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color || '#BAA0DE',
            fades: true
        }))
    }

}

for (let i = 0; i < 150; i++) {
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: Math.random()
        },
        radius: Math.random() * 2,
        color: 'white',

    }))
}

function animate() {

    if (!game.active) {
        return;
    }
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    particles.forEach((particle, particleindex) => {
        if (particle.position.y - particle.radius > canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.radius = Math.random() * 2
            particle.position.y = -particle.radius


        }
        if (particle.opacity <= 0) {
            particles.splice(particleindex, 1)
        } else {

            particle.update()

        }

    });
    powerups.forEach((powerup, powerupIndex) => {
        powerup.update()
        if (powerup.position.y - powerup.radius <= player.position.y + player.height &&
            powerup.position.y + powerup.radius >= player.position.y &&
            powerup.position.x - powerup.radius <= player.position.x + player.width &&
            powerup.position.x + powerup.radius >= player.position.x
        ) {
            powerups.splice(powerupIndex, 1)
            godlike = true
            let time = setInterval(() => {
                super1_sayac++;
                console.log(super1_sayac + "  " + godlike)
                if (super1_sayac == 15) {
                    godlike = false

                    clearInterval(time);
                    super1_sayac = 0
                }
            }, 1000);

        }
    })


    projectiles.forEach((projectile, projectileIndex) => {
        if (projectile.position.y < 0 - projectile.radius) {
            projectiles.splice(projectileIndex, 1)
        } else {

            projectile.update()

        }

    });

    inv_projectiles.forEach((inv_projectile, inv_projectileIndex) => {

        if (inv_projectile.position.y >= canvas.height) {
            inv_projectiles.splice(inv_projectileIndex, 1)
        } else {

            inv_projectile.update()

        }


        if (inv_projectile.position.y + inv_projectile.height >= player.position.y &&
            inv_projectile.position.y < player.position.y + player.height &&
            inv_projectile.position.x >= player.position.x &&
            inv_projectile.position.x <= player.position.x + player.width && godlike == false) {

            setTimeout(() => {
                inv_projectiles.splice(inv_projectileIndex, 1)
                player.opacity = 0
                game.over = true
            }, 0);
            setTimeout(() => {
                game.active = false
            }, 2000);
            create_particles(player, "red")

        } else {

        }


    });

    grids.forEach((grid, Gi) => {
        grid.update()
        if (frames % 50 == 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(inv_projectiles)
        }
        grid.invaders.forEach((invader, Iindex) => {
            invader.update({ velocity: grid.velocity })
            projectiles.forEach((projectile, Pindex) => {



                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.y + projectile.radius >= invader.position.y &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.x + projectile.radius >= invader.position.x
                ) {
                    let superguc = Math.random() * 500 * 1;

                    if (superguc <= 2.5) {
                        powerups.push(new Powerup({
                            position: {
                                x: invader.position.x,
                                y: invader.position.y
                            },
                            velocity: {
                                y: 3,
                                x: 0



                            }



                        }))

                    }
                    vurulandusman++;
                    span.innerText = vurulandusman
                    setTimeout(() => {
                        const invaderFound = grid.invaders.find((invader2) => { return invader2 === invader })
                        const projectileFound = projectiles.find((projectile2) => { return projectile2 === projectile })
                        if (invaderFound && projectileFound) {
                            create_particles(invader);
                            projectiles.splice(Pindex, 1)
                            grid.invaders.splice(Iindex, 1)
                            if (grid.invaders.length > 0) {
                                const first_invader = grid.invaders[0]
                                const last_invader = grid.invaders[grid.invaders.length - 1]
                                grid.width = last_invader.position.x + last_invader.width - first_invader.position.x
                                grid.position.x = first_invader.position.x
                            } else { grids.splice(Gi, 1) }
                        }




                    }, 1);
                }
            })
        })



    })


    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -5
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
        player.velocity.x = +5
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
    requestAnimationFrame(animate)
    if (frames % randomInterval == 0) {
        grids.push(new Grid())
        frames = 0
        randomInterval = Math.floor(Math.random() * 500 + 500);
    }

    frames++
}

animate()
addEventListener("keydown", function ({ key }) {
    if (game.over) return
    switch (key) {

        case "a":
            keys.a.pressed = true
            break;

        case "A":
            keys.a.pressed = true
            break;


        case "d":
            keys.d.pressed = true
            break;
        case "D":
            keys.d.pressed = true
            break;

        case " ":


            // if (a) {
            projectiles.push(new Projectile({
                position:
                {
                    y: player.position.y,
                    x: player.position.x + player.width / 2


                },
                velocity:
                {
                    y: -10,
                    x: -0.0000009

                }
            }))

            //     a = false
            // }

            break;


        default:
            break;
    }
})
addEventListener("keyup", function ({ key }) {
    switch (key) {

        case "a":
            keys.a.pressed = false
            break;
        // case "A":
        //     keys.a.pressed = false
        //     break;

        case "d":
            keys.d.pressed = false
            break;
        // case "D ":
        //     keys.d.pressed = false
        //     break;
        case " ":
            break;


        default:
            break;
    }
})
















