import App from './App'

const start = async () => {
    try {
        const server = await App();

        server.listen(8080, (err, address) => {
            if (err){
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        })
        
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();