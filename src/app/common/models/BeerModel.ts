import { BeerInterface, maltInterface, hopsInterface } from '../interfaces/BeerInterface';
import { BaseModel } from './BaseModel';

export class BeerModel extends BaseModel implements BeerInterface{
    id: number | null = null;
    name: string | null = null;
    tagline: string | null = null;
    description: string | null = null;
    image_url: string | null = null;
    first_brewed: string | null = null;
    ingredients: {malt: maltInterface[], hops: hopsInterface[], yeast: string} | null = null;

    constructor (
        props: BeerInterface
    ) {
        super();
        this.populateModel(props);
    }

    public populateModel(props: BeerInterface) {
        this.populate(props);
        return this;
    }

}