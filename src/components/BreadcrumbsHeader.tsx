import FunctionalLink from "./FunctionalLink";
import {
    Typography,
    Link,
    Breadcrumbs,
} from "@mui/material";


interface BreadcrumbElement {
    title: string,
    link: string
}


interface BreadcrumbsHeaderProps {
    forwardable: BreadcrumbElement[],
    current: string
}


export default function BreadcrumbsHeader({ forwardable, current }: BreadcrumbsHeaderProps) {

    const ForwardableElements = forwardable.map((element, index) => {
        return (
            <FunctionalLink key={index} to={element.link}>
                <Link color="inherit" underline="hover">
                    {element.title}
                </Link>
            </FunctionalLink>
        )
    })

    return (
        <div style={{
            paddingTop: 16,
            paddingBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8
        }}>
            <Breadcrumbs>
                {ForwardableElements}
                <Link color="typography.primary" underline="hover">
                    {current}
                </Link>
            </Breadcrumbs>
            <Typography variant="h3">
                {current}
            </Typography>
        </div>
    )
}    
