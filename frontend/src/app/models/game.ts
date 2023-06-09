export class Game {
    constructor(
        public name: string,
        public image: string,
        public simpleDescription: string,
        public longDescription: string,
        public price: number,
        public developer: string,
        public category: string[],
        public videoCode: string,
        public cpu: string,
        public gpu: string,
        public ram: string

    ) {
        this.name = name;
        this.image = image;
        this.simpleDescription = simpleDescription;
        this.longDescription = longDescription;
        this.price = price;
        this.developer = developer;
        this.category = category;
        this.videoCode = videoCode;
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
    }
}
