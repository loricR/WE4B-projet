export class Game {
    constructor(
        public ID: number,
        public name: string,
        public description: string,
        public dev: number,
        public longDescription: string,
        public price: number,
        public videoCode: string,

        public image: string[],
        public category: string[],
        
    ) {
        this.ID = ID,
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.price = price;
        this.dev = dev;
        this.videoCode = videoCode;

        this.image = image;
        this.category = category;
        
    }
}
