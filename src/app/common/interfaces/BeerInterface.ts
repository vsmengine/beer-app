export interface BeerInterface {
    id: number | null;
    name: string | null;
    tagline: string | null;
    description: string | null;
    image_url: string | null;
    first_brewed: string | null;
    ingredients: {malt: maltInterface[], hops: hopsInterface[], yeast: string}
}

export interface maltInterface {
    name: string | null;
    amount: object | null;
}

export interface hopsInterface {
    name: string | null;
    amount: object | null;
}
