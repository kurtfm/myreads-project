/**
* @description convert shelf key name into pretty name
* @param {string} name - shelf key name to convert
*/
export const shelfNameConverter = (name)=>{
    let prettyName =name.replace(/([A-Z])/g, ' $1').trim()
    return prettyName.charAt(0).toUpperCase() + prettyName.slice(1)
}

/**
* @description find valid search terms based on query
* @param {string} query - search query
*/
export const findValidSearchTerms= (query)=>{
    const getAll = () =>{
        return ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }
    const terms = getAll()
    return terms.filter((found) => {
        if (found){
            return found.toLowerCase().indexOf(query.toLowerCase()) > -1;
        }
        else{
            return [];
        }
    })
}