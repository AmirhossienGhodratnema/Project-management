


const HomePage = (req, res, next) => {
    try {
        return res.render('index')
    } catch (error) {
        next(error);
    };
};


module.exports = {
    HomePage,
}