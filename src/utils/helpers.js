export const formatData = (data) => {
    // Format the scraped data as needed
    return data.trim();
};

export const handleError = (error) => {
    // Log the error and return a user-friendly message
    console.error('An error occurred:', error);
    return 'Something went wrong. Please try again later.';
};