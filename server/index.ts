import { createServer, Response } from "miragejs";
import { nanoid } from "@reduxjs/toolkit";
import clc from "cli-color";

import data from "./mock-data";

const token = nanoid();

export function makeServer({ environment = "test" } = {}) {
  console.log(clc.bgMagentaBright("🚀 ~ Development Server running..."));

  let server = createServer({
    environment,

    seeds(server) {
      server.db.loadData(data);
    },

    routes() {
      this.namespace = "api";
      this.timing = 1500;

      this.pretender.handledRequest = (_, __, request) => logger(request);

      this.get("/get-news-data", (schema) => {
        return { data: schema.db.data };
      });

      this.post("/reset-password", () => {
        throw new Error("Reset password not available on Dev mode");
      });

      this.post("/login", (_, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        if (email === "test@email.com" && password === "123Pass") {
          return new Response(
            200,
            { "Content-Type": "application/json" },
            { token }
          );
        }

        return new Response(
          500,
          { "Content-Type": "application/json" },
          { general: "Login not available on Dev Mode" }
        );
      });

      this.post("/signup", () => {
        return new Response(
          500,
          { "Content-Type": "application/json" },
          { general: "Signup not available on Dev Mode" }
        );
      });

      this.post("/update-user-password", () => {
        return new Response(
          500,
          { "Content-Type": "application/json" },
          "Reset Password not available on Dev Mode"
        );
      });
    },
  });

  return server;
}

type Request = Parameters<
  ReturnType<typeof createServer>["pretender"]["handledRequest"]
>[2] & { url?: string; method?: string };

const logger = (request: Request) => {
  const { method, url, requestBody, queryParams, requestHeaders, status } =
    request;

  if (method && url && status) {
    console.log(clc.blueBright(`[${method}] ${status} ${url}`));
  }

  if (Object.keys(queryParams).length > 0) {
    console.log(clc.yellowBright(`params: ${JSON.stringify(queryParams)}`));
  }

  if (Object.keys(requestHeaders).length > 0) {
    console.log(
      clc.magentaBright(`headers: ${JSON.stringify(requestHeaders)}`)
    );
  }

  if (requestBody) {
    const body = JSON.stringify(JSON.parse(requestBody));
    console.log(clc.greenBright(`body: ${body}`));
  }
};
