import * as Koa from 'koa';
// TODO: make session object interface
// TODO: use session middleware in koa app on high leve


const app = new Koa();
import userRouter from './router/user';
import * as bodyParser from 'koa-bodyparser';

const APP_PORT = 3001;
app.use(bodyParser());

// TODO: modify this middleware to make logging of requests
app.use((ctx, next) => {
  const sessionKey = ctx.cookies.get('session_key');
  if(sessionKey) {
    const stringified = Buffer.from(sessionKey, 'base64').toString('utf-8')
    console.log('stringified', stringified)
    ctx.state.session = JSON.parse(stringified)
    ctx.state.session.counter +=1
    ctx.cookies.set(
        'session_key',
        Buffer.from(JSON.stringify(ctx.state.session)).toString('base64'),
        { httpOnly: true }
    );
  }
  next();
})

app.use((ctx, next) => {
  next()
});

app.use(userRouter.routes());

app.listen(APP_PORT, () => {
  console.log('server is listening on port ', APP_PORT);
});
