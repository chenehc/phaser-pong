import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)
        game.physics.arcade.enable(this)
        this.checkWorldBounds = true
        this.body.collideWorldBounds = true
        this.scale.setTo(config.paddleScale)
        this.body.immovable = true
    }

    reset() {

    }

    update () {
        
    }
}
