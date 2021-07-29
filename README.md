## Homework:

- Create session middleware to fetch info from cookies
- Add logic to controllers to handle count increase of user requests in session
- Write user session into Koa state 

```
ctx.state.session = JSON.parse(sessionString)
```

- Every request user make should increase counter in session by 1.
- Session should be created once per login.

