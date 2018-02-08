/* globals __DEV__ */
import Phaser from 'phaser'
import Paddle from '../sprites/Paddle'
import Ball from '../sprites/Ball'

import config from '../config'

export default class extends Phaser.State {
    toggleDebug() {
        this.debugMode = !this.debugMode;
        if (!this.debugMode) {
            this.game.debug.reset();
        }
    }

    initKeyboard() {
        if (!config.autoMode){
            this.upKey = this.game.input.keyboard.addKey(config.upKey)
            this.downKey = this.game.input.keyboard.addKey(config.downKey)
        }

        if (__DEV__){
            this.debugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
            this.debugKey.onDown.add(this.toggleDebug, this)
        }
    }

    initCenterLine() {
        this.backgroundGraphics = game.add.graphics(0, 0);
        this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);

        for (let y = 0; y < game.height; y += 10) {
            this.backgroundGraphics.moveTo(game.world.centerX, y);
            this.backgroundGraphics.lineTo(game.world.centerX, y + 10);
        }
    }

    initGameObjects() {
        this.leftPaddle = new Paddle({
            game: this.game,
            x: 0,
            y: this.world.centerY,
            asset: 'paddle'
        })

        this.rightPaddle = new Paddle({
            game: this.game,
            x: game.world.width - 8,
            y: game.world.centerY,
            asset: 'paddle'
        })

        this.ball = new Ball({
            game: this.game,
            x: game.world.centerX,
            y: game.world.centerY,
            asset: 'ball'
        })

        this.game.add.existing(this.leftPaddle)
        this.game.add.existing(this.rightPaddle)
        this.game.add.existing(this.ball)
    }

    initScoreBoard() {
        this.score1Text = game.add.text(128, 0, '0', {
            font: '42px Bangers',
            fill: '#ffffff',
            align: 'center'
        })

        this.score2Text = game.add.text(game.world.width - 128, 0, '0', {
            font: '42px Bangers',
            fill: '#ffffff',
            align: 'center'
        })
    }

    updateScore() {
        this.score1Text.text = config.player1Score
        this.score2Text.text = config.player2Score
    }

    collisionCheck() {
        this.game.physics.arcade.collide(this.leftPaddle, this.ball)
        this.game.physics.arcade.collide(this.rightPaddle, this.ball)

        if (this.ball.body.blocked.left) {
            config.player2Score++
            console.log('Player 2 scores! score:' + config.player1Score + ' : ' + config.player2Score)
            this.updateScore()
        } else if (this.ball.body.blocked.right) {
            config.player1Score++
            console.log('Player 1 scores! score:' + config.player1Score + ' : ' + config.player2Score)
            this.updateScore()
        }
    }

    paddleMovement() {
        if(config.autoMode) {
            this.leftPaddle.body.velocity.setTo(this.ball.body.velocity.y)
            this.leftPaddle.body.velocity.x = 0
            this.leftPaddle.body.maxVelocity.y = config.paddleMaxVelocity
        } else if (config.simpleAI){
            if (this.upKey.isDown)
                this.leftPaddle.body.velocity.y = -config.paddleMaxVelocity
            else if (this.downKey.isDown)
                this.leftPaddle.body.velocity.y = config.paddleMaxVelocity
            else
                this.leftPaddle.body.velocity.y = 0
            this.rightPaddle.body.velocity.setTo(this.ball.body.velocity.y)
            this.rightPaddle.body.velocity.x = 0
            this.rightPaddle.body.maxVelocity.y = config.paddleMaxVelocity
        }
    }

    create () {
        this.initCenterLine()
        this.initGameObjects()
        this.initKeyboard()
        this.initScoreBoard()
    }

    update() {
        this.collisionCheck()
        this.paddleMovement()
    }

    render () {
        if (__DEV__ && this.debugMode) {
            //hitboxes
            this.game.debug.spriteBounds(this.ball)
            this.game.debug.spriteBounds(this.leftPaddle)
            this.game.debug.spriteBounds(this.rightPaddle)

            // this.game.debug.spriteInfo(this.leftPaddle, 32, 32)
            // this.game.debug.spriteInfo(this.rightPaddle, 32, 32)
            this.game.debug.spriteInfo(this.ball, 32, 32)

            // this.game.debug.text('anchor', this.ball.x + 4, this.ball.y, 'red')
            // this.game.debug.text('anchor', this.leftPaddle.x + 4, this.leftPaddle.y, 'red')
            // this.game.debug.text('anchor', this.rightPaddle.x + 4, this.rightPaddle.y, 'red')

            // this.game.debug.key(this.testKey, 32, 128)
        }
    }
}
