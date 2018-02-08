export default {
    gameWidth: 760,
    gameHeight: 400,
    localStorageName: 'pong',
    offset: 100,

    upKey: Phaser.Keyboard.W,
    downKey: Phaser.Keyboard.S,

    gameStarted: false,
    player1Score: 0,
    player2Score: 0,
    scoreToWin: 10,
    lastScore: 0,
    autoMode: false,
    simpleAI: true,

    ballVelocity: 400,
    ballStartDelay: 2,
    ballStartingAngleLeft: [-120, 120],
    ballStartingAngleRight: [-60, 60],

    paddleMaxVelocity: 200,
    paddleScale: 2,
}
