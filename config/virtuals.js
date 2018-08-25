module.exports.getGeneralRating = function(reviews) {
    let generalRating = 0;
    reviews.forEach(function(review) {
       generalRating += parseInt(review.rating);
    });
    return (generalRating / reviews.length).toFixed(1);
};

module.exports.getDaysElapsed = function(reviews) {
    let today = new Date();

    for (let i = 0; i < reviews.length; i += 1) {
        let postDate = new Date(reviews[i].created),
            timeDiff = Math.abs(today.getTime() - postDate.getTime());

        reviews[i].postDate = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    return reviews;
};