import React, {useEffect} from "react";

function Home() {

    useEffect( () => {
        document.title = "Craft Corner";
        document.body.style = 'background: rgb(250,223,223);';
        localStorage.clear();
    }, [])


    

}


export default Home;