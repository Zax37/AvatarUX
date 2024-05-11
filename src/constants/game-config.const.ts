import Phaser from "phaser";

import { Play } from "../scenes/play.ts";
import { Preloader } from "../scenes/preloader.ts";

export const gameConfig = {
    title: 'Magnetic Slots',
    type: Phaser.AUTO,
    width: 1200,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#19561a',
    pixelArt: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Play
    ]
};
