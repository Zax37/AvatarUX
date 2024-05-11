import Phaser from "phaser";

import { SlotMachineSlot } from "./slotMachineSlot.ts";

import { slotSymbols } from "../enums/slot-symbols.enum.ts";

import { slotHeight } from "../constants/slot.const.ts";
import { slotTransitionDelay } from "../constants/animation.const.ts";
import { transitionCompleteEvent } from "../constants/events.const.ts";

export class SlotMachineReel extends Phaser.Events.EventEmitter {
    private slots: SlotMachineSlot[];

    constructor(scene: Phaser.Scene, x: number, y: number, symbolsPerReel: number, transitionsDelay: number) {
        super();

        this.slots = Array.from({ length: symbolsPerReel }, (_, slotIndex: number) =>
            new SlotMachineSlot(
                scene, x, y - slotHeight * (symbolsPerReel / 2 - slotIndex),
                transitionsDelay + slotIndex * slotTransitionDelay
            )
        );
        this.slots[symbolsPerReel - 1].on(transitionCompleteEvent, () => {
            this.emit(transitionCompleteEvent);
        });
    }

    getSymbols(): slotSymbols[] {
        return this.slots.map((slot: SlotMachineSlot): slotSymbols => slot.getSymbol());
    }

    transitionTo(nextSymbols: slotSymbols[]): void {
        for (const slot of this.slots) {
            slot.transitionTo(nextSymbols.pop()!);
        }
    }

    stopTransition(): void {
        for (const slot of this.slots) {
            slot.stopTransition();
        }
    }

    markSymbolConnected(symbol: slotSymbols) {
        for (const slot of this.slots) {
            if (slot.getSymbol() === symbol) {
                slot.markConnected();
            }
        }
    }
}
