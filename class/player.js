
const { Food } = require('./food');


class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        for (let i = 0; i < this.currentRoom.items.length; i++) {
            if (this.currentRoom.items[i].name === itemName) {
                this.items.push(this.currentRoom.items[i])
                this.currentRoom.items.splice(i, 1);
            }
        }

    }

    dropItem(itemName) {
        for(let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === itemName) {
                this.currentRoom.items.push(this.items[i]);
                this.items.splice(i, 1); 
            }
        }
    }

    eatItem(itemName) {
        for (let i = 0; i < this.items.length; i++) {
            if ((this.items[i].name === itemName) && (this.items[i] instanceof Food)) {
                this.items.splice(i, 1);
            }
        }
    }

    getItemByName(name) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === name) {
                return this.items[i];
            }
        }
    }


}

module.exports = {
  Player,
};
