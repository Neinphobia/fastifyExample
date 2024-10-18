const { default: axios } = require("axios");
const path = require("path");
const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // Bu, URL'de hangi dizinin kullanılacağını belirtir (örn: /public)
});

fastify.get("/", async (request, reply) => {
  return reply.sendFile("index.html");
});

fastify.get("/canli", async (request, reply) => {
  const data = await axios.get(`https://scrape-petrol.vercel.app/canlidoviz/`);

  return reply.send({ msg: "Only gets usd ", data: data.data });
});
fastify.get("/canli/:p", async (request, reply) => {
  const p = request.params.p;
  const data = await axios.get(
    `https://scrape-petrol.vercel.app/canlidoviz/${p}`
  );

  return reply.send(data.data);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
