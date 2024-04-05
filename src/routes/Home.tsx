import usePageTitle from "../hooks/usePageTitle"


export default function Home(props: {pageTitle: string}) {

    usePageTitle(props.pageTitle)

    return (
        <>
        <h1>HOME</h1>
        </>
    )
}