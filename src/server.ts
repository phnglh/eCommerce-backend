import app from "./app";

async function bootstrap() {
	const port = 3056;
  const server = app.listen(port, () => {
		console.info(`WSV eCommerce start with ${port}`);
	});

  process.on('SIGINT', () =>{
    server.close(()=> console.log(`\nExit Server Express`))
  })
}


bootstrap()
