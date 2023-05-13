import { createServer, Response } from "miragejs";
import clc from "cli-color";
import jwtDecode from "jwt-decode";

import data from "./mock-data";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJ2YlhxaW9CNEpOZmxBYTF3SlJYVEEifQ.xBxzLEzjymw922hw5__qjTjsqR7J7sqXEr7YVk4VuKA";

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

      this.get("/get-news-data", (schema, request) => {
        const token = decodeToken(request);
        const data = schema.db.articles;
        const userId = schema.db.users[0].userId; // test user

        if (token?.userId === userId) {
          schema.db.bookmarks.forEach((bookmark: any) => {
            if (bookmark.users.includes(userId)) {
              data.forEach((article: any) => {
                if (article.id === bookmark.id) {
                  article.isBookmarked = true;
                }
              });
            }
          });
        }

        return new Response(
          200,
          { "Content-Type": "application/json" },
          { data }
        );
      });

      this.get("get-user-bookmarks", (schema, request) => {
        const token = decodeToken(request);
        const userId = schema.db.users[0].userId; // test user

        if (token?.userId === userId) {
          const bookmarks = schema.db.bookmarks.filter((bookmark: any) =>
            bookmark.users.includes(token?.userId)
          );

          return new Response(
            200,
            { "Content-Type": "application/json" },
            {
              data: bookmarks,
            }
          );
        }

        return new Response(
          403,
          { "Content-Type": "application/json" },
          {
            status: "FETCH_ERROR",
            error: "Invalid token",
          }
        );
      });

      this.post("add-bookmark", (schema, request) => {
        const { articleId, article } = JSON.parse(request.requestBody);
        const token = decodeToken(request);
        const userId = schema.db.users[0].userId; // test user

        if (token?.userId !== userId) {
          return new Response(
            403,
            { "Content-Type": "application/json" },
            {
              status: "FETCH_ERROR",
              error: "Invalid token",
            }
          );
        }

        if (!articleId || !article) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            {
              status: "FETCH_ERROR",
              error: "Document not found",
            }
          );
        }

        schema.db.bookmarks.forEach((bookmark: any) => {
          if (bookmark.id === articleId) {
            bookmark.users.push(token?.userId);
          } else {
            schema.db.bookmarks.push({
              ...article,
              users: [token?.userId],
            });
          }
        });

        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            general: `Article ${articleId} was added to favorites.`,
          }
        );
      });

      this.post("remove-bookmark", (schema, request) => {
        const { articleId } = JSON.parse(request.requestBody);
        const token = decodeToken(request);
        const userId = schema.db.users[0].userId; // test user

        if (token?.userId !== userId) {
          return new Response(
            403,
            { "Content-Type": "application/json" },
            {
              status: "FETCH_ERROR",
              error: "Invalid token",
            }
          );
        }

        if (!articleId) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            {
              status: "FETCH_ERROR",
              error: "Document not found",
            }
          );
        }

        schema.db.bookmarks.forEach((bookmark: any) => {
          if (bookmark.id === articleId) {
            const index = bookmark.users.indexOf(token?.userId);
            bookmark.users.splice(index, 1);

            if (bookmark.users.length === 0) {
              schema.db.bookmarks.remove(bookmark);
            }
          }
        });

        return new Response(
          200,
          { "Content-Type": "application/json" },
          {
            general: `Article ${articleId} was remove from bookmarks.`,
          }
        );
      });

      this.post("/login", async (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({ email });

        if (user.email === email && user.password === password) {
          return new Response(
            200,
            { "Content-Type": "application/json" },
            {
              token: TOKEN,
              ...{
                userId: user.userId,
                userName: user.userName,
              },
            }
          );
        } else {
          return new Response(
            403,
            { "Content-Type": "application/json" },
            {
              status: "FETCH_ERROR",
              error: "Invalid email or password",
            }
          );
        }
      });

      this.post("/signup", () => {
        return new Response(
          500,
          { "Content-Type": "application/json" },
          { general: "Signup not available on Dev Mode" }
        );
      });

      this.get("/get-user-data", (schema, request) => {
        const token = decodeToken(request);
        const userId = schema.db.users[0].userId; // test user

        if (token?.userId !== userId) {
          return new Response(
            403,
            { "Content-Type": "application/json" },
            {
              status: "FETCH_ERROR",
              error: "Invalid token",
            }
          );
        } else {
          return new Response(200);
        }
      });

      this.post("/update-user-password", () => {
        return new Response(
          500,
          { "Content-Type": "application/json" },
          "Reset Password not available on Dev Mode"
        );
      });

      this.post("/reset-password", () => {
        throw new Error("Reset password not available on Dev mode");
      });
    },
  });

  return server;
}

type Logger = Parameters<
  ReturnType<typeof createServer>["pretender"]["handledRequest"]
>[2] & { url?: string; method?: string };

const logger = (request: Logger) => {
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

const decodeToken = (request: any) => {
  const token = request?.requestHeaders?.authorization?.split(" ")[1];
  const decodedToken: { userId?: string } | null = token
    ? jwtDecode(token)
    : null;

  if (decodedToken?.userId) {
    return {
      userId: decodedToken.userId,
    };
  } else {
    return null;
  }
};
