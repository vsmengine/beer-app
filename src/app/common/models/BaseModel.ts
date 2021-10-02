export abstract class BaseModel {

    public populate(props: object) {
        if (!props) {
            return;
        } else {
            for (const key of Object.keys(props)) {
                try {
                    if (this && this[key]) {
                        this[key] = props[key];
                        return this;
                    }
                } catch (error) {
                    throw(error);
                }
            }
        }
    }

}
