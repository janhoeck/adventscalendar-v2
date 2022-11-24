export type Classes<T extends string> = Partial<
    {
        [key in T]: string;
    }
>;
