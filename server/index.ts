import clc from 'cli-color';
import jwtDecode from 'jwt-decode';
import { createServer, Response } from 'miragejs';

import data from './mock-data';

export function makeServer({ environment = 'development' } = {}) {
  console.log(clc.bgMagentaBright('🚀 ~ Development Server running...'));

  const server = createServer({
    environment,

    seeds(server) {
      server.db.loadData(data);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 1500;

      this.pretender.handledRequest = (_, __, request) => logger(request);

      this.get('/get-news-data', (schema, request) => {
        const token = decodeToken(request);
        const data = schema.db.articles;
        const user = schema.db.users.findBy({ userId: token?.userId }); // test user

        if (token?.userId === user?.userId) {
          schema.db.bookmarks.forEach((bookmark: any) => {
            if (bookmark.users.includes(token?.userId)) {
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
          { 'Content-Type': 'application/json' },
          { data }
        );
      });

      this.get('get-user-bookmarks', (schema, request) => {
        const token = decodeToken(request);

        if (!token) {
          return new Response(
            403,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Invalid token'
            }
          );
        }

        const bookmarks = schema.db.bookmarks.filter((bookmark: any) => {
          if (bookmark.users.includes(token?.userId)) {
            delete bookmark.users;
            bookmark.isBookmarked = true;
            return bookmark;
          }
          return false;
        });

        return new Response(
          200,
          { 'Content-Type': 'application/json' },
          {
            data: bookmarks
          }
        );
      });

      this.post('add-bookmark', (schema, request) => {
        const { articleId, article } = JSON.parse(request.requestBody);
        const token = decodeToken(request);
        const user = schema.db.users.findBy({ userId: token?.userId }); // test user

        if (token?.userId !== user?.userId) {
          return new Response(
            403,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Invalid token'
            }
          );
        }

        if (!articleId || !article) {
          return new Response(
            404,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Document not found'
            }
          );
        }

        const bookmarkIndex = schema.db.bookmarks.findIndex(
          (bookmark) => bookmark.id === articleId
        );

        if (bookmarkIndex !== -1) {
          schema.db.bookmarks[bookmarkIndex].users.push(token?.userId);
        } else {
          schema.db.bookmarks.insert({
            ...article,
            users: [token?.userId]
          });
        }

        return new Response(
          200,
          { 'Content-Type': 'application/json' },
          {
            general: `Article ${articleId} was added to bookmarks.`
          }
        );
      });

      this.post('remove-bookmark', (schema, request) => {
        const { articleId } = JSON.parse(request.requestBody);
        const token = decodeToken(request);
        const userId = schema.db.users[0].userId; // test user

        if (token?.userId !== userId) {
          return new Response(
            403,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Invalid token'
            }
          );
        }

        if (!articleId) {
          return new Response(
            404,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Document not found'
            }
          );
        }

        const bookmarkIndex = schema.db.bookmarks.findIndex((bookmark) =>
          bookmark.users.includes(token?.userId)
        );

        if (bookmarkIndex !== -1) {
          const index = schema.db.bookmarks[bookmarkIndex].users.indexOf(
            token?.userId
          );
          schema.db.bookmarks[bookmarkIndex].users.splice(index, 1);

          if (schema.db.bookmarks[bookmarkIndex].users.length === 0) {
            schema.db.bookmarks.splice(bookmarkIndex, 1);
          }
        }

        return new Response(
          200,
          { 'Content-Type': 'application/json' },
          {
            general: `Article ${articleId} was remove from bookmarks.`
          }
        );
      });

      this.post('/login', async (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({ email });

        if (user?.email === email && user?.password === password) {
          return new Response(
            200,
            { 'Content-Type': 'application/json' },
            {
              token: user.token,
              ...{
                userId: user.userId,
                userName: user.userName
              }
            }
          );
        } else {
          return new Response(
            403,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Invalid email or password'
            }
          );
        }
      });

      this.post('/signup', () => {
        return new Response(
          500,
          { 'Content-Type': 'application/json' },
          { general: 'Signup not available on Dev Mode' }
        );
      });

      this.get('/get-user-data', (schema, request) => {
        const token = decodeToken(request);
        const user = schema.db.users.findBy({ userId: token?.userId }); // test user

        if (token?.userId !== user?.userId) {
          return new Response(
            403,
            { 'Content-Type': 'application/json' },
            {
              status: 'FETCH_ERROR',
              error: 'Invalid token'
            }
          );
        } else {
          return new Response(200);
        }
      });

      this.post('/update-user-password', () => {
        return new Response(
          500,
          { 'Content-Type': 'application/json' },
          'Reset Password not available on Dev Mode'
        );
      });

      this.post('/reset-password', () => {
        throw new Error('Reset password not available on Dev mode');
      });
    }
  });

  return server;
}

type Logger = Parameters<
  ReturnType<typeof createServer>['pretender']['handledRequest']
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
  const token = request?.requestHeaders?.authorization?.split(' ')[1];
  const decodedToken: { userId?: string } | null = token
    ? jwtDecode(token)
    : null;

  if (decodedToken?.userId) {
    return {
      userId: decodedToken.userId
    };
  } else {
    return null;
  }
};
