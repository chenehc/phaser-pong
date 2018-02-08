import Phaser from 'phaser'

import config from '../config'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)
        game.physics.arcade.enable(this)
        this.body.collideWorldBounds = true
        this.body.bounce.setTo(1)
        this.body.velocity.setTo(0,0)
        config.gameStarted = false
    }

    launchBall() {
        var startingAngle = this.game.rnd.pick(config.ballStartingAngleRight.concat(config.ballStartingAngleLeft))

        this.game.physics.arcade.velocityFromAngle(startingAngle, config.ballVelocity, this.body.velocity)
    }

    reset() {

    }

    update () {
        if (!config.gameStarted){
            this.launchBall()
            config.gameStarted = true
        }
    }
}
