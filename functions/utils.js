/**
 * Function to calculate the average rating for each book when a rating is added, updated, or removed
 * @param {Array} ratings - Array of ratings, each element contains a grade and the ID of the user who gave it
 * @returns {number} The calculated average rating with two decimal places
 */
const calculateAverageRating = (ratings) => {
    // Sum of ratings
    const totalRating = ratings.reduce((acc, rating) => acc + rating.grade, 0);
    // Calculation of the average
    const averageRating = totalRating / ratings.length;
    // Returns the average with two decimal places
    return parseFloat(averageRating.toFixed(2));
};

/**
 * Function to replace and remove unwanted characters in uploaded file name
 * @param {string} str - The file name to be cleaned
 * @returns {string} The cleaned file name
 */
const cleanFileName = (str) => {
    // Delete emojis
    str = str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    // Replace special characters
    str = str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Accented characters
        .replace(/[^\w\s.-]/g, "") // No letters, numbers, space, dash or point characters
        .replace(/\s+/g, "") // '#'
        .replace(/\s+/g, "_"); // Convert spaces to underscores
    // Limit name to 99 characters
    if (str.length > 99) {
        str = str.substring(0, 99);
    }
    return str;
};

module.exports = { cleanFileName, calculateAverageRating };