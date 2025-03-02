export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE"); // German locale outputs dd.MM.yyyy format
  };
  