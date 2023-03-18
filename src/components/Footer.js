export const Footer = ({elapsedTime}) => {
    return (
        <footer>
            <p>@2023 Copyright BIT</p>
            {elapsedTime && <p>Last update: {elapsedTime}</p>}
        </footer>
    )
}