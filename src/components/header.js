import React from 'react';
import {
    Alignment,
    Button,
    Navbar,
} from "@blueprintjs/core";
const Header = () => {

    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>To-Do App</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp4-minimal" icon="Home" text="Home" />
                {/* <Button className="bp4-minimal" icon="document" text="Files" /> */}
            </Navbar.Group>
        </Navbar>
    )
}
export default Header;