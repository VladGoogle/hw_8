import * as Router  from 'koa-router';
import { loginHandle } from '../controller/user';
import { userArray } from '../controller/user';

const router = new Router({ prefix: '/user' });

// TODO: move handler to controller
router.get('/reg', (ctx) => {
  ctx.body = userArray;
});


router.post('/login', loginHandle);

export default router;
