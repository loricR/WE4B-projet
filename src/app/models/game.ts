export class Game {
    constructor(
        public name: string,
        public image: string,
        public simpleDescription: string,
        public longDescription: string,
        public price: number,
        public developer: string
    ) {
        this.name = name;
        this.image = image;
        this.simpleDescription = simpleDescription;
        this.longDescription = longDescription;
        this.price = price;
        this.developer = developer
    }
}
