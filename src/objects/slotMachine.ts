import Phaser from "phaser";

import { SlotMachineReel } from "./slotMachineReel.ts";

import { audioAssets } from "../enums/audio-assets.enum.ts";
import { slotSymbols } from "../enums/slot-symbols.enum.ts";

import { reelTransitionDelay } from "../constants/animation.const.ts";
import { transitionCompleteEvent, spinEvent, payoutEvent } from "../constants/events.const.ts";
import { payoutsTable } from "../constants/payouts-table.const.ts";
import { slotWidth } from "../constants/slot.const.ts";

export class SlotMachine extends Phaser.Events.EventEmitter {
    private readonly reels: SlotMachineReel[];

    private isSpinning: boolean;

    constructor(private scene: Phaser.Scene, x: number, y: number, reelsCount: number, private symbolsPerReel: number) {
        super();

        this.reels = Array.from({ length: reelsCount }, (_, reelIndex: number) =>
            new SlotMachineReel(scene, x - slotWidth * (reelsCount / 2 - reelIndex), y, symbolsPerReel, reelIndex * reelTransitionDelay)
        );

        // subscribe to spin animation complete event
        this.reels[reelsCount - 1].on(transitionCompleteEvent, () => {
            this.isSpinning = false;
            this.calculateResult();            
        });
    }

    spinButtonClick(): void {
        for (const reel of this.reels) {
            this.isSpinning ? reel.stopTransition() : reel.transitionTo(this.getRandomSymbols());
        }

        this.isSpinning = !this.isSpinning;
        
        if (this.isSpinning) {
            this.scene.sound.play(audioAssets.magnet);
            this.emit(spinEvent);
        } else {
            this.calculateResult();
        }
    }
    
    private getRandomSymbols(): slotSymbols[] {
        // sort available symbols randomly and take only as many as we need
        return Object.values(slotSymbols)
            .map((value) => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)
            .slice(0, this.symbolsPerReel);
    }

    private calculateResult(): void {
        let symbols: slotSymbols[] = this.reels[0].getSymbols();
        let payoutValue: number = 0;

        for (let i: number = 1; i < this.reels.length; i++) {
            const nextReelSymbols: Set<slotSymbols> = new Set(this.reels[i].getSymbols());

            symbols = symbols.filter((symbol: slotSymbols) => {
                // if we have more reels with this symbol, keep going through them
                if (nextReelSymbols.has(symbol) && i != this.reels.length - 1) {
                    return true;
                }

                // otherwise check if we got any payout for this amount
                const value: number | undefined = payoutsTable[symbol][i];

                if (value) {
                    this.reels.slice(0, i).forEach((reel: SlotMachineReel) => reel.markSymbolConnected(symbol));
                    payoutValue += value;
                }

                return false;
            })

        }

        if (payoutValue) {
            this.scene.sound.play(audioAssets.slotMatch);
            this.emit(payoutEvent, payoutValue);
        }
    }
}
