# Cookie Parser

The `cookie-parser` middleware is required for the cookie-based authentication flow. It is already installed and configured in `app.js`.

```javascript
// in app.js
import cookieParser from 'cookie-parser';
// ...
app.use(cookieParser());
```
