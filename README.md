# MyReads Project

This project was created and submitted as the first project in the Udacity React Nanodegree.  The project extends the base style and BooksAPI.js given as a base.

## Run Project Locally

Clone this repo.
```bash
git clone https://github.com/kurtfm/myreads-project.git
```

Change directory into the project and install requirements.
```bash
npm install
```

Start development server
```bash
npm start
```

The default browser should open to http://localhost:3000/ and show the main page of my project.

## Requirements / Features
The overall requirement for the project:
> In the MyReads project, you'll create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

### Main view
endpoint: http://localhost:3000/

- This view will show three 'shelfs' that can hold books that the user is either currently reading, would like to read or has read.
- The books can be moved from shelf to shelf or removed from the shelves entirely.

- Each book has a title, author list and thumbnail image. The user can reach a summary view by clicking on the image.

- The view will show a plus icon on the right side that when invoked will lead the user to the search view.

### Search view
endpoint: http://localhost:3000/search

- This view allows the user to find additional books based on key word searches.  

- The input field at the top allows the user to enter text to search for a book.  As text is entered matching results will be displayed.

- Each book displayed will have a similar view to the books on the main page with a title, author list, and thumbnail image.
The book may be added to the shelf using the same method as on the shelf page.  Once added the new shelf value will be reflected in the current (and future) search results.  This update will also be reflected on the main view. Each book will also support the ability for the user to click on the image and see a preview page.

- As the user inputs values a besides the search a keyword lookup will occur.  If keyword matches are found they will be displayed below the search input.  The user can choose to click on the keyword and get the results matching the  keyword.
- The back button will work in the browser to return the user back to their last view. Also, there is a back arrow which will return the user to their previous view.

### Summary view
endpoint: http://localhost:3000/book/:id
(example: http://localhost:3000/book/nggnmAEACAAJ)

- The summary view will pull the book details for the book id passed on the path.
- A title, publish date and author list will be displayed along with a description of the book.
- Like the other views a thumbnail image and drop down to change the shelf of the book will be shown.
- If available a more info link to Google Books will be provided at the end of the description
- The back button will work in the browser to return the user back to their last view. Also, there is a back arrow which will return the user to their previous view.