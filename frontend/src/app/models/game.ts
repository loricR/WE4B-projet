export class Game {
    constructor(
        public ID: number = 0,
        public name: string = '',
        public description: string = '',
        public dev: number = 0,
        public longDescription: string = '',
        public price: number = 0,
        public videoCode: string = '',
        public images: string[] = [''],
        public category: string[] = [''],
        public cpu: string = '',
        public gpu: string = '',
        public ram: string = ''

    ) {
        this.ID = ID,
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.price = price;
        this.dev = dev;
        this.videoCode = videoCode;
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
        this.images = images;
        this.category = category;
    }
}
