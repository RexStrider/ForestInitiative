const express = require('express');
const routes = require('./routes');
const createError = require('http-errors');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' || "production" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render(err);
});

// Serve up production build
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is listening`);
});