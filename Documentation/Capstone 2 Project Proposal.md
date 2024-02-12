## Capstone 2 Project Proposal
**Website Goal:**   
The idea is to create an application for Lego lovers, that helps the user find a set with the number on the box, by name and find parts.   

**Website Demographic:**  
I think the age group is young – adults.

**Website Data:**  
I plan to use the Rebrickable API ([https://rebrickable.com/api/](https://rebrickable.com/api/ "https://rebrickable.com/api/")) retrieve the information and show the result to the user. 

###-Approach-
**Database scheme:**  
In the database, I will store the information of registered users with their authentication information. Also, it will be saving the list name and the list sets for each user.

**Issue with API:**  
There may be a limited number of requests available. The user might not find a set under a certain number, or name. The research with different ingredients may return an incorrect result.

**Sensitive information:**  
I plan to create a user profile. This means that I will need to secure the users login passwords. 

**Functionality:**  
Users will be able to search Lego sets based on the id number on the box or the name. 
They can add a set in their Set List to easily access and see them later.
Also, there will be the possibility to save and edit the recipes they create.


**User Flow:**  
The user will create an account or login if not authenticated. 
A page will include search forms to look for Lego sets based on id number, name or randomly. There will be the option for the user to save them in their list section.

**Feature other than CRUD:**  
I am not sure what I want to use outside of the CRUD, but it would be great if the “welcome back” page shows suggestions based on the lasts research or recipes save in favorites.
