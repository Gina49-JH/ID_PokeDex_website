PokeDex
https://gina49-jh.github.io/Protoype-testing-and-review/

Building a Pokedex for users to search for the specific pokemon name or number which contains information of data to allow
users to search and find more about specific pokemon. 

Design Process

Provide us insights about your design process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

for the design protype can be reference from Protyping of design layout.xd  

Existing Features
    Feature 1 - allows users to type a text or an number to search for the pokemon index.
    Feature 2 - allows users to click on a specific pokemon and display an popup contain the data.
    Feature 3 - allows users to see an loading bar animation before redirect to a new page.
    Feature 4 - allows users to see the loading animation while scrolling down the page to find a specific pokemon and hide when completed.
    Feature 5 - allows users to enter the input of the contact details and send the data to restdb database.
    Feature 6 - allows users to clear the user input when reloading the page.

Features Left to Implement
    First feature idea  - allows users to click on a random number which will generate a random number of pokemon in an array.
    Second feature idea - allows users to see the charts of the pokemon stat when click on the card.
    Third feature idea  - allows users to see the description of the pokemon when click on the card.
    fourth feature idea - allows users to click on the pokemon types and will generate a pokemon data matches with the types.

Technologies Used
    JQuery
        The project uses JQuery to simplify DOM manipulation.
        reference link: https://jquery.com/
    Bootstrap 
        The project uses Bootstrap version 5.0.0 and 3.4 to simplify default template for html.
        reference link for v5.0  : https://getbootstrap.com/ 
        reference link for v3.4.1: https://getbootstrap.com/docs/3.4/
    PokeAPI
        The project uses PokeAPI to retrieve the data and simplify DOM mainpulation.
        reference link: https://pokeapi.co/pokemon/
    RestDB
        The project uses RestDB to send the user data to store in the database.
        reference link: https://restdb.io/

Testing
    Contact form:
        Go to the "Contact Us" page
        Try to click on the first textbox and without user input and click on second textbox verify a red border color appears on the screen for empty or invalid input.
        Try to submit the form with an invalid email address and verify that a relevant error message appears
        Try to submit the form with all inputs valid and verify that a success message appears.
    
    Homepage:
        Go to the "Homepage" page
        Try to type a random number or pokemon name on the textbox and verify that specifc data appears below the textbox.
        Try to reload the page which cause the text that was pervious typed will be deleted and will display prompt message.
        Try to click on any random pokemon name in the card which will display an popup with the pokemon data in the same window.
        Try to click close which close the popup contain pokemon data and only display array of pokemon name and number.

The project looks and how it works was when users use eg computer...etc to access the page, the css will check for the screen sizes 
of the devices used to access the page. If the device eg computer screen of height 1366px and width 768px, css will check the width if width is more than 740px, then it will only use the code from 1 to 216 in mainstyle.css to display the website layout for web version. If the device eg mobile screen of height 360px and width 740px, css will check the width if width is less than 740px, then it will only use the media query code from line 218 to line 305 in a mainstyle.css to display the website layout meant for mobile version. How it looks 

for the mobile version that width is scaled to max of 740px.
First  - navbar has be reduced to text with background color of black box contains 3 white bar inside a button
Second - box contains title with text color of grey and background color of white below the navbar
Third  - box contains Name or number with text color of white, textbox contain message and background colour of blue below title
fourth - box contains text of how to use the site text colour of white and background colour of grey below Name or number
fifth  - card contain the pokemon number , name and picture of each pokemon and background colour of white.

for the web version:
First  - navbar which contain the title, home and contactpage button background colour of black and text colour is white.
Second - box contains title with text color of grey and background color of white below the navbar
Third  - box contains Name or number, textbox contain message, text of how to use the site, background colour and text is white below title.
fourth - card contain the pokemon number , name and picture of each pokemon and background colour of white which each row contain 3 cards.

bugs or known issues that was not addressed:
There is a first bug where users type the correct values and press submit button, the page is freeze and did not display an alert for
sent successfully to the speific email a.k.a restdb database however when we check on the database we found a new records of the 
user input on the contactpage this issue have not addresssed yet.

There is a second bug where users refreshed the page on the contactpage, when run on google chrome it was able to clear user input on 
textbox successfully. While using firefox browser, when refreshed it was not able to clear user input on textbox successfully.

Credits
    Content
        The texts used in this site were obtained from https://pokeapi.co/api/v2/pokemon/1 to https://pokeapi.co/api/v2/pokemon/898 in a JSON Format.

    Media
        The photos used in this site were obtained from https://pokeapi.co/api/v2/pokemon/1 to https://pokeapi.co/api/v2/pokemon/898 in a JSON Format.

    Acknowledgements

        I received inspiration for this project design layout from https://www.pokemon.com/us/pokedex/
    
        I received inspiration of building this project PokeDex from: 
        https://www.youtube.com/watch?v=L0pPRauLP2E&t=s&ab_channel=JamesQQuick and https://www.youtube.com/watch?v=T-VQUKeSU1w&ab_channel=JamesQQuick

        I received inspiration of building this project search request from:
        https://www.youtube.com/watch?v=wxz5vJ1BWrc

        https://www.youtube.com/watch?v=xuA83OYTE7I&t=320s