import { CreateCSSProperties, CSSProperties } from '@material-ui/styles';

type PropsFunc<Props extends object, T> = (props: Props) => T;
type ClassesOverride<UseStyles extends (props: any) => Record<string, string>, Props extends object = {}> = Partial<
    {
        [p in keyof ReturnType<UseStyles>]:
            | CSSProperties
            // JSS property bag where values are based on props
            | CreateCSSProperties<Props>
            // JSS property bag based on props
            | PropsFunc<Props, CreateCSSProperties<Props>>;
    }
>;

export default ClassesOverride;
