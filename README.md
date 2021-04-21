# Noteworthy

# Basics

Run project:

    npm run dev

View project on http://localhost:3000/

### Bugs

The reloaded page needs to redirect the user to the correct page.
The alerts on desktop are annoying.

### Refector

User/Books

    ViewAll and ViewBooksByCategory could probably be the same page.

### Features left to implement

User

    The pie chart data needs to be sorted.
    Show categories on book data page on profile.

Book

    Edit details.
    Add categories to view book on profile.
    Book form validation.
    Remove keyboard after user has searched for a book.
    Don't allow a user to put in conflicting dates when adding a book.
    Adding book forms really buggy.
    Don't allow the user to add a current page greater than the total pages.
    Add a button to allow the user to leave a review on a read book.

Notes

    View all notes page needs to show the book title.

Uncompleted Books

    Add to the view all filter.

Settings

    Remove account (Don't forget to remove the users books.)
    Change password

Home

    Allow users to change the slide by pressing the correct circle.

Additional pages

    When a user clicks 'total notes' on profile page redirect user to a page that displays all notes.
    When a user clicks on a category on their profile they are reidrect to a page displaying only the book with the selcted genre.

### Responsive

Profile

    The desktop needs some work. The reading and read nav needs finishing.

Search Books

    The top margin is too small. On small mobile the view is too squashed.

Settings

    ...

View all

    The desktop needs to be started.

Login

    A container needs creating for all forms and hopfully that will also work for the intro section.

Book info

    This section needs to be started.

### Problems

It's working but it's probably not best practice. I've used a try catch block inside a function and the catch just calls the function again... But it works.

### Refactoring

Profile

    Desktop book view.

##### Futrue upgrades

Icons on the rating from 0 - 5

Make the navigation more animated.
Allow users to add images.

##### Bigger Feature upgrades

Allow the users to make their notes public or private to be shown to other users.
Show average time taken to read by all users.
Allow uses to search their own books.
Book recommendations for users.
Book club with a month book to read each month. Also, a poll for users to choose the book.
Help the little guys (Page to shout out smaller authors.)

### Improvments

Fix alert to the top of the page.
Total pages to finish current books.
Total note count.
sort notes option.
Stop book images from being stetched.
Add pagination for the users books.
