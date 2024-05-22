// Function to calculate the average rating for each book when a rating is added, updated, or removed

const calculateAverageRating = function(next) {
    const ratingsCount = this.ratings.length;
    let sum = 0;

    this.ratings.forEach(rating => {
        sum += rating.grade;
    });

    if (ratingsCount > 0) {
        this.averageRating = sum / ratingsCount;
    } else {
        this.averageRating = 0;
    }

    next();
};

module.exports = calculateAverageRating;